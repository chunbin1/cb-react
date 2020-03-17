// interface Icbreact {
//   createElement?: Function;
//   render?: Function;
// }

// let Cbreact: Icbreact = {};

interface cbreactDom {
  type: string;
  config: any;
  children?: cbreactDom | cbreactDom[];
}

export const createElement = (
  type: string,
  config: any,
  ...children: cbreactDom[]
): cbreactDom => {
  console.log(type)
  return {
    type,
    config,
    children
  };
};

export const render = (Vdom: cbreactDom, root: HTMLElement) => {
  const { type, config, children } = Vdom;
  const dom = document.createElement(type);
  if (Object.keys(config).length > 0) {
    Object.keys(config).map(name => {
      setAttribute(dom, name, config[name]);
    });
  }
  root.appendChild(dom)
};

const setAttribute = (dom: HTMLElement, name: string, value: any): void => {
  if (name === "className") {
    name = "class";
  }
  dom.setAttribute(name, value);
};