import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Form, Input } from "antd";
import React, { SFC } from "react";
import styled from "styled-components";

import useGetTokenMutation from "@/hooks/useGetTokenMutation";

const { useForm } = Form;

const StyledCard = styled(Card)`
  width: 400px;
`;

const Login: SFC = () => {
  const [form] = useForm();

  const [getToken, { loading, error }] = useGetTokenMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleFinish(variables: any) {
    getToken({ variables });
  }

  return (
    <StyledCard>
      {error && !loading && (
        <Alert
          message="账户或密码错误（admin/ant.design）"
          showIcon
          style={{
            marginBottom: 24,
          }}
          type="error"
        />
      )}

      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "请输入邮箱！" }]}
        >
          <Input
            placeholder="邮箱"
            prefix={
              <MailOutlined
                style={{ color: "rgba(0,0,0,.25)", marginTop: 4 }}
              />
            }
            type="text"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码！" }]}
        >
          <Input
            placeholder="密码"
            prefix={
              <LockOutlined
                style={{ color: "rgba(0,0,0,.25)", marginTop: 4 }}
              />
            }
            type="password"
          />
        </Form.Item>

        <Button block htmlType="submit" loading={loading} type="primary">
          登录
        </Button>
      </Form>
    </StyledCard>
  );
};

export default Login;
