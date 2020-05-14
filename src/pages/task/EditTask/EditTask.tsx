import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Tabs } from "antd";
import React from "react";
import { useHistory, useParams } from "react-router";
import { useQuery } from "react-router-query-hook";

import EditTaskComponent from "./components/EditTask";
import Timer from "./components/Timer";
import Webhook from "./components/Webhook";

const { TabPane } = Tabs;

function EditTask() {
  const history = useHistory();
  const { tab = "basic" } = useQuery();
  const { id } = useParams();

  return (
    <PageHeaderWrapper title={false}>
      <Tabs
        activeKey={tab}
        type="card"
        onChange={(activeKey) =>
          history.push(`${history.location.pathname}?tab=${activeKey}`)
        }
      >
        <TabPane key="basic" tab="任务编辑">
          <EditTaskComponent id={id} />
        </TabPane>
        <TabPane key="webhook" tab="Webhook">
          <Webhook id={id} />
        </TabPane>
        <TabPane key="timer" tab="定时器">
          <Timer id={id} />
        </TabPane>
      </Tabs>
    </PageHeaderWrapper>
  );
}

export default EditTask;
