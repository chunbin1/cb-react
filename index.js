import React from 'react'

console.log('sdfds')
const a = React.createElement(
  "div",
  {id:"hi"},
  React.createElement("a",null,'bar')
)
// funciton createElement(node,props,children){
//   return {
//     type:node,
//     props:{
//       ...props,
//       children,
//     }
//   }
// }
console.log(a)