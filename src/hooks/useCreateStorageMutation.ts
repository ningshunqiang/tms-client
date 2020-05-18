import {
  StoragesDocument,
  StoragesQuery,
  StoragesQueryVariables,
  useCreateStorageMutation,
} from "@/generated/graphql";

import useStoragesQueryVariablesState from "./variablesStates/useStoragesQueryVariablesState";

export default () => {
  const [variables] = useStoragesQueryVariablesState();

  return useCreateStorageMutation({
    update(cache, mutationResult) {
      if (mutationResult.data) {
        const cacheResult = cache.readQuery<
          StoragesQuery,
          StoragesQueryVariables
        >({
          query: StoragesDocument,
          variables,
        });

        if (!cacheResult.storages.pageInfo.hasNextPage) {
          cacheResult.storages.edges.push({
            node: mutationResult.data.createStorage,
            __typename: "StorageEdge",
          });

          cache.writeQuery({
            query: StoragesDocument,
            variables,
            data: cacheResult,
          });
        }
      }
    },
  });
};
