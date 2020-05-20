import { MenuDataItem } from "@ant-design/pro-layout";
import React from "react";
import { Link } from "umi";

import styles from "./AuthLayout.less";

export interface AuthLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <span className={styles.title}>TMS</span>
            </Link>
          </div>
          <div className={styles.desc}>任务管理系统</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
