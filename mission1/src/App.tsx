import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState<string[]>([])
  const [dones, setDone] = useState<string[]>([])

  const addTodo = (todo: string) =>{
    todo = todo.trim()
    if (todo === "") return 
    setTodos((prev) => [...prev, todo])
  }

  const completeTodo = (done: string) =>{
    setDone((prev) => [...prev, done])
    setTodos((prev) => prev.filter(t =>t!== done))
  }

  const deleteTodo = (done: string) =>{
    setDone((prev) => prev.filter(t =>t!== done))
  }

  return (
    <>
      <div className="todo-container">
        <Header/>
        <TodoInput addTodo={addTodo}/>
        <div className='todo-container__list'>
          <TodoList todos={todos} completeTodo={completeTodo}/>
          <DoneList dones={dones} deleteTodo={deleteTodo}/>
        </div>
      </div>
    </>
  )
  
}

export default App

function Header(){
  return(
    <>
      <h1 className="todo-container__header">YONG TODO</h1>
    </>
  )
}

function TodoInput({addTodo}:{addTodo:(t:string)=>void}){

  
  const ref = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault(); //기본 제출 막기
    if (!ref.current) return;
    const value = ref.current.value.trim();
    addTodo(value)
    ref.current.value = ""
  }

  return(
    <>
      <form className="todo-container__form" onSubmit={handleInput}>
        <input className="todo-container__text-field" type="text" ref={ref} placeholder="할 일을 입력해주세요." required/>
        <button className="todo-container__add-button" type="submit">할 일 추가</button>
      </form>
    </>
  )
} 

function TodoList({todos, completeTodo}:{todos:string[], completeTodo:(t: string) => void}){

  return(
    <>
      <div className='todo-container__todo-list'>
        <h2 className="todo-container__todo-list-title">할 일</h2>
        <ul>
          {todos.map((item, i)=>(
            <li className="todo-container__todo-list-element" key={i}>
              <p className="todo-container__todo-list-element-text">{item}</p>
              <button className="todo-container__todo-list-element-button" onClick={()=>completeTodo(item)}>완료</button>
            </li>
            ))}
        </ul>
      </div>
    </>
  )
}

function DoneList({dones, deleteTodo}:{dones:string[], deleteTodo:(t: string) => void}){

  return(
    <>
      <div className="todo-container__done-list">
        <h2 className="todo-container__done-list-title">완료</h2>
        <ul>
          {dones.map((item, i)=>(
            <li className="todo-container__done-list-element" key={i}>
              <p className="todo-container__done-list-element-text">{item}</p>
              <button className="todo-container__done-list-element-button" onClick={()=>deleteTodo(item)}>삭제</button>
            </li>
            ))}
        </ul>
      </div>
    </>
  )
}