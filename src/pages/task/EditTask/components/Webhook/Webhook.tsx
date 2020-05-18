/* eslint-disable no-undef */
import { Badge, Button, Card, Divider, message, Popconfirm } from "antd";
import copy from "copy-to-clipboard";
import React, {
  ReactElement,
  ReactNode,
  SFC,
  useCallback,
  useMemo,
  useState,
} from "react";

import { QueryTable } from "@/components/QueryTable/QueryTable";
import { FilterType, SimpleColumnType } from "@/components/SimpleTable";
import {
  TaskFragment,
  useCreateWebhookMutation,
  useDeleteWebhookMutation,
  useUpdatedWebhookMutation,
  useWebhooksQuery,
  WebhookFragment,
  WebhooksQuery,
} from "@/generated/graphql";
import useWebhooksQueryVariablesState from "@/hooks/variablesStates/useWebhooksQueryVariablesState";

import EditWebhook from "./components/EditWebhook";

interface WebhookProps {
  id: TaskFragment["id"];
}

const Webhook: SFC<WebhookProps> = ({ id }): ReactElement => {
  const [
    handleUpdateWebhook,
    { loading: upDataLoading },
  ] = useUpdatedWebhookMutation();
  const [
    handleCreateWebhook,
    { loading: createLoading },
  ] = useCreateWebhookMutation();

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<WebhookFragment>();
  const { variables, setVariables } = useWebhooksQueryVariablesState();

  const { data, loading, refetch, fetchMore } = useWebhooksQuery({
    variables: {
      taskId: id,
      ...variables,
    },
  });

  const [
    handleDeleteWebhook,
    { loading: deleteLoading },
  ] = useDeleteWebhookMutation();

  const handleDeleteClick = useCallback(
    async (webhook): Promise<void> => {
      try {
        await handleDeleteWebhook({ variables: { id: webhook.id } });
        message.success("删除成功！");
        refetch();
      } catch {
        message.error("删除失败！");
      }
    },
    [handleDeleteWebhook, refetch]
  );

  const handleOnCancel = () => {
    setCurrent(null);
    setVisible(false);
  };

  const handleOnOk = async (value: WebhookFragment) => {
    if (current?.id) {
      try {
        setVisible(false);

        await handleUpdateWebhook({
          variables: { id: current.id, input: value },
        });
        setCurrent(null);
        message.success("更新成功");
      } catch {
        message.error("更新失败");
      }
    } else {
      try {
        setVisible(false);
        await handleCreateWebhook({
          variables: {
            input: {
              ...value,
              taskId: id,
            },
          },
        });
        setCurrent(null);
        refetch();
        message.success("创建成功");
      } catch {
        message.error("创建失败");
      }
    }
  };

  const columns = useMemo(
    (): SimpleColumnType<WebhookFragment>[] => [
      {
        key: "name",
        title: "名称",
        dataIndex: "name",
        width: 80,

        copyable: true,
        ellipsis: true,
        sorter: true,
        filterType: FilterType.Input,
      },
      {
        width: 120,
        filterType: FilterType.Input,
        key: "id",
        title: "id",
        dataIndex: "id",
        copyable: true,
        ellipsis: true,
        sorter: true,
      },

      {
        key: "enable",
        title: "应用状态",
        dataIndex: "enable",
        ellipsis: true,
        sorter: true,

        width: 120,
        filters: [
          { text: "运行", value: true },
          { text: "关闭", value: false },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ] as any,
        render: (value, row: WebhookFragment): ReactNode =>
          row.enable ? (
            <Badge status="processing" text="运行" />
          ) : (
            <Badge status="default" text="关闭" />
          ),
      },
      {
        key: "action",
        title: "操作",
        align: "right",
        fixed: "right",
        width: 120,

        ellipsis: true,
        sorter: true,

        render: (webhook: WebhookFragment): ReactElement => (
          <span>
            <>
              <Divider type="vertical" />
              <Button
                type="link"
                onClick={() => {
                  copy(`${SERVER_URL}-${webhook.token}`);
                  message.info("已复制 Webhook 地址到剪切板");
                }}
              >
                复制 Webhook
              </Button>
            </>
            <>
              <Divider type="vertical" />
              <Divider type="vertical" />
              <Button
                style={{ padding: 0, border: 0 }}
                type="link"
                onClick={(): void => {
                  setCurrent(webhook);
                  setVisible(true);
                }}
              >
                编辑
              </Button>
            </>
            <>
              <Divider type="vertical" />
              <Popconfirm
                cancelText="取消"
                okText="确定"
                title={`删除 ${webhook.name} 任务？`}
                onConfirm={(): Promise<void> => handleDeleteClick(webhook)}
              >
                <Button style={{ padding: 0, border: 0 }} type="link">
                  删除
                </Button>
              </Popconfirm>
            </>
          </span>
        ),
      },
    ],
    [handleDeleteClick]
  );

  return (
    <Card>
      <QueryTable<WebhookFragment>
        columns={columns}
        dataSource={data?.task.webhooks.edges.map(
          ({ node }): WebhookFragment => node
        )}
        hasMore={data?.task.webhooks.pageInfo.hasNextPage}
        id="webhook"
        loading={loading || deleteLoading || upDataLoading || createLoading}
        name="webhook"
        rowKey="id"
        toolBarRender={(): ReactNode[] => [
          <Button
            type="primary"
            onClick={(): void => {
              setVisible(true);
            }}
          >
            创建 Webhook
          </Button>,
        ]}
        variables={variables}
        onLoadMore={(): void => {
          fetchMore({
            variables: {
              after: data?.task.webhooks.pageInfo.endCursor,
            },
            updateQuery: (
              previousResult,
              { fetchMoreResult }
            ): WebhooksQuery => {
              if (!fetchMoreResult) return previousResult;

              return {
                task: {
                  id: fetchMoreResult.task.id,
                  webhooks: {
                    __typename: previousResult.task.webhooks.__typename,
                    totalCount: fetchMoreResult.task.webhooks.totalCount,
                    pageInfo: fetchMoreResult.task.webhooks.pageInfo,
                    edges: [
                      ...previousResult.task.webhooks.edges,
                      ...fetchMoreResult.task.webhooks.edges,
                    ],
                  },
                },
              };
            },
          });
        }}
        onRefresh={() => refetch()}
        onVariablesChange={() => setVariables}
      />

      <EditWebhook
        current={current}
        visible={visible}
        onCancel={handleOnCancel}
        onOk={handleOnOk}
      />
    </Card>
  );
};

export default Webhook;
