import {
  TasksDocument,
  TasksQuery,
  TasksQueryVariables,
  useCreateTaskMutation,
} from "@/generated/graphql";

import useTasksQueryVariablesState from "./variablesStates/useTasksQueryVariablesState";

export default () => {
  const [variables] = useTasksQueryVariablesState();

  return useCreateTaskMutation({
    update(cache, mutationResult) {
      if (mutationResult.data) {
        const cacheResult = cache.readQuery<TasksQuery, TasksQueryVariables>({
          query: TasksDocument,
          variables,
        });

        if (!cacheResult.tasks.pageInfo.hasNextPage) {
          cacheResult.tasks.edges.push({
            node: mutationResult.data.createTask,
            __typename: "TaskEdge",
          });

          cache.writeQuery({
            query: TasksDocument,
            variables,
            data: cacheResult,
          });
        }
      }
    },
  });
};
