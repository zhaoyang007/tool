# 开发环境

创建react项目：

```bash
npx create-react-app react-demo
```

# JSX

**循环渲染**

```jsx
const list = ['Vue', 'React', 'Angular']
function App() {
	return (
    <div>
      <ul>
        { list.map(item => <li key={item}>{ item }</li>) }
      </ul>
    </div>
  )
}
```

**条件渲染**

```jsx
const isLogin = true
const type = 1
function getArticleContent() {
  if (type === 0) {
    return <div>无图文案</div>
  } else if (type === 1) {
		return <div>单图文案</div>
  } else {
    return <div>三图文案</div>
  }
}
function App() {
	return (
    <div>
    	{ /* 1.逻辑与 */ }
      { isLogin && <span>this is span</span>}
      { /* 2.三元 */ }
      { isLogin ? <span>tom</span> : <span>loading...</span>}
      { /* 3.复杂情况：函数+if */ }
      { getArticleContent() }
    </div>
  )
}
```

**事件绑定**

语法：`on + 事件名称 = { 事件处理函数 }`，命名小驼峰。

```jsx
function App() {
  // 1.基础情况
  const handleClick = () => {
    console.log('点击了')
  }
  // 2.事件对象
  const handleClick = (e) => {
    console.log('点击了', e)
  }
  // 3.自定义传参
  const handleClick = (name) => {
    console.log('点击了', name)
  }
  // 4.自定义传参+时间对象
  const handleClick = (name, e) => {
    console.log('点击了', name, e)
  }
	return (
    <div>
      { /* 1 2 */ }
    	<button onClick={handleClick}></button>
      { /* 3 */ }
      <button onClick={() => handleClick('tom')}></button>
      { /* 4 */ }
      <button onClick={(e) => handleClick('tom', e)}></button>
    </div>
  )
}
```

# React组件

react组件就是一个首字母大写的函数。

```jsx
// 1.定义组件
// 普通函数
function Button() {
  // 组件逻辑...
  
  // 组件结构
  return <button>click me!</button>
}
// 箭头函数
const Button = () => {
  // 组件逻辑...
  
  // 组件结构
  return <button>click me!</button>
}

// 2.使用组件
function App() {
	return (
    <div>
    	{ /* 单标签 */ }
      <Button/>
      { /* 双标签 */ }
      <Button></Button>
    </div>
  )
}
```

**组件状态**

useState是一个React Hook函数，它允许向组件添加一个状态变量，从而控制组件渲染结果（数据响应式）。

```jsx
import { useState } from 'react'

function App() {
  // count：状态变量
  // setCount：修改状态变量的方法
  const [ count, setCount ] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
  }
	return (
    <div>
      <button onClick={ handleClick }>+1</button>
      <p>{ count }</p>
    </div>
  )
}
```

**状态不可变**

react中状态是只读的，不能直接修改状态，而要替换。直接修改状态不能引发视图更新。

```jsx
// 错误写法
count++
// 正确写法
setCount(count + 1)
```

**修改对象状态**

不能直接修改对象的属性，要始终使用set方法并传入全新的对象。

```jsx
import { useState } from 'react'

function App() {
  // count：状态变量
  // setCount：修改状态变量的方法
  const [ form, setForm ] = useState({
    name: 'tom'
  })
  const handleClick = () => {
    // 错误
    form.name = 'jack'
    // 正确
    setForm({
      ...form,
      name: 'jack'
    })
  }
	return (
    <div>
      <button onClick={ handleClick }>change name</button>
      <p>{ form }</p>
    </div>
  )
}
```

**样式控制**

```css
.foo {
  color: blue;
}
```

```jsx
function App() {
	return (
    <div>
      {/* 行内样式 */}
      <span style={ {color: 'red', fontSize: '50px'} }>this is span</span>
      {/* class类名 */}
      <span className="foo">this is span</span>
    </div>
  )
}
```

**双向绑定**

```jsx
import { useState } from 'react'
function App() {
  const [value, setValue] = useState('')
	return (
    <div>
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        type="text"/>
    </div>
  )
}
```

