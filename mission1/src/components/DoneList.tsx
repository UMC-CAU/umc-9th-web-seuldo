import ListItem from './ListItem';

//deleteTodo 전달용으로만 사용
function DoneList({dones, deleteTodo}:{dones:string[], deleteTodo:(t: string) => void}){

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