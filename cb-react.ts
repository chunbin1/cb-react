type BasicElement = Vdom | string | number | boolean;
type Child = Array<BasicElement>;

interface Vdom {
  type: string | Function;
  config?: any;
  children?: Child;
}

export const createElement = (
  type: string,
  config: any,
  ...children: Child
): Vdom => {
  return {
    type,
    config,
    children
  };
};

export const render = (Vdom: Vdom, root: HTMLElement) => {
  let dom = renderElement(Vdom);
  root.appendChild(dom);
};

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
  return renderDOM((<Function>type)());
};

const renderDOM = (Vdom: Vdom) => {
  const { type, config, children } = Vdom;

  const dom = document.createElement(type as string);
  if (Object.keys(config).length > 0) {
    Object.keys(config).map(name => {
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
