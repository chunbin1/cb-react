import { Vdom, BasicElement, Fiber } from "./types";
import { workLoop } from "./scheduler";

// 我们采用 requestIdleCallback 这个API去做调度器 这个API兼容性不好 后续再替代
export let nextUnitOfWork: null | Fiber = null;

export default function render(Vdom: Vdom, root: HTMLElement) {
  console.log(Vdom);
  // 创建下个任务
  nextUnitOfWork = {
    container: root,
    child: Vdom,
  };
  // 创建根fiber节点，并指定下一次nextUnitOfWork
  //  =
  // let dom = renderElement(Vdom);
  // root.appendChild(dom);
}

// 有空闲就进去workLoop 循环执行下一个任务
window.requestIdleCallback(workLoop);

const renderElement = (basicElement: BasicElement): HTMLElement | Text => {
  // 基础类型转换
  if (
    typeof basicElement === "boolean" ||
    basicElement === null ||
    basicElement === undefined
  ) {
    return document.createTextNode("");
  }
  if (typeof basicElement === "number") {
    return document.createTextNode(String(basicElement));
  }
  if (typeof basicElement === "string") {
    return document.createTextNode(basicElement);
  }
  // 是Vdom
  const { type } = basicElement;
  if (typeof type === "string") {
    return renderDOM(basicElement);
  }
  if (typeof type === "function") {
    return renderFuntion(basicElement);
  }
};

const renderFuntion = (Vdom: Vdom) => {
  const { type } = Vdom;
  return renderDOM((<Function>type)()); // 两种写法 (type as Functions)()
};

const renderDOM = (Vdom: Vdom) => {
  const { type, config, children } = Vdom;

  const dom = document.createElement(type as string);
  if (Object.keys(config).length > 0) {
    Object.keys(config).map((name) => {
      setAttribute(dom, name, config[name]);
    });
  }
  for (let i = 0; i < children.length; i += 1) {
    const childDom = renderElement(children[i]);
    dom.appendChild(childDom);
  }
  return dom;
};

const setAttribute = (dom: HTMLElement, name: string, value: any): void => {
  if (name === "className") {
    name = "class";
  }
  dom.setAttribute(name, value);
};
