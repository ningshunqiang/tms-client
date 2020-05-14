/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
  Settings,
} from "@ant-design/pro-layout";
import { Button, Result } from "antd";
import React, { SFC } from "react";
import { Link } from "umi";

import RightContent from "@/components/GlobalHeader/RightContent";
import useCurrentUserQuery from "@/hooks/useCurrentUserQuery";
import Authorized from "@/utils/Authorized";
import { getAuthorityFromRouter } from "@/utils/utils";

import defaultSettings from "../../config/defaultSettings";
import logo from "../assets/logo.svg";

const noMatch = (
  <Result
    extra={
      <Button type="primary">
        <Link to="/auth/login">Go Login</Link>
      </Button>
    }
    status="403"
    subTitle="Sorry, you are not authorized to access this page."
    title="403"
  />
);
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps["route"] & {
    authority: string[];
  };
  settings: Settings;
}
export type BasicLayoutContext = { [K in "location"]: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : [],
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const BasicLayout: SFC<BasicLayoutProps> = (props) => {
  const {
    children,
    location = {
      pathname: "/",
    },
  } = props;

  useCurrentUserQuery();

  const authorized = getAuthorityFromRouter(
    // eslint-disable-next-line react/destructuring-assignment
    props.route.routes,
    location.pathname || "/"
  ) || {
    authority: undefined,
  };

  return (
    <ProLayout
      breadcrumbRender={(routers = []) => [
        {
          path: "/",
          breadcrumbName: "首页",
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      logo={logo}
      menuDataRender={menuDataRender}
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/">
          {logoDom}
          {titleDom}
        </Link>
      )}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          menuItemProps.children ||
          !menuItemProps.path
        ) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      rightContentRender={() => <RightContent />}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...defaultSettings}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default BasicLayout;
