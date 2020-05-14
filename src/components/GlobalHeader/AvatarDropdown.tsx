import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";
import { ClickParam } from "antd/es/menu";
import md5 from "md5";
import { stringify } from "querystring";
import React, { SFC } from "react";
import { useHistory } from "react-router";

import useCurrentUserQuery from "@/hooks/useCurrentUserQuery";
import { getPageQuery } from "@/utils/utils";

import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.less";

export interface GlobalHeaderRightProps {
  menu?: boolean;
}

const AvatarDropdown: SFC<GlobalHeaderRightProps> = ({ menu }) => {
  const history = useHistory();

  const { data: { user = null } = {} } = useCurrentUserQuery();
  const onMenuClick = (event: ClickParam) => {
    const { key } = event;

    switch (key) {
      case "logout":
        if (
          window.location.pathname !== "/auth/login" &&
          !getPageQuery().redirect
        ) {
          history.replace({
            pathname: "/auth/login",
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
        break;
      default:
    }
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return user && user.name ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          alt="avatar"
          className={styles.avatar}
          size="small"
          src={`https://www.gravatar.com/avatar/${md5(user.email)}?s=48`}
        />
        <span className={styles.name}>{user.name}</span>
      </span>
    </HeaderDropdown>
  ) : (
    <Spin
      size="small"
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    />
  );
};

export default AvatarDropdown;
