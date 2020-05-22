import { Drawer, List } from "antd";
import moment from "moment";
import React from "react";
import styled from "styled-components";

import { useTaskHistoriesQuery } from "@/generated/graphql";

interface TaskHistoryProps {
  visible: boolean;
  taskId: string;
  onHistoryId: (id: string) => void;
  onClose: () => void;
}

const TaskHistoryList = styled.div`
  width: 222px;
  min-height: 50px;
  padding: 5px;

  cursor: pointer;
  :hover {
    background-color: #f3f3f3;
  }
`;

const TaskHistoryName = styled.div`
  font-size: 17px;
  font-weight: 600;
`;

const TaskHistoryTime = styled.div`
  color: #ad9f9f;
`;

function TaskHistory({
  visible,
  onClose,
  onHistoryId,
  taskId,
}: TaskHistoryProps) {
  const { data, loading } = useTaskHistoriesQuery({
    variables: {
      taskId,
    },
  });

  return (
    <Drawer
      closable
      placement="right"
      title="历史记录"
      visible={visible}
      width={270}
      onClose={() => onClose()}
    >
      <List
        bordered={false}
        dataSource={data?.task.histories.edges}
        loading={loading}
        renderItem={(item) => {
          return (
            <List.Item style={{ padding: "0px" }}>
              <TaskHistoryList onClick={() => onHistoryId(item.node.id)}>
                <TaskHistoryName> {item.node.name}</TaskHistoryName>
                <TaskHistoryTime>
                  {moment(item.node.createdAt)
                    .utcOffset(480)
                    .format("YYYY-MM-DD")}
                </TaskHistoryTime>
              </TaskHistoryList>
            </List.Item>
          );
        }}
        size="small"
      />
    </Drawer>
  );
}

export default TaskHistory;
