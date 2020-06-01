import { RequestIdleCallbackDeadline } from '../global';
import { Fiber } from './types';
import { createDom } from './render';

export let nextUnitOfWork: null | Fiber = null;
let wipRoot: null | Fiber = null; // 记录根节点

export function scheduleWork(rootFiber: Fiber) {
  wipRoot = rootFiber;
  nextUnitOfWork = rootFiber;
  // 有空闲就进去workLoop 循环执行下一个任务
  window.requestIdleCallback(workLoop);
}

export function workLoop(deadline: RequestIdleCallbackDeadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // 不能用解构运行该函数
    shouldYield = deadline.timeRemaining() < 1;
  }
  // 当 nextUnitOfWork 为空则表示渲染 fiber 树完成了，
  // 可以提交到 DOM 了
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  window.requestIdleCallback(workLoop);
}

// 提交根结点到 DOM
function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null;
}

function commitWork(fiber: Fiber) {
  if (!fiber) {
    return;
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  // 递归子节点和兄弟节点
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function performUnitOfWork(fiber: Fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const children = fiber.props.children;
  let prevSibling: null | Fiber = null;
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];

    const newFiber: Fiber = {
      type: child.type,
      props: child.props,
      parent: fiber,
      dom: null,
    };

    if (i === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  }

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent; // 完成后回溯
  }
}
