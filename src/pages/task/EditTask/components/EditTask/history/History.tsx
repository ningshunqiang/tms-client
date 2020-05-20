import { Drawer, List } from "antd";
import moment from "moment";
import React from "react";
import styled from "styled-components";

import { useTaskHistorysQuery } from "@/generated/graphql";

interface HistoryProps {
  visible: boolean;
  taskId: string;
  onHistoryID: (id: string) => void;
  onClose: () => void;
}

const HistoryList = styled.div`
  width: 222px;
  min-height: 50px;
  padding: 5px;

  cursor: pointer;
  :hover {
    background-color: #f3f3f3;
  }
`;

const HistoryName = styled.div`
  font-size: 17px;
  font-weight: 600;
`;

const HistoryTime = styled.div`
  color: #ad9f9f;
`;

function TaskHistory({ visible, onClose, onHistoryID, taskId }: HistoryProps) {
  const { data, loading } = useTaskHistorysQuery({
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
              <HistoryList onClick={() => onHistoryID(item.node.id)}>
                <HistoryName> {item.node.name}</HistoryName>
                <HistoryTime>
                  {moment(item.node.createdAt)
                    .utcOffset(480)
                    .format("YYYY-MM-DD")}
                </HistoryTime>
              </HistoryList>
            </List.Item>
          );
        }}
        size="small"
      />
    </Drawer>
  );
}

export default TaskHistory;
