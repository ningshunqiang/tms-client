/* eslint-disable @typescript-eslint/explicit-function-return-type */

import {
  TimersDocument,
  TimersQuery,
  TimersQueryVariables,
  useCreateTimerMutation,
} from "@/generated/graphql";

import useTimersQueryVariablesState from "./variablesStates/useTimersQueryVariablesState";

export default () => {
  const [variables] = useTimersQueryVariablesState();

  return useCreateTimerMutation({
    update(cache, mutationResult) {
      if (mutationResult.data) {
        const cacheResult = cache.readQuery<TimersQuery, TimersQueryVariables>({
          query: TimersDocument,
          variables,
        });

        if (!cacheResult.task.timers.pageInfo.hasNextPage) {
          cacheResult.task.timers.edges.push({
            node: mutationResult.data.createTimer,
            __typename: "TimerEdge",
          });

          cache.writeQuery({
            query: TimersDocument,
            variables,
            data: cacheResult,
          });
        }
      }
    },
  });
};
