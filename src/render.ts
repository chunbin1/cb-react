import { Vdom, BasicElement, Fiber } from './types';
import { scheduleWork } from './scheduler';
import { TEXT_TYPE } from './createElement';

// 我们采用 requestIdleCallback 这个API去做调度器 这个API兼容性不好 后续再替代

export default function render(vDom: Vdom, root: HTMLElement, done?: () => void): void {
  // console.log(Vdom);
  const rootFiber: Fiber = {
    dom: root,
    props: {
      children: [vDom],
    },
  };
  // 创建下个任务
  scheduleWork(rootFiber);
}

export const createDom = (fiber: Fiber): HTMLElement | Text => {
  let dom: HTMLElement | Text;
  if (fiber.type === TEXT_TYPE) {
    dom = document.createTextNode(fiber.props.nodeValue);
    return dom;
  }
  dom = document.createElement(fiber.type as string);
  // const dom = fiber.type === TEXT_TYPE ? document.createTextNode('') : document.createElement(fiber.type as string);
  const isNotChildren = (key: string) => key !== 'children';
  Object.keys(fiber.props)
    .filter(isNotChildren)
    .forEach((key) => {
      setAttribute(<HTMLElement>dom, key, fiber.props[key]);
    });
  return dom;
};

const setAttribute = (dom: HTMLElement, name: string, value: any): void => {
  if (name === 'className') {
    name = 'class';
  }
  dom.setAttribute(name, value);
};
