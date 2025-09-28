import { createContext, useContext, useState, ReactNode } from 'react';

interface TodoProviderType{
    todos : string[]
    dones : string[]
    addTodo : (value: string) => void
    completeTodo : (value: string) => void
    deleteTodo : (value: string) => void
}

export const TodoContext = createContext<TodoProviderType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
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
    <TodoContext.Provider
      value={{ todos, dones, addTodo, completeTodo, deleteTodo}}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      'useTodo는 반드시 TodoProvider 내부에서 사용되어야 합니다.'
    );
  }
  return context;
};