import { ControlledEditor } from "@monaco-editor/react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Switch,
} from "antd";
import keyboardJS from "keyboardjs";
import React, {
  ReactElement,
  SFC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";

import {
  CreateTaskInput,
  TaskFragment,
  useTaskHistoryQuery,
  useTaskQuery,
  useUpdateTaskMutation,
} from "@/generated/graphql";

import TaskHistory from "../TaskHistory";

interface CreateTaskProps {
  id: TaskFragment["id"];
}

const CreateTask: SFC<CreateTaskProps> = ({ id }): ReactElement => {
  const { data } = useTaskQuery({
    variables: { id },
  });

  const [updateTask, { loading }] = useUpdateTaskMutation();
  const [enable, setEnable] = useState(false);
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [code, setCode] = useState(null);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [historyId, setHistoryId] = useState("");

  const { data: historyData, loading: taskLoading } = useTaskHistoryQuery({
    variables: {
      id: historyId,
    },
  });

  useEffect(() => {
    if (data) {
      setCode(data.task.code);
      setEnable(data.task.enable);
      setName(data.task.name);
      setKey(data.task.key);
    }
  }, [data]);

  useEffect(() => {
    if (historyData) {
      setCode(historyData.taskHistory.code);
      setName(historyData.taskHistory.name);
    }
  }, [historyData, historyId]);

  const handleSave = useCallback(async (): Promise<void> => {
    const task: CreateTaskInput = {
      enable,
      code,
      name,
      key,
    };
    try {
      await updateTask({
        variables: { id, input: task },
      });
      message.success("更新任务成功。");
    } catch (err) {
      message.error("更新任务失败。");
    }
  }, [code, enable, id, key, name, updateTask]);

  const handleHistoryId = useCallback((taskHistoryId: string) => {
    setHistoryId(taskHistoryId);
  }, []);

  useEffect(() => {
    keyboardJS.bind("command+s", (e) => {
      e.preventDefault();
      if (window.location.search === "?tab=basic") {
        handleSave();
      }
    });
    return () => keyboardJS.unbind("command+s");
  }, [handleSave]);

  return (
    <Spin spinning={taskLoading || loading}>
      <Card>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            size="small"
            type="primary"
            onClick={() => setHistoryVisible(true)}
          >
            历史记录
          </Button>
          <Link to={`/tasks/${id}/logs`}>
            <Button size="small" style={{ marginLeft: 10 }} type="primary">
              任务日志
            </Button>
          </Link>
        </div>
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
              <Form.Item label="key">
                <Input
                  placeholder="输入key"
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
            保存
          </Button>
        </div>
        <TaskHistory
          taskId={id}
          visible={historyVisible}
          onClose={() => setHistoryVisible(false)}
          onHistoryId={handleHistoryId}
        />
      </Card>
    </Spin>
  );
};
export default CreateTask;
