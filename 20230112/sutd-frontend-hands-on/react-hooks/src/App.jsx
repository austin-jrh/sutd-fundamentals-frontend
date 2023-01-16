import { useState, useEffect, useMemo, useCallback } from "react";
import UseTransitionExample from "./component/UseTransitionExample";
import UseDeferredExample from "./component/UseDeferredValueExample";
import SearchBar from "./component/SearchBar";
import FormInput from "./component/FormInput";
import Video from "./component/Video";
import PreviousPrice from "./component/PreviousPrice";

function App() {
  return (
    <main className="App">
      <PreviousPrice />
    </main>
  );
}

export default App;
