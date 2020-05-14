import { PageLoading } from "@ant-design/pro-layout";
import React from "react";
import { Redirect } from "umi";

import useCurrentUserQuery from "@/hooks/useCurrentUserQuery";
import Authorized from "@/utils/Authorized";
import { getRouteAuthority } from "@/utils/utils";

const AuthComponent: React.FC<{ route: { routes: [] } }> = ({
  children,
  route: { routes = [] },
}) => {
  const { data, loading } = useCurrentUserQuery();
  const isLogin = data && data.user;

  if (loading) {
    return <PageLoading />;
  }

  return (
    <Authorized
      authority={getRouteAuthority(window.location.pathname, routes) || ""}
      noMatch={
        isLogin ? (
          <Redirect to="/exception/403" />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    >
      {children}
    </Authorized>
  );
};

export default AuthComponent;
