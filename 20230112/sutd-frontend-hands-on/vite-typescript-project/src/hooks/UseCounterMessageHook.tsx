import { ChangeEvent, useContext } from "react";
import { CounterContext } from "../context/CounterContext";

type useCounterMessageHookType = {
  message: string;
  handlePayload: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useCounterMessageHook = () => {
  const {
    state: { message },
    handlePayload,
  } = useContext(CounterContext);

  return { message, handlePayload };
};
