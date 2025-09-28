import ListItem from './ListItem';
import { useTodo } from '../context/TodoProvider';

function TodoList(){
  const { todos, completeTodo} = useTodo();

  return(
    <>
      <div className='todo-container__todo-list'>
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