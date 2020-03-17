// interface Icbreact {
//   createElement?: Function;
//   render?: Function;
// }

// let Cbreact: Icbreact = {};

interface cbreactDom {
  type: string | Function;
  config?: any;
  children?: cbreactDom | cbreactDom[] | string;
}

export const createElement = (
  type: string,
  config: any,
  ...children: cbreactDom[]
): cbreactDom => {
  console.log(type);
  return {
    type,
    config,
    children
  };
};

export const render = (Vdom: cbreactDom, root: HTMLElement) => {
  const { type } = Vdom;
  let dom;
  if (typeof type === "function") {
    dom = renderFuntions(Vdom);
  } else {
    dom = renderDOM(Vdom);
  }

  root.appendChild(dom);
};

const renderFuntions = (Vdom: cbreactDom) => {
  const { type, config } = Vdom;

  return renderDOM(type(config));
};

const renderDOM = (Vdom: cbreactDom) => {
  const { type, config, children } = Vdom;

  const dom = document.createElement(type as string);
  if (Object.keys(config).length > 0) {
    Object.keys(config).map(name => {
      setAttribute(dom, name, config[name]);
    });
  }
  return dom;
};

const setAttribute = (dom: HTMLElement, name: string, value: any): void => {
  if (name === "className") {
    name = "class";
  }
  dom.setAttribute(name, value);
};
