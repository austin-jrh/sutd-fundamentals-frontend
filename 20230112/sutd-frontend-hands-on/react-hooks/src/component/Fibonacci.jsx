import { memo } from "react";
import { useCallback } from "react";

const Fibonacci = memo(function ({ userNumber, setUserNumber }) {
  // useCallback with an empty dependency array is a memoized function, which does not compute updated states (if you have states inside it, it'll use the initial value passed in useState.
  const fib = useCallback((n) => {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
  }, []);

  // log when it's rendered
  console.log("Component rendered at ", Date.now());

  // recomputed each render
  const fibNumber = fib(userNumber);

  return (
    <>
      <label>Fibonacci Sequence:</label>
      <input
        type="number"
        value={userNumber}
        placeholder="Position"
        onChange={(e) => setUserNumber(e.target.value)}
      />
      <p>Number: {fibNumber || "--"}</p>
    </>
  );
});

export default Fibonacci;
