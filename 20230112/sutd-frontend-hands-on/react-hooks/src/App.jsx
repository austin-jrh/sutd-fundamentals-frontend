import { useState, useEffect, useMemo, useCallback } from "react";
import Fibonacci from "./component/Fibonacci";
import UseReducerExample from "./component/UseReducerExample";

// const getArray = () => {
//   for (let i = 0; i < 1000000000; i++) {
//     //do something expensive
//   }
//   return ["Jane", "Doe"];
// };

function App() {
  const [userNumber, setUserNumber] = useState("");
  const [randomInput, setRandomInput] = useState("");

  // expensive stuff to compute
  // useCallback does not memorize the result of fib
  // it memorize the function
  // this is a pure function
  const fib = useCallback((n) => {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
  }, []);

  console.log("Component rendered at ", Date.now());

  // still gets recomputed everytime this App is rendered
  const fibNumber = useMemo(() => fib(userNumber), [userNumber, fib]);

  return (
    <main className="App">
      {/* <label>Fibonacci Sequence:</label>
      <input
        type="number"
        value={userNumber}
        placeholder="Position"
        onChange={(e) => setUserNumber(e.target.value)}
      />
      <p>Number: {fibNumber || "--"}</p> */}
      <Fibonacci
        userNumber={userNumber}
        setUserNumber={setUserNumber}
      ></Fibonacci>

      <label>Random Input:</label>
      <input
        type="text"
        value={randomInput}
        placeholder="Random Input"
        onChange={(e) => setRandomInput(e.target.value)}
      />
      <p>{randomInput}</p>

      <UseReducerExample />
    </main>
  );
}

export default App;
