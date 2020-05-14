/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useTimer } from "@/contexts/task/TimerContext";
import {
  TimersDocument,
  TimersQuery,
  TimersQueryVariables,
  useCreateTimerMutation,
} from "@/generated/graphql";

export default () => {
  const { queryParams } = useTimer();

  return useCreateTimerMutation({
    update(cache, mutationResult) {
      if (mutationResult.data) {
        const cacheResult = cache.readQuery<TimersQuery, TimersQueryVariables>({
          query: TimersDocument,
          variables: queryParams,
        });

        if (!cacheResult.timers.pageInfo.hasNextPage) {
          // 分页
          cacheResult.timers.edges.push({
            node: mutationResult.data.createTimer,
            __typename: "TimerEdge",
          });

          cache.writeQuery({
            query: TimersDocument,
            variables: queryParams,
            data: cacheResult,
          });
        }
      }
    },
  });
};
