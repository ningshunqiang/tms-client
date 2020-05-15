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
import { StorageProvider, useStorage } from "@/contexts/storage/StorageContext";
import {
  StorageFragment,
  StoragesQuery,
  useCreateStorageMutation,
  useDeleteStorageMutation,
  useStoragesQuery,
  useUpdateStorageMutation,
} from "@/generated/graphql";

import EditStorage from "../components/EditStorage";

const Storage: SFC = (): ReactElement => {
  const [
    handleUpdateStorage,
    { loading: upDataLoading },
  ] = useUpdateStorageMutation();

  const [
    handleCreateStorage,
    { loading: createLoading },
  ] = useCreateStorageMutation();

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<StorageFragment>();
  const { queryParams, setQueryParams } = useStorage();

  const { data, loading, refetch, fetchMore } = useStoragesQuery({
    variables: {
      query: queryParams?.query,
    },
  });

  const [
    handleDeleteStorage,
    { loading: deleteLoading },
  ] = useDeleteStorageMutation();

  const handleDeleteClick = useCallback(
    async (storage): Promise<void> => {
      try {
        await handleDeleteStorage({ variables: { id: storage.id } });
        message.success("删除成功！");
        refetch();
      } catch {
        message.error("删除失败！");
      }
    },
    [handleDeleteStorage, refetch]
  );

  const handleOnCancel = () => {
    setCurrent(null);
    setVisible(false);
  };

  const handleOnOk = async (value: StorageFragment) => {
    if (current?.id) {
      try {
        setVisible(false);

        await handleUpdateStorage({
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
        await handleCreateStorage({
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
  };

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
        ] as any,
        render: (row: StorageFragment): ReactNode =>
          row.enable ? (
            <Badge status="processing" text="运行" />
          ) : (
            <Badge status="default" text="关闭" />
          ),
      },

      {
        key: "action",
        title: "操作",
        align: "right",
        fixed: "right",
        width: 120,

        ellipsis: true,
        sorter: true,

        render: (storage: StorageFragment): ReactElement => (
          <span>
            <>
              <Divider type="vertical" />
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
            </>
            <>
              <Divider type="vertical" />
              <Popconfirm
                cancelText="取消"
                okText="确定"
                title={`删除 ${storage.name} 任务？`}
                onConfirm={(): Promise<void> => handleDeleteClick(storage)}
              >
                <Button style={{ padding: 0, border: 0 }} type="link">
                  删除
                </Button>
              </Popconfirm>
            </>
          </span>
        ),
      },
    ],
    [handleDeleteClick]
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
        loading={loading || deleteLoading || upDataLoading || createLoading}
        name="Storage"
        queryParams={queryParams}
        rowKey="id"
        toolBarRender={(): ReactNode[] => [
          <Button
            type="primary"
            onClick={(): void => {
              setVisible(true);
            }}
          >
            创建 Storage
          </Button>,
        ]}
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
        onQueryParamsChange={setQueryParams}
        onRefresh={(): void => {
          refetch();
        }}
      />

      <EditStorage
        current={current}
        visible={visible}
        onCancel={handleOnCancel}
        onOk={handleOnOk}
      />
    </Card>
  );
};

export default () => {
  return (
    <StorageProvider>
      <Storage />
    </StorageProvider>
  );
};
