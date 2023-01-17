import Heading from "./components/Heading";
import { Section } from "./components/Section";
import Counter from "./components/Counter";
import { useState } from "react";
import CounterWithCallbacks from "./components/CounterWithCallbacks";
import List from "./components/List";
import MoreHooks from "./components/MoreHooks";
import CounterUseReducer from "./components/CounterUseReducer";

import { CounterProvider, initState } from "./context/CounterContext";
import CounterUseContext from "./components/CounterWithContext";

function App() {
  const [count, setCount] = useState<number>(1);

  const increment = () => {
    setCount((prev: number): number => prev + 1);
  };

  const decrement = () => {
    setCount((prev: number): number => prev - 1);
  };

  return (
    <>
      <Heading title="Happy New Year!" />
      <Section>
        Bacon ipsum dolor amet burgdoggen fatback corned beef, flank tri-tip
        shank pork chislic strip steak pig ball tip ham bacon tongue sausage.
        Flank ground round pastrami cupim ham, kevin short loin alcatra pig jowl
        shankle bresaola chuck tri-tip boudin. Bacon kevin beef shankle, spare
        ribs burgdoggen drumstick. Strip steak landjaeger kevin, filet mignon
        tail ribeye frankfurter pork loin pancetta turkey pastrami. Boudin
        brisket beef, strip steak pork chop picanha shankle meatball corned beef
        drumstick sausage.
      </Section>
      <Counter></Counter>
      <CounterWithCallbacks increment={increment} decrement={decrement}>
        Alternate count value is {count}
        <MoreHooks></MoreHooks>
      </CounterWithCallbacks>
      <List
        items={["Bird", "Cat", "Monkey"]}
        render={(item: string) => <span className="gold">{item}</span>}
      ></List>
      <CounterUseReducer>
        {(num: number) => <>Current count with useReducer: {num}</>}
      </CounterUseReducer>
      <CounterProvider count={initState.count} message={initState.message}>
        <CounterUseContext>
          {(num: number) => <>Current count with useContext: {num}</>}
        </CounterUseContext>
      </CounterProvider>
    </>
  );
}

export default App;
