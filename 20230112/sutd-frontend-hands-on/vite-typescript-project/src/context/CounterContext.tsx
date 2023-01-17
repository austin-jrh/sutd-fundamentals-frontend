import {
  ChangeEvent,
  ReactElement,
  createContext,
  useReducer,
  useCallback,
} from "react";

type StateType = {
  count: number;
  message: string;
};

export const initState = {
  count: 200,
  message: "",
};

// define action type with enum
const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

// reducer function receives curent state and action
// return a new state based on the action
const reducer = (
  state: typeof initState,
  action: ReducerAction
): typeof initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, message: action.payload ?? "" };
    default:
      throw new Error();
  }
};

type useCounterContextType = {
  state: StateType;
  increment: () => void;
  decrement: () => void;
  handlePayload: (e: ChangeEvent<HTMLInputElement>) => void;
};

// custom hook that will call useReducer for us and return: state, dispatch increment, dispatch decrement, dispatch handlePayload
const useCounterContext = (initState: StateType): useCounterContextType => {
  const [state, dispatch] = useReducer(reducer, initState);

  const increment = useCallback(() => {
    dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  }, []); // useCallback without aempty dependancy array is basically useless (called each render)
  const decrement = useCallback(() => {
    dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
  }, []); // useCallback without aempty dependancy array is basically useless (called each render)
  const handlePayload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value });
  }, []); // useCallback without aempty dependancy array is basically useless (called each render)

  return { state, increment, decrement, handlePayload };
};

// this is not a type, this is an init OBJECT for counter CONTEXT
// notice it uses a comma, which means this initContextState is an object
const initContextState: useCounterContextType = {
  state: initState,
  increment: () => {}, // just some placeholder empty function matching the signature of the type
  decrement: () => {},
  handlePayload: (e: ChangeEvent<HTMLInputElement>) => {},
};

// create the counter context using the initialised context state above
export const CounterContext =
  createContext<useCounterContextType>(initContextState);

// for each context created, we need a context provider
type ChildrenType = {
  children: ReactElement | undefined;
};

// ReactElement is the type for elements in React, either created via JSX or React.createElement
export const CounterProvider = ({
  children,
  ...initState
}: ChildrenType & StateType): ReactElement => {
  return (
    <CounterContext.Provider value={useCounterContext(initState)}>
      {children}
    </CounterContext.Provider>
  );
};
