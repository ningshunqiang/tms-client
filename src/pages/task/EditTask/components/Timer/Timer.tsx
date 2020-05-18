import { Badge, Button, Card, Divider, message, Popconfirm } from "antd";
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
  TimerFragment,
  TimersQuery,
  useCreateTimerMutation,
  useDeleteTimerMutation,
  useTimersQuery,
  useUpdatedTimerMutation,
} from "@/generated/graphql";
import useTimersQueryVariablesState from "@/hooks/variablesStates/useTimersQueryVariablesState";

import EditTimer from "./components/EditTimer";

interface TimerProps {
  id: TaskFragment["id"];
}

const Timer: SFC<TimerProps> = ({ id }): ReactElement => {
  const [variables, setVariables] = useTimersQueryVariablesState();
  const [
    handleUpdateTimer,
    { loading: upDataLoading },
  ] = useUpdatedTimerMutation();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<TimerFragment>();
  const [
    handleCreateTimer,
    { loading: createLoading },
  ] = useCreateTimerMutation();
  const { data, loading, refetch, fetchMore } = useTimersQuery({
    variables: {
      taskId: id,
      ...variables,
    },
  });

  const [
    handleDeleteTimer,
    { loading: deleteLoading },
  ] = useDeleteTimerMutation();

  const handleDeleteClick = useCallback(
    async (timer): Promise<void> => {
      try {
        await handleDeleteTimer({ variables: { id: timer.id } });
        message.success("删除成功！");
        refetch();
      } catch {
        message.error("删除失败！");
      }
    },
    [handleDeleteTimer, refetch]
  );

  const handleCancel = useCallback(() => {
    setCurrent(null);
    setVisible(false);
  }, []);

  const handleOk = async (value: TimerFragment) => {
    if (current?.id) {
      try {
        setVisible(false);

        await handleUpdateTimer({
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
        await handleCreateTimer({
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
    (): SimpleColumnType<TimerFragment>[] => [
      {
        key: "name",
        title: "名称",
        dataIndex: "name",
        width: 120,
        copyable: true,
        ellipsis: true,
        sorter: true,
        filterType: FilterType.Input,
      },
      {
        width: 120,
        key: "cron",
        title: "cron",
        dataIndex: "cron",
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
        ] as any,
        render: (value, row: TimerFragment): ReactNode =>
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
        render: (timer: TimerFragment): ReactElement => (
          <span>
            <>
              <Divider type="vertical" />
              <Button
                style={{ padding: 0, border: 0 }}
                type="link"
                onClick={(): void => {
                  setCurrent(timer);
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
                title={`删除 ${timer.name} 任务？`}
                onConfirm={(): Promise<void> => handleDeleteClick(timer)}
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
    <div>
      <Card>
        <QueryTable<TimerFragment>
          columns={columns}
          dataSource={data?.task.timers.edges.map(
            ({ node }): TimerFragment => node
          )}
          hasMore={data?.task.timers.pageInfo.hasNextPage}
          id="timer"
          loading={loading || deleteLoading || upDataLoading || createLoading}
          name="timer"
          rowKey="id"
          toolBarRender={(): ReactNode[] => [
            <Button
              type="primary"
              onClick={(): void => {
                setVisible(true);
              }}
            >
              创建定时器
            </Button>,
          ]}
          variables={variables}
          onLoadMore={(): void => {
            fetchMore({
              variables: {
                after: data?.task.timers.pageInfo.endCursor,
              },
              updateQuery: (
                previousResult,
                { fetchMoreResult }
              ): TimersQuery => {
                if (!fetchMoreResult) return previousResult;
                return {
                  task: {
                    id: fetchMoreResult.task.id,
                    timers: {
                      __typename: previousResult.task.timers.__typename,
                      totalCount: fetchMoreResult.task.timers.totalCount,
                      pageInfo: fetchMoreResult.task.timers.pageInfo,
                      edges: [
                        ...previousResult.task.timers.edges,
                        ...fetchMoreResult.task.timers.edges,
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
        <EditTimer
          current={current}
          visible={visible}
          onCancel={handleCancel}
          onOk={handleOk}
        />
      </Card>
    </div>
  );
};

export default Timer;
