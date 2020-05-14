import { pick } from "lodash";
import qs from "qs";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { useQuery } from "@/hooks/useReactRouterQuery";

export default function useRouteParamsState(
  options: string[]
): [
  { [key: string]: string },
  Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >
] {
  const query = useQuery();
  const history = useHistory();
  const [state, setState] = useState<{
    [key: string]: string;
  }>(pick(query, options));

  return [
    state,
    useCallback(
      (newState) => {
        if (Object.keys(newState).length > 0) {
          const tempNewState = { ...query, ...pick(newState, options) };
          Object.keys(newState).forEach((key) => {
            if (!newState[key] || decodeURIComponent(newState[key]) === "{}") {
              delete tempNewState[key];
            }
          });
          history.push(
            `${window.location.pathname}?${qs.stringify(tempNewState)}`
          );
        } else {
          history.push(window.location.pathname);
        }
        return setState(newState);
      },
      [history, options, query]
    ),
  ];
}
