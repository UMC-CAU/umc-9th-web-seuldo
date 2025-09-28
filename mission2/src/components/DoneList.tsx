import ListItem from './ListItem';
import { useTodo } from '../context/TodoProvider';
import { useTheme, THEME } from "../context/themeprovider";
import clsx from 'clsx'

function DoneList(){
  const { dones, deleteTodo } = useTodo();
  const {theme} = useTheme()

  const isLightMode = theme === THEME.LIGHT;

  return(
    <>
      <div className={clsx(
                "todo-container__done-list",
                isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
              )}>
        <h2 className="todo-container__done-list-title">완료</h2>
        <ul>
          {dones.map((item, i)=>(
            <li className="todo-container__done-list-element" key={i}>
              <ListItem 
                item={item}
                buttonText='삭제'
                buttonClassName='todo-container__done-list-element-button'
                onClick={()=>deleteTodo(item)}/>
            </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default DoneList