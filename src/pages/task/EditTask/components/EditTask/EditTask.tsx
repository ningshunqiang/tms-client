/* eslint-disable react/jsx-props-no-spreading */
import { ControlledEditor } from "@monaco-editor/react";
import { Button, Card, Col, Form, Input, message, Row, Switch } from "antd";
import React, { ReactElement, SFC, useEffect, useState } from "react";

import { TaskProvider } from "@/contexts/task/MyTaskContext";
import {
  TaskFragment,
  useTaskQuery,
  useUpdatedTaskMutation,
} from "@/generated/graphql";

const initCode = `export default()=>{\n  // 请编写代码\n  \n  return;\n}`;

interface CreateTaskProps {
  id: TaskFragment["id"];
}
interface CreateTask {
  enable: boolean;
  code: string;
  name: string;
}
const CreateTask: SFC<CreateTaskProps> = ({ id }): ReactElement => {
  const { data } = useTaskQuery({
    variables: { id },
  });
  const [handleUpDataTask, { loading }] = useUpdatedTaskMutation();
  const [enable, setEnable] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState(initCode);
  useEffect(() => {
    if (data) {
      setCode(data.task.code);
      setEnable(data.task.enable);
      setName(data.task.name);
    }
  }, [data]);
  const handleSave = async (): Promise<void> => {
    const task: CreateTask = {
      enable,
      code,
      name,
    };
    try {
      await handleUpDataTask({
        variables: { id, input: task },
      });
      message.success("更新任务成功。");
    } catch (err) {
      message.error("更新任务失败。");
    }
  };

  return (
    <Card>
      <Form hideRequiredMark layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="应用状态">
              <Switch checked={enable} onChange={setEnable} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="名称">
              <Input
                placeholder="请输入名称"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="代码">
              <ControlledEditor
                height="500px"
                language="javascript"
                theme="dark"
                value={code}
                onChange={(event, value) => setCode(value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #e9e9e9",
          padding: "10px 16px",
          background: "#fff",
          textAlign: "right",
        }}
      >
        <Button loading={loading} type="primary" onClick={handleSave}>
          保存
        </Button>
      </div>
    </Card>
  );
};
export default (props: CreateTaskProps): ReactElement => (
  <TaskProvider>
    <CreateTask {...props} />
  </TaskProvider>
);
