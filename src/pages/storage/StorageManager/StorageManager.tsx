import { Badge, Button, Card, Divider, message, Popconfirm } from "antd";
import React, {
  ReactElement,
  ReactNode,
  SFC,
  useCallback,
  useMemo,
  useState,
} from "react";

import { QueryTable } from "@/components/QueryTable/QueryTable";
import { FilterType, SimpleColumnType } from "@/components/SimpleTable";
import {
  StorageFragment,
  StoragesQuery,
  useCreateStorageMutation,
  useDeleteStorageMutation,
  useStoragesQuery,
  useUpdateStorageMutation,
} from "@/generated/graphql";
import useStoragesQueryVariablesState from "@/hooks/variablesStates/useStoragesQueryVariablesState";

import EditStorage from "../components/EditStorage";

const Storage: SFC = (): ReactElement => {
  const [variables, setVariables] = useStoragesQueryVariablesState();
  const [
    updateStorage,
    { loading: upDateLoading },
  ] = useUpdateStorageMutation();

  const [
    createStorage,
    { loading: createLoading },
  ] = useCreateStorageMutation();

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<StorageFragment>();

  const { data, loading, refetch, fetchMore } = useStoragesQuery({
    variables,
  });

  const [
    deleteStorage,
    { loading: deleteLoading },
  ] = useDeleteStorageMutation();

  const deleteClick = useCallback(
    async (storage): Promise<void> => {
      try {
        await deleteStorage({ variables: { id: storage.id } });
        message.success("删除成功！");
        refetch();
      } catch {
        message.error("删除失败！");
      }
    },
    [deleteStorage, refetch]
  );

  const handleCancel = useCallback(() => {
    setCurrent(null);
    setVisible(false);
  }, []);

  const handleOk = useCallback(
    async (value: StorageFragment) => {
      if (current?.id) {
        try {
          setVisible(false);
          await updateStorage({
            variables: { id: current.id, input: value },
          });
          setCurrent(null);
          message.success("更新成功");
        } catch {
          message.error("更新失败");
        }
      } else {
        try {
          setVisible(false);
          await createStorage({
            variables: {
              input: {
                ...value,
              },
            },
          });
          setCurrent(null);
          refetch();
          message.success("创建成功");
        } catch {
          message.error("创建失败");
        }
      }
    },
    [current, createStorage, updateStorage, refetch]
  );

  const columns = useMemo(
    (): SimpleColumnType<StorageFragment>[] => [
      {
        key: "name",
        title: "名称",
        dataIndex: "name",
        width: 80,
        copyable: true,
        ellipsis: true,
        sorter: true,
        filterType: FilterType.Input,
      },
      {
        width: 120,
        filterType: FilterType.Input,
        key: "key",
        title: "key",
        dataIndex: "key",
        copyable: true,
        ellipsis: true,
        sorter: true,
      },
      {
        width: 120,
        filterType: FilterType.Input,
        key: "ownerId",
        title: "ownerId",
        dataIndex: "ownerId",
        copyable: true,
        ellipsis: true,
        sorter: true,
      },
      {
        key: "enable",
        title: "应用状态",
        dataIndex: "enable",
        ellipsis: true,
        sorter: true,
        width: 120,
        filters: [
          { text: "运行", value: true },
          { text: "关闭", value: false },
        ],
        render: (value, row: StorageFragment): ReactNode =>
          row.enable ? (
            <Badge status="processing" text="运行" />
          ) : (
            <Badge status="default" text="关闭" />
          ),
      },

      {
        key: "action",
        title: "操作",
        fixed: "right",
        width: 50,
        ellipsis: true,
        sorter: true,
        render: (storage: StorageFragment): ReactElement => (
          <span>
            <Button
              style={{ padding: 0, border: 0 }}
              type="link"
              onClick={(): void => {
                setCurrent(storage);
                setVisible(true);
              }}
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              cancelText="取消"
              okText="确定"
              title={`删除 ${storage.name} 任务？`}
              onConfirm={(): Promise<void> => deleteClick(storage)}
            >
              <Button style={{ padding: 0, border: 0 }} type="link">
                删除
              </Button>
            </Popconfirm>
          </span>
        ),
      },
    ],
    [deleteClick]
  );

  return (
    <Card>
      <QueryTable<StorageFragment>
        columns={columns}
        dataSource={data?.storages.edges.map(
          ({ node }): StorageFragment => node
        )}
        hasMore={data?.storages.pageInfo.hasNextPage}
        id="Storage"
        loading={loading || deleteLoading || upDateLoading || createLoading}
        name="Storage"
        rowKey="id"
        toolBarRender={(): ReactNode[] => [
          <Button type="primary" onClick={() => setVisible(true)}>
            创建存储
          </Button>,
        ]}
        variables={variables}
        onLoadMore={(): void => {
          fetchMore({
            variables: {
              after: data?.storages.pageInfo.endCursor,
            },
            updateQuery: (
              previousResult,
              { fetchMoreResult }
            ): StoragesQuery => {
              if (!fetchMoreResult) return previousResult;

              return {
                storages: {
                  __typename: previousResult.storages.__typename,
                  totalCount: fetchMoreResult.storages.totalCount,
                  pageInfo: fetchMoreResult.storages.pageInfo,
                  edges: [
                    ...previousResult.storages.edges,
                    ...fetchMoreResult.storages.edges,
                  ],
                },
              };
            },
          });
        }}
        onRefresh={() => refetch()}
        onVariablesChange={setVariables}
      />

      <EditStorage
        current={current}
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </Card>
  );
};

export default Storage;
