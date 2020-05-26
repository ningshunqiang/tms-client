import { Badge, Button, Card, Divider, message, Popconfirm } from "antd";
import { GraphQLTable } from "antd-graphql-table";
import { FilterType, SimpleColumnType, ValueType } from "antd-simple-table";
import React, {
  ReactElement,
  ReactNode,
  SFC,
  useCallback,
  useMemo,
} from "react";
import { Link } from "umi";

import {
  TaskFragment,
  TasksQuery,
  useDeleteTaskMutation,
  useTasksQuery,
} from "@/generated/graphql";
import useTasksQueryVariablesState from "@/hooks/variablesStates/useTasksQueryVariablesState";

const MyTask: SFC = (): ReactElement => {
  const [variables, setVariables] = useTasksQueryVariablesState();
  const [deleteTask, { loading: deleteLoading }] = useDeleteTaskMutation();

  const { data, loading, refetch, fetchMore } = useTasksQuery({
    notifyOnNetworkStatusChange: true,
    variables,
  });

  const deleteClick = useCallback(
    async ({ id }): Promise<void> => {
      try {
        await deleteTask({ variables: { id } });
        message.success("删除成功！");
        refetch();
      } catch {
        message.error("删除失败！");
      }
    },
    [deleteTask, refetch]
  );

  const columns = useMemo(
    (): SimpleColumnType<TaskFragment>[] => [
      {
        width: 80,
        key: "id",
        title: "ID",
        dataIndex: "id",
        copyable: true,
        ellipsis: true,
        sorter: true,
      },
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
        key: "key",
        title: "标识",
        dataIndex: "key",
        width: 80,
        copyable: true,
        ellipsis: true,
        sorter: true,
        filterType: FilterType.Input,
      },

      {
        key: "enable",
        title: "状态",
        dataIndex: "enable",
        ellipsis: true,
        sorter: true,
        width: 80,
        filters: [
          { text: "运行", value: true },
          { text: "关闭", value: false },
        ],
        render: (value, row: TaskFragment): ReactNode =>
          row.enable ? (
            <Badge status="processing" text="运行" />
          ) : (
            <Badge status="default" text="关闭" />
          ),
      },

      {
        key: "createdAt",
        title: "创建时间",
        dataIndex: "createdAt",
        width: 100,
        ellipsis: true,
        sorter: true,
        valueType: ValueType.DATE_TIME,
      },
      {
        key: "updatedAt",
        title: "更新时间",
        dataIndex: "updatedAt",
        width: 100,
        ellipsis: true,
        sorter: true,
        valueType: ValueType.DATE_TIME,
      },
      {
        key: "action",
        title: "操作",
        fixed: "right",
        width: 80,
        ellipsis: true,
        sorter: true,
        render: (task: TaskFragment): ReactElement => (
          <span>
            <Link to={`tasks/${task.id}/edit?tab=basic`}>
              <Button style={{ padding: 0, border: 0 }} type="link">
                编辑
              </Button>
            </Link>

            <Divider type="vertical" />
            <Popconfirm
              cancelText="取消"
              okText="确定"
              title={`删除 ${task.name} 任务？`}
              onConfirm={(): Promise<void> => deleteClick(task)}
            >
              <Button style={{ padding: 0, border: 0 }} type="link">
                删除
              </Button>
            </Popconfirm>
          </span>
        ),
      },
    ],
    [deleteClick]
  );

  return (
    <Card>
      <GraphQLTable<TaskFragment>
        columns={columns}
        dataSource={data?.tasks.edges.map(({ node }): TaskFragment => node)}
        hasMore={data?.tasks.pageInfo.hasNextPage}
        id="Tms"
        loading={loading || deleteLoading}
        name="任务管理"
        rowKey="id"
        toolBarRender={(): ReactNode[] => [
          <Link to="tasks/create">
            <Button type="primary">创建任务</Button>
          </Link>,
        ]}
        variables={variables}
        onLoadMore={(): void => {
          fetchMore({
            variables: {
              after: data?.tasks.pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }): TasksQuery => {
              if (!fetchMoreResult) return previousResult;

              return {
                tasks: {
                  __typename: previousResult.tasks.__typename,
                  pageInfo: fetchMoreResult.tasks.pageInfo,
                  edges: [
                    ...previousResult.tasks.edges,
                    ...fetchMoreResult.tasks.edges,
                  ],
                },
              };
            },
          });
        }}
        onRefresh={() => refetch()}
        onVariablesChange={setVariables}
      />
    </Card>
  );
};

export default MyTask;
