import { createElement, render } from "./cb-react";
console.log(createElement)
const A = () => {
  return <div className="hello">hello</div>;
};

console.log(A);

console.log(<A />);

// Cbreact.render(<A/>,document.getElementById('root'))
