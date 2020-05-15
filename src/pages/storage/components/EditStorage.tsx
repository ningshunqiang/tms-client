/* eslint-disable react/jsx-props-no-spreading */
import { Form, Input, Modal, Switch } from "antd";
import React, { SFC, useEffect } from "react";

import { StorageFragment } from "@/generated/graphql";

interface EditStorageModalProps {
  current: StorageFragment;
  visible: boolean;
  onOk: (values: StorageFragment) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};
const EditStorage: SFC<EditStorageModalProps> = ({
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

  const handleFinish = (values: StorageFragment) => {
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
        title="编辑缓存"
        visible={visible}
        {...modalFooter}
        width={600}
      >
        <Form {...formLayout} form={form} onFinish={handleFinish}>
          <Form.Item
            initialValue={false}
            label="应用状态"
            name="enable"
            valuePropName="checked"
          >
            <Switch defaultChecked={false} />
          </Form.Item>
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: "名称" }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="key"
            name="key"
            rules={[{ required: true, message: "key" }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditStorage;
