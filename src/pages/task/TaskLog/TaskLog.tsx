import { Button, Card } from "antd";
import { GraphQLTable } from "antd-graphql-table";
import { FilterType, SimpleColumnType, ValueType } from "antd-simple-table";
import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  TaskLogFragment,
  TaskLogsQuery,
  useTaskLogsQuery,
} from "@/generated/graphql";
import useTaskLogsQueryVariablesState from "@/hooks/variablesStates/useTaskLogsQueryVariablesState";

import TaskLogDetails from "./components/TaskLogDetails";

const useGetTaskId = () => {
  const history = useHistory();
  return history.location.pathname.split("/")[2];
};

const TaskLog = (): ReactElement => {
  const [variables, setVariables] = useTaskLogsQueryVariablesState();

  const [visible, setVisible] = useState(false);
  const [taskLogId, setTaskLogId] = useState("");
  const taskId = useGetTaskId();
  const { data, loading, refetch, fetchMore } = useTaskLogsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      taskId,
    },
  });

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const columns = useMemo(
    (): SimpleColumnType<TaskLogFragment>[] => [
      {
        key: "id",
        title: "ID",
        dataIndex: "id",
        width: 80,
        copyable: true,
        ellipsis: true,
        sorter: true,
        filterType: FilterType.Input,
      },
      {
        key: "status",
        title: "状态",
        dataIndex: "status",
        width: 80,
        ellipsis: true,
        sorter: true,
        filterType: FilterType.Input,
        render: (values, row: TaskLogFragment) => {
          return <div>{row.status === "SUCCESS" ? "成功" : "失败"}</div>;
        },
      },
      {
        key: "createdAt",
        title: "创建时间",
        dataIndex: "createdAt",
        width: 100,
        ellipsis: true,
        sorter: true,
        filterType: FilterType.SelectInput,
        valueType: ValueType.DATE_TIME,
      },
      {
        key: "action",
        title: "操作",
        fixed: "right",
        width: 50,
        ellipsis: true,
        sorter: true,
        render: (taskLog: TaskLogFragment): ReactElement => (
          <span>
            <Button
              style={{ padding: 0, border: 0 }}
              type="link"
              onClick={(): void => {
                setTaskLogId(taskLog.id);
                setVisible(true);
              }}
            >
              查看详情
            </Button>
          </span>
        ),
      },
    ],
    []
  );

  return (
    <Card>
      <GraphQLTable<TaskLogFragment>
        columns={columns}
        dataSource={data?.task.logs.edges.map(
          ({ node }): TaskLogFragment => node
        )}
        hasMore={data?.task.logs.pageInfo.hasNextPage}
        id="taskLog"
        loading={loading}
        name="taskLog"
        rowKey="id"
        variables={variables}
        onLoadMore={(): void => {
          fetchMore({
            variables: {
              after: data?.task.logs.pageInfo.endCursor,
            },
            updateQuery: (
              previousResult,
              { fetchMoreResult }
            ): TaskLogsQuery => {
              if (!fetchMoreResult) return previousResult;
              return {
                task: {
                  id: fetchMoreResult.task.id,
                  __typename: fetchMoreResult.task.__typename,
                  logs: {
                    __typename: previousResult.task.logs.__typename,
                    totalCount: fetchMoreResult.task.logs.totalCount,
                    pageInfo: fetchMoreResult.task.logs.pageInfo,
                    edges: [
                      ...previousResult.task.logs.edges,
                      ...fetchMoreResult.task.logs.edges,
                    ],
                  },
                },
              };
            },
          });
        }}
        onRefresh={() => refetch()}
        onVariablesChange={setVariables}
      />
      <TaskLogDetails
        taskLogId={taskLogId}
        visible={visible}
        onCancel={handleCancel}
      />
    </Card>
  );
};

export default TaskLog;
