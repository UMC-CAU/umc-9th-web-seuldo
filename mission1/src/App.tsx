import { useState} from 'react'
import './App.css'
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';

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