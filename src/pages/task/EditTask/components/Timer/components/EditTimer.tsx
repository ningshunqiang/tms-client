import { Form, Input, Modal, Switch } from "antd";
import React, { FC, useEffect } from "react";

import { TimerFragment } from "@/generated/graphql";

interface EditTimerModalProps {
  current: TimerFragment;
  visible: boolean;
  onOk: (values: TimerFragment) => void;
  onCancel: () => void;
}

const EditTimer: FC<EditTimerModalProps> = (props) => {
  const { visible, onOk, onCancel, current } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }

    if (visible && current) {
      form.setFieldsValue({
        ...current,
      });
    }
  }, [visible, current, form]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: TimerFragment) => {
    if (onOk) {
      onOk(values);
    }
  };

  return (
    <div>
      <Modal
        cancelText="取消"
        forceRender
        okText="保存"
        title="编辑定时器"
        visible={visible}
        width={600}
        onCancel={onCancel}
        onOk={handleSubmit}
      >
        <Form
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          onFinish={handleFinish}
        >
          <Form.Item
            initialValue={false}
            label="状态"
            name="enable"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="定时器名称"
            name="name"
            rules={[{ required: true, message: "定时器名称" }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            label="cron"
            name="cron"
            rules={[{ required: true, message: "cron" }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditTimer;
