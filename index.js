import React from 'react'
import ReactDOM from 'react-dom'

console.log('sdfds')
const a = <div>你好</div>
const A = () => {
  return <div>你好啊</div>
}

console.log(a)

ReactDOM.render(<A/>,document.getElementById('root'))

