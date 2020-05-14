import React from "react";

import defaultSettings from "../../../config/defaultSettings";
import Avatar from "./AvatarDropdown";
import styles from "./index.less";

const GlobalHeaderRight: React.SFC = () => {
  const { navTheme, layout } = defaultSettings;
  let className = styles.right;

  if (navTheme === "dark" && layout === "topmenu") {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Avatar />
    </div>
  );
};

export default GlobalHeaderRight;
