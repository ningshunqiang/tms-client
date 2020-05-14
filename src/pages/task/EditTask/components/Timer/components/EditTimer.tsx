/* eslint-disable react/jsx-props-no-spreading */
import { Form, Input, Modal, Switch } from "antd";
import React, { FC, useEffect } from "react";

import { TimerFragment } from "@/generated/graphql";

interface EditTimerModalProps {
  current: TimerFragment;
  visible: boolean;
  onOk: (values: TimerFragment) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};
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
  const modalFooter = {
    okText: "保存",
    onOk: handleSubmit,
    cancelText: "取消",
    onCancel,
  };

  return (
    <div>
      <Modal
        forceRender
        title="编辑定时器"
        visible={visible}
        {...modalFooter}
        width={600}
      >
        <Form {...formLayout} form={form} onFinish={handleFinish}>
          <Form.Item label="应用状态" name="enable" valuePropName="checked">
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
