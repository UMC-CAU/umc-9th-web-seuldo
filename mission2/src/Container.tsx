import { useEffect } from "react";
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import DoneList from './components/DoneList';
import { useTheme, THEME } from "./context/themeprovider";
import clsx from 'clsx'

function Container() {
  const {theme} = useTheme()
  const isLightMode = theme === THEME.LIGHT;

   useEffect(() => {
    document.body.className = isLightMode ? "bg-gray-200" : "bg-gray-900";
  }, [isLightMode]);

  return (
    <>
    <div className={clsx(
          'todo-container__header',
          isLightMode ? 'bg-white text-white' : 'bg-gray-800 text-white'
        )}>
      <div className="todo-container">
        <Header/>
        <TodoInput/>
        <div className='todo-container__list'>
          <TodoList/>
          <DoneList/>
        </div>
      </div>
      </div>
    </>
  )

}

export default Container;