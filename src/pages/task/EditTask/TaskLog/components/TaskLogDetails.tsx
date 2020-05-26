import { Divider, Modal, Spin } from "antd";
import moment from "moment";
import React, { FC } from "react";

import { useTaskLogQuery } from "@/generated/graphql";

interface TaskLogDetailsModalProps {
  taskLogId: string;
  visible: boolean;
  onCancel: () => void;
}

const TaskLogDetails: FC<TaskLogDetailsModalProps> = ({
  visible,
  onCancel,
  taskLogId,
}) => {
  const { data, loading } = useTaskLogQuery({
    variables: {
      id: taskLogId,
    },
  });
  return (
    <Spin spinning={loading}>
      <Modal
        footer={false}
        forceRender
        title="任务日志详情"
        visible={visible}
        width={600}
        onCancel={onCancel}
      >
        <div>
          <h5>ID:</h5> {data?.taskLog.id}
        </div>
        <Divider />

        <div>
          <h5>状态:</h5> {data?.taskLog.status}
        </div>
        <Divider />

        <div>
          <h5>内容:</h5> {data?.taskLog.content}
        </div>
        <Divider />

        <div>
          <h5>返回结果:</h5>
          {JSON.stringify(data?.taskLog.result)}
        </div>
        <Divider />

        <div>
          <h5>时间:</h5>
          {moment(data?.taskLog.createdAt)
            .utcOffset(480)
            .format("YYYY-MM-DD hh:mm:ss")}
        </div>
        <Divider />
      </Modal>
    </Spin>
  );
};

export default TaskLogDetails;
