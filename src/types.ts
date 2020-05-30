export type BasicElement = Vdom | string | number | boolean;
export type ChildArr = Array<Vdom>;
export type VdomType = string | Function | Symbol;

interface Props {
  [name: string]: any;
  nodeValue?: string;
  children?: ChildArr;
}

export interface Vdom {
  type: VdomType;
  props: Props;
}

export interface Fiber {
  key?: string;
  dirty?: boolean | number;
  type?: VdomType;
  dom: HTMLElement | Text;
  props?: Props;
  sibling?: Fiber;
  parent?: Fiber;
  child?: Fiber;
}
