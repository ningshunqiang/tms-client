/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useWebhook } from "@/contexts/task/WebhookContext";
import {
  useCreateWebhookMutation,
  WebhooksDocument,
  WebhooksQuery,
  WebhooksQueryVariables,
} from "@/generated/graphql";

export default () => {
  const { queryParams } = useWebhook();
  return useCreateWebhookMutation({
    update(cache, mutationResult) {
      if (mutationResult.data) {
        const cacheResult = cache.readQuery<
          WebhooksQuery,
          WebhooksQueryVariables
        >({
          query: WebhooksDocument,
          variables: queryParams,
        });

        if (!cacheResult.webhooks.pageInfo.hasNextPage) {
          // 分页
          cacheResult.webhooks.edges.push({
            node: mutationResult.data.createWebhook,
            __typename: "WebhookEdge",
          });

          cache.writeQuery({
            query: WebhooksDocument,
            variables: queryParams,
            data: cacheResult,
          });
        }
      }
    },
  });
};
