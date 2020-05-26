import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { ControlledEditor } from "@monaco-editor/react";
import { Button, Card, Col, Form, Input, message, Row, Switch } from "antd";
import keyboardJS from "keyboardjs";
import React, {
  ReactElement,
  SFC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

import { CreateTaskInput } from "@/generated/graphql";
import useCreateTask from "@/hooks/useCreateTaskMutation";

const initCode = `export default () => {\n  // 请编写代码\n    return null;\n}`;

const CreateTask: SFC = (): ReactElement => {
  const history = useHistory();
  const [enable, setEnable] = useState(false);
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [code, setCode] = useState(initCode);
  const [createTask, { loading }] = useCreateTask();

  const handleSave = useCallback(async (): Promise<void> => {
    const task: CreateTaskInput = {
      enable,
      code,
      name,
      key,
    };
    try {
      const newTask = await createTask({ variables: { input: task } });
      message.success("添加任务成功。");
      setCode(initCode);
      setEnable(false);
      setName("");
      setKey("");
      history.push(`/tasks/${newTask.data.createTask.id}/edit?tab=basic`);
    } catch (err) {
      message.error("添加任务失败。");
    }
  }, [code, createTask, enable, history, key, name]);

  useEffect(() => {
    keyboardJS.bind("command+s", (e) => {
      e.preventDefault();
      handleSave();
    });
    return () => keyboardJS.unbind("command+s");
  }, [handleSave]);

  return (
    <PageHeaderWrapper title={false}>
      <Card>
        <Form hideRequiredMark layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="状态">
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
              <Form.Item label="标识">
                <Input
                  placeholder="请输入标识"
                  value={key}
                  onChange={(event) => setKey(event.target.value)}
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
            创建
          </Button>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};
export default CreateTask;
