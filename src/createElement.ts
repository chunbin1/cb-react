import { Vdom, ChildArr } from './types';

export default function createElement(type: string, config: any, ...children: ChildArr): Vdom {
  return {
    type,
    props: {
      ...config,
      children: children.map((child) => {
        return typeof child === 'object' ? child : createText(child);
      }),
    },
  };
}

export const TEXT_TYPE = Symbol('text');

export function createText(vnode: string): Vdom {
  return { type: TEXT_TYPE, props: { children: [], nodeValue: vnode } };
}
