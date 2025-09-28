import './App.css'
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';

function App() {
  return (
    <>
      <div className="todo-container">
        <Header/>
        <TodoInput/>
        <div className='todo-container__list'>
          <TodoList/>
          <DoneList/>
        </div>
      </div>
    </>
  )

}

export default App