**获取dom**

```jsx
import { useRef } from 'react'
function App() {
  // 1.使用useRef创建ref对象，并于jsx绑定
	const inputRef = useRef(null)
  const getDom = () => {
    // 2.在dom可用时，通过ref对象的current获取dom
    console.log(inputRef.current)
  }
	return (
    <div>
      <input ref={inputRef} type="text"/>
      <button onClick={getDom}></button>
    </div>
  )
}
```

**组件通信**

父传子：

```jsx
// 父传子
// 1.父组件传递数据：子组件标签上绑定自定义属性
// 2.子组件接收数据：props参数
function Son(props) {
  return <div>this is son，{props.name}</div>
}
function App() {
	const name = 'this is app name'
  return {
    <div>
      <Son name={name} />
    </div>
  }
}
```

props说明：

* props可以传递任意数据：数字、字符串、数组、对象、函数、JSX

* props是只读对象，子组件只能读取props中的数据，不能直接修改，父组件的数据只能由父组件修改

props children：

```jsx
function Son(props) {
  // props.children用于接收组件内嵌套的jsx
  return <div>this is son，{props.children}</div>
}
function App() {
  return {
    <div>
      <Son>
        <div>this is span</div>
      </Son>
    </div>
  }
}
```

子传父：

```jsx
// 子传父
// 1.父组件传递函数
// 2.子组件接收函数，并调用传参
function Son({ onGetSonMsg }) {
  const sonMsg = 'this is son msg'
  return (
    <div>
  		this is Son
      <button onClick={() => onGetSonMsg(sonMsg)}></button>
  	</div>
  )
}
function App() {
	const getMsg = (msg) => {
    console.log(msg)
  }
  return {
    <div>
      <Son onGetSonMsg={getMsg} />
    </div>
  }
}
```

使用状态提升实现兄弟组件通信：找到相同的父组件，完成子传父和父传子。

使用Context机制实现跨层级组件通信：

```jsx
// 组件关系：App -> A -> B
// 跨层级组件通信
// 1.使用createContext方法创建一个上下文对象
// 2.在顶层组件，通过Provider组件提供数据
// 3.在底层组件，通过useContext钩子函数使用数据
import { createContext, useContext } from 'react'
const MsgContext = createContext()
function A() {
  return (
    <div>
    	this is A
      <B />
    </div>
  )	
}
function B() {
  const msg = useContext(MsgContext)
  
  return (
    <div>
    	this is B，{ msg }
    </div>
  )	
}
function App() {
  const msg = 'this is app msg'
  return (
    <div>
      <MsgContext.Provider value={msg}>
        this is App
        <A />
      </MsgContext.Provider>
    </div>
  )	
}
```

**useEffect**





props 属性，不可变的

state 状态，可变的

保持组件纯粹：使用纯函数编写组件，也就是函数组件中不修改外部的变量。当你不得不修改时，可以使用事件，如果没有合适的事件，最后的选择是调用组件中的 [`useEffect`](https://react.docschina.org/reference/react/useEffect) 方法将其附加到返回的 JSX 中。这会告诉 React 在渲染结束后执行它。

纯函数：

- **只负责自己的任务**。它不会更改在该函数调用前就已存在的对象或变量。
- **输入相同，则输出相同**。给定相同的输入，纯函数应总是返回相同的结果。

有两种原因会导致组件的渲染:

1. 组件的 **初次渲 染。**
2. 组件（或者其祖先之一）的 **状态发生了改变。**

总而言之，以下是你可以考虑传递给 `setSomthing` state 设置函数的内容：

- **一个更新函数**（例如：`n => n + 1`）会被添加到队列中。更新函数会改变本次渲染的state的值。
- **任何其他的值**（例如：数字 `5`）会导致“替换为 `5`”被添加到队列中，已经在队列中的内容会被忽略。

setter执行后，重新渲染，setter中传入的更新函数和其他值会被添加到队列，传入其他值会后，已经在队列中的内容会被忽略。