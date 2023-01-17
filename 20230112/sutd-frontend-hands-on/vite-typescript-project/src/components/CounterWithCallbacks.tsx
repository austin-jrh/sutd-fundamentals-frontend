import { ReactNode } from "react";

type CounterWithCallbacksProps = {
  increment: () => void;
  decrement: () => void;
  children: ReactNode;
};

const CounterWithCallbacks = ({
  increment,
  decrement,
  children,
}: CounterWithCallbacksProps) => {
  return (
    <>
      <h1>{children}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
};

export default CounterWithCallbacks;
