type BasicElement = Vdom | string | number | boolean;
type Child = Array<BasicElement>;

interface Vdom {
  type: string | Function;
  config?: any;
  children?: Child;
}

export default function createElement(
  type: string,
  config: any,
  ...children: Child
): Vdom {
  return {
    type,
    config,
    children,
  };
}
