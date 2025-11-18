import { useState, type JSX } from 'react';
import './App.css';
import { useCustomFetch } from './hooks/useCustomFetch';

interface User {
  id: number;
  name: string;
  email: string;
}

function App(): JSX.Element {
  const [id, setID] = useState(0)
  const { data } = useCustomFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  return (
    <>
      <button onClick={() => setID((prev) => prev + 1)}></button>
      <h1>Tanstack Query</h1>
      {data?.name}
    </>
  );
}

export default App;
