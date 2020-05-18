import {
  useCreateWebhookMutation,
  WebhooksDocument,
  WebhooksQuery,
  WebhooksQueryVariables,
} from "@/generated/graphql";

import useWebhooksQueryVariablesState from "./variablesStates/useWebhooksQueryVariablesState";

export default () => {
  const [variables] = useWebhooksQueryVariablesState();
  return useCreateWebhookMutation({
    update(cache, mutationResult) {
      if (mutationResult.data) {
        const cacheResult = cache.readQuery<
          WebhooksQuery,
          WebhooksQueryVariables
        >({
          query: WebhooksDocument,
          variables,
        });

        if (!cacheResult.task.webhooks.pageInfo.hasNextPage) {
          cacheResult.task.webhooks.edges.push({
            node: mutationResult.data.createWebhook,
            __typename: "WebhookEdge",
          });

          cache.writeQuery({
            query: WebhooksDocument,
            variables,
            data: cacheResult,
          });
        }
      }
    },
  });
};
