import { createElement, render } from "./cb-react";
// console.log(createElement,render)
const A = () => {
  return <div className="hello">hello</div>;
};

console.log(A);

console.log(<A />);

render(<A />, document.getElementById("root"));
