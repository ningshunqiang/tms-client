import {
  CachesDocument,
  CachesQuery,
  CachesQueryVariables,
  useCreateCacheMutation,
} from "@/generated/graphql";

import useCachesQueryVariablesState from "./variablesStates/useCachesQueryVariablesState";

export default () => {
  const [variables] = useCachesQueryVariablesState();

  return useCreateCacheMutation({
    update(cache, mutationResult) {
      if (mutationResult.data) {
        const cacheResult = cache.readQuery<CachesQuery, CachesQueryVariables>({
          query: CachesDocument,
          variables,
        });

        if (!cacheResult.caches.pageInfo.hasNextPage) {
          cacheResult.caches.edges.push({
            node: mutationResult.data.createCache,
            __typename: "CacheEdge",
          });

          cache.writeQuery({
            query: CachesDocument,
            variables,
            data: cacheResult,
          });
        }
      }
    },
  });
};
