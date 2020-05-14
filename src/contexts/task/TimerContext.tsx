/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  Dispatch,
  Props,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from "react";

type UseStateReturnType<T> = [T, Dispatch<SetStateAction<T>>];

interface TimerState {
  queryParams?: { [key: string]: any };
}

export const TimerContext = createContext<
  UseStateReturnType<TimerState> | undefined
>(undefined);

export function TimerProvider<T>({
  children,
  ...props
}: Props<T>): ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TimerContext.Provider value={useState({})} {...props}>
      {children}
    </TimerContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useTimer() {
  const content = useContext(TimerContext);

  if (!content) throw new Error();

  const [state, setState] = content;

  return {
    queryParams: state.queryParams,
    setQueryParams(queryParams: TimerState["queryParams"]): void {
      setState({ ...state, queryParams });
    },
  };
}
