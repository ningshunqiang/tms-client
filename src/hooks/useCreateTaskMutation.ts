/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useTask } from "@/contexts/task/MyTaskContext";
import {
  TasksDocument,
  TasksQuery,
  TasksQueryVariables,
  useCreateTaskMutation,
} from "@/generated/graphql";

export default () => {
  const { queryParams } = useTask();

  return useCreateTaskMutation({
    update(cache, mutationResult) {
      if (mutationResult.data) {
        const cacheResult = cache.readQuery<TasksQuery, TasksQueryVariables>({
          query: TasksDocument,
          variables: queryParams,
        });

        if (!cacheResult.tasks.pageInfo.hasNextPage) {
          // 分页
          cacheResult.tasks.edges.push({
            node: mutationResult.data.createTask,
            __typename: "TaskEdge",
          });

          cache.writeQuery({
            query: TasksDocument,
            variables: queryParams,
            data: cacheResult,
          });
        }
      }
    },
  });
};
