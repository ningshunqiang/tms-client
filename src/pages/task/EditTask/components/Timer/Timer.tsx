/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prettier/prettier */
import { Button, Card, Divider, message, Popconfirm } from "antd";
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
import { TimerProvider, useTimer } from "@/contexts/task/TimerContext";
import {
  TaskFragment,
  TimerFragment,
  TimersQuery,
  useCreateTimerMutation,
  useDeleteTimerMutation,
  useTimersQuery,
  useUpdatedTimerMutation,
} from "@/generated/graphql";

import EditTimer from "./components/EditTimer";

interface TimerProps {
  id: TaskFragment["id"];
}

const Timer: SFC<TimerProps> = ({ id }): ReactElement => {
  const [
    handleUpdateTimer,
    { loading: upDataLoading },
  ] = useUpdatedTimerMutation();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<TimerFragment>();
  const { queryParams, setQueryParams } = useTimer();
  const [
    handleCreateTimer,
    { loading: createLoading },
  ] = useCreateTimerMutation();
  const { data, loading, refetch, fetchMore } = useTimersQuery({
    variables: {
      taskId: id,
      query: queryParams?.query,
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

  const handleOnCancel = () => {
    setCurrent(null);
    setVisible(false);
  };

  const handleOnOk = async (value: TimerFragment) => {
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
          queryParams={queryParams}
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
          onQueryParamsChange={setQueryParams}
          onRefresh={(): void => {
            refetch();
          }}
        />
        <EditTimer
          current={current}
          visible={visible}
          onCancel={handleOnCancel}
          onOk={handleOnOk}
        />
      </Card>
    </div>
  );
};

export default (props: TimerProps) => {
  return (
    <TimerProvider>
      <Timer {...props} />
    </TimerProvider>
  );
};
