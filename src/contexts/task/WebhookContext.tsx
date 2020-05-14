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

interface WebhookState {
  queryParams?: { [key: string]: any };
}

export const WebhookContext = createContext<
  UseStateReturnType<WebhookState> | undefined
>(undefined);

export function WebhookProvider<T>({
  children,
  ...props
}: Props<T>): ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <WebhookContext.Provider value={useState({})} {...props}>
      {children}
    </WebhookContext.Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useWebhook() {
  const content = useContext(WebhookContext);

  if (!content) throw new Error();

  const [state, setState] = content;

  return {
    queryParams: state.queryParams,
    setQueryParams(queryParams: WebhookState["queryParams"]): void {
      setState({ ...state, queryParams });
    },
  };
}
