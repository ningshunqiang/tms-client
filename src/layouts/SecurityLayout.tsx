import { PageLoading } from "@ant-design/pro-layout";
import React, { ReactElement, SFC, useEffect } from "react";
import { Redirect } from "umi";

import useCurrentUserQuery from "@/hooks/useCurrentUserQuery";
import { useRefreshToken } from "@/hooks/useRefreshToken";

const SecurityLayout: SFC = ({ children }): ReactElement => {
  const { data: { user } = { user: null }, loading } = useCurrentUserQuery();
  const refreshToken = useRefreshToken();

  // 每小时刷新认证 Token
  useEffect((): void => {
    setInterval((): void => refreshToken(), 3600000);
  }, [refreshToken]);

  if (!user && loading) {
    return <PageLoading />;
  }

  if (!user) {
    return <Redirect to="/auth/login" />;
  }

  return <>{children}</>;
};

export default SecurityLayout;
