import { Vdom, BasicElement, Fiber } from './types';
import { workLoop } from './scheduler';
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
  //@ts-ignore
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

// const renderFuntion = (Vdom: Vdom) => {
//   const { type } = Vdom;
//   return renderDOM((<Function>type)()); // 两种写法 (type as Functions)()
// };

// const renderDOM = (Vdom: Vdom) => {
//   const { type, config, children } = Vdom;

//   const dom = document.createElement(type as string);
//   if (Object.keys(config).length > 0) {
//     Object.keys(config).map((name) => {
//       setAttribute(dom, name, config[name]);
//     });
//   }
//   for (let i = 0; i < children.length; i += 1) {
//     const childDom = renderElement(children[i]);
//     dom.appendChild(childDom);
//   }
//   return dom;
// };

const setAttribute = (dom: HTMLElement, name: string, value: any): void => {
  if (name === 'className') {
    name = 'class';
  }
  dom.setAttribute(name, value);
};
