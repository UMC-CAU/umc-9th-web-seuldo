import ListItem from './ListItem';
import { useTodo } from '../context/TodoProvider';
import { useTheme, THEME } from "../context/themeprovider";
import clsx from 'clsx'

function TodoList(){
  const { todos, completeTodo} = useTodo();
  const {theme} = useTheme()
  const isLightMode = theme === THEME.LIGHT;

  return(
    <>
      <div className={clsx(
          'todo-container__todo-list',
          isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
        )}>
        <h2 className="todo-container__todo-list-title">할 일</h2>
        <ul>
          {todos.map((item, i)=>(
            <li className="todo-container__todo-list-element" key={i}>
              <ListItem 
                item={item}
                buttonText='완료'
                buttonClassName='todo-container__todo-list-element-button'
                onClick={()=>completeTodo(item)}/>
            </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default TodoList