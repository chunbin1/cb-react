import { RequestIdleCallbackDeadline } from '../global';
import { Fiber, BasicElement } from './types';
import { createDom } from './render';

export let nextUnitOfWork: null | Fiber = null;

export function scheduleWork(nextWork: Fiber) {
  nextUnitOfWork = nextWork;
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
  window.requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber: Fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
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
  // TODO
  // console.log(nextWork);
}

// 下面是fin
