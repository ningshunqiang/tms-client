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

interface StorageState {
  queryParams?: { [key: string]: any };
}

export const StorageContext = createContext<
  UseStateReturnType<StorageState> | undefined
>(undefined);

export function StorageProvider<T>({
  children,
  ...props
}: Props<T>): ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StorageContext.Provider value={useState({})} {...props}>
      {children}
    </StorageContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useTask() {
  const content = useContext(StorageContext);

  if (!content) throw new Error();

  const [state, setState] = content;

  return {
    queryParams: state.queryParams,
    setQueryParams(queryParams: StorageState["queryParams"]): void {
      setState({ ...state, queryParams });
    },
  };
}
