/* eslint-disable react/jsx-props-no-spreading */
import { Dropdown } from "antd";
import { DropDownProps } from "antd/es/dropdown";
import classNames from "classnames";
import React from "react";

import styles from "./index.less";

const HeaderDropdown: React.FC<DropDownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => (
  <Dropdown
    overlayClassName={classNames(styles.container, cls)}
    {...restProps}
  />
);

export default HeaderDropdown;
