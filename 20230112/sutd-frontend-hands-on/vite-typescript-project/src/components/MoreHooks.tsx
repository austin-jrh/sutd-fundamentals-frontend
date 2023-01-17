import { useMemo, useRef, ChangeEvent } from "react";

type fibFunc = (n: number) => number;

const fib: fibFunc = (n) => {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
};

const someNumber = 25;

const MoreHooks = () => {
  const fibResult = useMemo<number>(() => fib(someNumber), [someNumber]);

  // the reason we use optional chaining is because we allow inputRef to be null
  const inputRef = useRef<HTMLInputElement>(null);
  console.log(
    "🚀 ~ file: MoreHooks.tsx:16 ~ MoreHooks ~ inputRef",
    inputRef?.current?.value
  );

  const handleInputChange = (e: ChangeEvent) => {
    console.log(inputRef?.current?.value);
  };

  return (
    <>
      <h3>{fibResult}</h3>
      <input ref={inputRef} type="text" onChange={handleInputChange} />
    </>
  );
};

export default MoreHooks;
