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

interface TaskState {
  queryParams?: { [key: string]: any };
}

export const TaskContext = createContext<
  UseStateReturnType<TaskState> | undefined
>(undefined);

export function TaskProvider<T>({
  children,
  ...props
}: Props<T>): ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TaskContext.Provider value={useState({})} {...props}>
      {children}
    </TaskContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useTask() {
  const content = useContext(TaskContext);

  if (!content) throw new Error();

  const [state, setState] = content;

  return {
    queryParams: state.queryParams,
    setQueryParams(queryParams: TaskState["queryParams"]): void {
      setState({ ...state, queryParams });
    },
  };
}
