import { useState, useCallback, MouseEvent, KeyboardEvent } from "react";

interface User {
  id: number;
  username: string;
}

const Counter = () => {
  const [count, setCount] = useState<number>(1);
  // defining state type with interface
  const [users, setUsers] = useState<User[] | null>(null);

  const increment = () => {
    setCount((prev: number): number => prev + 1);
  };

  const decrement = () => {
    setCount((prev: number): number => prev - 1);
  };

  const addTwo = useCallback(
    (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => {
      setCount((prev: number): number => prev + 2);
    },
    [] // doesn't depend on anything
  );

  return (
    <>
      <h1>Count is {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={addTwo}>Add Two</button>
    </>
  );
};

export default Counter;
