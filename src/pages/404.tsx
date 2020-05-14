import { Button, Result } from "antd";
import React, { SFC } from "react";
import { useHistory } from "react-router";

// 这里应该使用 antd 的 404 result 组件，
// 但是还没发布，先来个简单的。

const NoFoundPage: SFC<{}> = () => {
  const history = useHistory();

  return (
    <Result
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          返回主页
        </Button>
      }
      status="404"
      subTitle="对不起，您访问的页面不存在。"
      title="404"
    />
  );
};

export default NoFoundPage;
