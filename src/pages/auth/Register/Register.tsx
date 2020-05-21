/* eslint-disable prefer-promise-reject-errors */
import {
  LockOutlined,
  MailOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import _ from "lodash";
import React, { SFC } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { useCreateUserMutation } from "@/generated/graphql";

interface UserFragment {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const { useForm } = Form;

const StyledCard = styled(Card)`
  width: 400px;
`;

const LoginButton = styled.div`
  float: right;

  margin-top: 20px;

  color: #0086f9;
`;

const Register: SFC = () => {
  const [form] = useForm();
  const history = useHistory();
  const [createUser, { loading }] = useCreateUserMutation();

  async function handleFinish(variables: UserFragment) {
    if (variables.password.length < 6)
      return message.warning("密码长度不得小于 6 位数");
    try {
      await createUser({
        variables: { input: _.omit(variables, ["confirmPassword"]) },
      });
      message.success("创建用户成功,去登陆吧！", [1], () => {
        return history.push("/auth/login");
      });
    } catch {
      return message.error("创建用户失败！");
    }
    return true;
  }

  return (
    <div>
      <StyledCard>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "用户名" }]}
          >
            <Input
              placeholder="用户名"
              prefix={
                <UserDeleteOutlined
                  style={{ color: "rgba(0,0,0,.25)", marginTop: 4 }}
                />
              }
              type="text"
            />
          </Form.Item>
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
            hasFeedback
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input.Password
              placeholder="密码"
              prefix={
                <LockOutlined
                  style={{ color: "rgba(0,0,0,.25)", marginTop: 4 }}
                />
              }
            />
          </Form.Item>

          <Form.Item
            dependencies={["password"]}
            hasFeedback
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "请输入确认密码！",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject("两次密码输入不一致！");
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="确认密码"
              prefix={
                <LockOutlined
                  style={{ color: "rgba(0,0,0,.25)", marginTop: 4 }}
                />
              }
            />
          </Form.Item>

          <Button
            block
            htmlType="submit"
            loading={loading}
            style={{ marginTop: "5px" }}
            type="primary"
          >
            注册
          </Button>
        </Form>
      </StyledCard>

      <LoginButton>
        <Link to="/auth/login">返回登陆</Link>
      </LoginButton>
    </div>
  );
};

export default Register;
