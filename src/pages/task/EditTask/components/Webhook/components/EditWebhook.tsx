/* eslint-disable react/jsx-props-no-spreading */
import { Form, Input, Modal, Switch } from "antd";
import React, { SFC, useEffect } from "react";

import { WebhookFragment } from "@/generated/graphql";

interface EditWebhookModalProps {
  current: WebhookFragment;
  visible: boolean;
  onOk: (values: WebhookFragment) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};
const EditWebhook: SFC<EditWebhookModalProps> = ({
  visible,
  onOk,
  onCancel,
  current,
}) => {
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

  const handleFinish = (values: WebhookFragment) => {
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
        title="编辑 webhook"
        visible={visible}
        {...modalFooter}
        width={600}
      >
        <Form {...formLayout} form={form} onFinish={handleFinish}>
          <Form.Item label="应用状态" name="enable" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            label="Webhook名称"
            name="name"
            rules={[{ required: true, message: "Webhook名称" }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          {current?.id ? (
            <Form.Item
              label="token"
              name="token"
              rules={[{ required: true, message: "Token名称" }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
};

export default EditWebhook;
