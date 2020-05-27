import { Form, Input, Modal, Switch } from "antd";
import React, { SFC, useEffect } from "react";

import { CacheFragment } from "@/generated/graphql";

interface EditCacheModalProps {
  current: CacheFragment;
  visible: boolean;
  onOk: (values: CacheFragment) => void;
  onCancel: () => void;
}

const EditCache: SFC<EditCacheModalProps> = ({
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

  const handleFinish = (values: CacheFragment) => {
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
        title="编辑缓存"
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
            label="标识"
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

export default EditCache;
