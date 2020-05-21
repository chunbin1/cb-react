export type BasicElement = Vdom | string | number | boolean;
export type Child = Array<BasicElement>;

export interface Vdom {
  type: string | Function;
  config?: any;
  children?: Child;
}

export interface Fiber {
  container: HTMLElement;
  props?: Object;
  child?: BasicElement;
  sibling?: Vdom;
  parent?: Vdom;
}
