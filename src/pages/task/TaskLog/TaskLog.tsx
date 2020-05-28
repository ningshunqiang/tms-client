import { Card, Collapse, Drawer } from "antd";
import { GraphQLTable } from "antd-graphql-table";
import { FilterType, SimpleColumnType } from "antd-simple-table";
import moment from "moment";
import React, { ReactElement, SFC, useMemo } from "react";
import styled from "styled-components";

import {
  TaskLogFragment,
  TaskLogsQuery,
  useTaskLogsQuery,
} from "@/generated/graphql";
import useTaskLogsQueryVariablesState from "@/hooks/variablesStates/useTaskLogsQueryVariablesState";

const TaskLogMargin = styled.div`
  margin-top: 25px;
`;

const { Panel } = Collapse;

interface TaskLogProps {
  taskId: string;
  visible: boolean;
  onClose: () => void;
}

const TaskLog: SFC<TaskLogProps> = ({
  visible,
  onClose,
  taskId,
}): ReactElement => {
  const [variables, setVariables] = useTaskLogsQueryVariablesState();

  const { data, loading, refetch, fetchMore } = useTaskLogsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      taskId,
      ...variables,
    },
  });

  const columns = useMemo(
    (): SimpleColumnType<TaskLogFragment>[] => [
      {
        width: 80,
        filterType: FilterType.Input,
        key: "id",
        title: "ID",
        dataIndex: "id",
        hidden: true,
        ellipsis: true,
      },
      {
        width: 80,
        filterType: FilterType.Input,
        key: "status",
        title: "状态",
        dataIndex: "status",
        hidden: true,
        ellipsis: true,
      },

      {
        sorter: true,
        key: "createdAt",
        title: "创建时间",
        dataIndex: "createdAt",
        width: 100,
        filterType: FilterType.SelectInput,
        render: (values, row: TaskLogFragment) => {
          return (
            <Collapse bordered={false}>
              <Panel
                header={moment(row.createdAt)
                  .utcOffset(480)
                  .format("YYYY-MM-DD hh:mm:ss")}
                key="1"
              >
                <TaskLogMargin>
                  <h5>ID：</h5>
                  {row.id}
                </TaskLogMargin>
                <TaskLogMargin>
                  <h5>状态：</h5>
                  {row.status}
                </TaskLogMargin>

                <TaskLogMargin>
                  <h5>控制台日志：</h5>
                  {row.content}
                </TaskLogMargin>
                <TaskLogMargin>
                  <h5>返回值：</h5>
                  {JSON.stringify(row.result)}
                </TaskLogMargin>
                <TaskLogMargin>
                  <h5>创建时间：</h5>
                  <pre>
                    {moment(row.createdAt)
                      .utcOffset(480)
                      .format("YYYY-MM-DD hh:mm:ss")}
                  </pre>
                </TaskLogMargin>
              </Panel>
            </Collapse>
          );
        },
      },
    ],
    []
  );

  return (
    <Drawer
      closable
      title="任务日志"
      visible={visible}
      width="50%"
      onClose={() => onClose()}
    >
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
      </Card>
    </Drawer>
  );
};

export default TaskLog;
