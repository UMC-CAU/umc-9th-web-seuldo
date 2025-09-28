import { useRef } from 'react'
import { useTodo } from '../context/TodoProvider';
import { useTheme, THEME } from "../context/themeprovider";
import clsx from 'clsx'

function TodoInput(){

  const { addTodo } = useTodo();
  const {theme} = useTheme()

  const isLightMode = theme === THEME.LIGHT;
  
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
      <form className={clsx(
                "todo-container__form",
                isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
              )} onSubmit={handleInput}>
        <input className={clsx(
                "todo-container__text-field",
                isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
              )} type="text" ref={ref} placeholder="할 일을 입력해주세요." required/>
        <button className={clsx(
                "todo-container__add-button",
                isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
              )} type="submit">할 일 추가</button>
      </form>
    </>
  )
} 

export default TodoInput