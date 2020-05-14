/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { ColumnType } from "antd/lib/table";
import React from "react";

function getColumnSearchProps<T>(
  dataIndex?: string
): Pick<
  ColumnType<T>,
  "onFilter" | "onFilterDropdownVisibleChange" | "filterDropdown" | "filterIcon"
> {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <div>
          <Input
            style={{ width: "100%", marginBottom: 10 }}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
          />
        </div>
        <div>
          <Button
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 20 }}
            type="primary"
            onClick={() => {
              confirm();
            }}
          >
            搜索
          </Button>
          <Button
            size="small"
            style={{ width: 90 }}
            onClick={() => clearFilters && clearFilters()}
          >
            重置
          </Button>
        </div>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (expression, record) => {
      const matched = expression.match(/^([<=>]?)(\d+)$/);

      if (!dataIndex || !matched) return true;

      const [, op, value] = matched;

      switch (op) {
        case ">=":
          return record[dataIndex] >= Number(value);
        case ">":
          return record[dataIndex] > Number(value);
        case "<":
          return record[dataIndex] < Number(value);
        case "<=":
          return record[dataIndex] <= Number(value);
        case "=":
        case "":
          return record[dataIndex] === Number(value);
        default:
          return true;
      }
    },
  };
}

export default getColumnSearchProps;
