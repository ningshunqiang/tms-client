import { Badge, Button, Card, Divider, message, Popconfirm } from "antd";
import React, {
  ReactElement,
  ReactNode,
  SFC,
  useCallback,
  useMemo,
} from "react";
import { Link } from "umi";

import { QueryTable } from "@/components/QueryTable/QueryTable";
import {
  FilterType,
  SimpleColumnType,
  ValueType,
} from "@/components/SimpleTable";
import { TaskProvider, useTask } from "@/contexts/task/MyTaskContext";
import {
  TaskFragment,
  TasksQuery,
  useDeleteTaskMutation,
  useTasksQuery,
} from "@/generated/graphql";

const MyTask: SFC = (): ReactElement => {
  const { queryParams, setQueryParams } = useTask();
  const [
    handleDeleteTask,
    { loading: deleteLoading },
  ] = useDeleteTaskMutation();

  const { data, loading, refetch, fetchMore } = useTasksQuery({
    variables: queryParams,
  });
  const handleDeleteClick = useCallback(
    async ({ id }): Promise<void> => {
      try {
        await handleDeleteTask({ variables: { id } });
        message.success("删除成功！");
        refetch();
      } catch {
        message.error("删除失败！");
      }
    },
    [handleDeleteTask, refetch]
  );

  const columns = useMemo(
    (): SimpleColumnType<TaskFragment>[] => [
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
        width: 120,

        ellipsis: true,
        sorter: true,
        valueType: ValueType.DATE_TIME,
      },
      {
        key: "updatedAt",
        title: "更新时间",
        dataIndex: "updatedAt",
        width: 120,

        ellipsis: true,
        sorter: true,
        valueType: ValueType.DATE_TIME,
      },
      {
        key: "action",
        title: "操作",
        align: "right",
        fixed: "right",
        width: 120,

        ellipsis: true,
        sorter: true,

        render: (task: TaskFragment): ReactElement => (
          <span>
            <>
              <Divider type="vertical" />
              <Link to={`tasks/${task.id}/edit`}>
                <Button style={{ padding: 0, border: 0 }} type="link">
                  编辑
                </Button>
              </Link>
            </>
            <>
              <Divider type="vertical" />
              <Popconfirm
                cancelText="取消"
                okText="确定"
                title={`删除 ${task.name} 任务？`}
                onConfirm={(): Promise<void> => handleDeleteClick(task)}
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
      <QueryTable<TaskFragment>
        columns={columns}
        dataSource={data?.tasks.edges.map(({ node }): TaskFragment => node)}
        hasMore={data?.tasks.pageInfo.hasNextPage}
        id="Tms"
        loading={loading || deleteLoading}
        name="任务管理"
        queryParams={queryParams}
        rowKey="id"
        toolBarRender={(): ReactNode[] => [
          <Link to="tasks/create">
            <Button type="primary">创建任务</Button>
          </Link>,
        ]}
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
        onQueryParamsChange={setQueryParams}
        onRefresh={(): void => {
          refetch();
        }}
      />
    </Card>
  );
};

export default (): ReactElement => (
  <TaskProvider>
    <MyTask />
  </TaskProvider>
);
