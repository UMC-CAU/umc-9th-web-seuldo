import ListItem from './ListItem';
import { useTodo } from '../context/TodoProvider';

function DoneList(){
  const { dones, deleteTodo } = useTodo();
  
  return(
    <>
      <div className="todo-container__done-list">
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