import { createElement, render } from "./cb-react";
// console.log(createElement,render)
const A = (
  <div className="hello">
    你好啊
  </div>
);

const B = () => {
  return <div className="fc">
    函数组件
    <a href="wwfw">你好啊</a>
  </div>
}


const C = <div></div>;

console.log(A);
console.log(C);

// console.log(<A />);

render(<B/>, document.getElementById("root"));
