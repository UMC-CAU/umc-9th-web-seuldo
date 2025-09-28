import { useRef } from 'react'
import { useTodo } from '../context/TodoProvider';

function TodoInput(){

  const { addTodo } = useTodo();
  
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

export default TodoInput