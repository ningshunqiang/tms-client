import { Badge, Button, Card, Divider, message, Popconfirm } from "antd";
import { GraphQLTable } from "antd-graphql-table";
import { FilterType, SimpleColumnType, ValueType } from "antd-simple-table";
import React, {
  ReactElement,
  ReactNode,
  SFC,
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  CacheFragment,
  CachesQuery,
  useCachesQuery,
  useCreateCacheMutation,
  useDeleteCacheMutation,
  useUpdateCacheMutation,
} from "@/generated/graphql";
import useCachesQueryVariablesState from "@/hooks/variablesStates/useCachesQueryVariablesState";

import EditCache from "../components/EditCache";

const Cache: SFC = (): ReactElement => {
  const [variables, setVariables] = useCachesQueryVariablesState();
  const [updateCache, { loading: updateLoading }] = useUpdateCacheMutation();

  const [createCache, { loading: createLoading }] = useCreateCacheMutation();

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<CacheFragment>();

  const { data, loading, refetch, fetchMore } = useCachesQuery({
    notifyOnNetworkStatusChange: true,
    variables,
  });

  const [deleteCache, { loading: deleteLoading }] = useDeleteCacheMutation();

  const deleteClick = useCallback(
    async (cache): Promise<void> => {
      try {
        await deleteCache({ variables: { id: cache.id } });
        message.success("删除成功！");
        refetch();
      } catch {
        message.error("删除失败！");
      }
    },
    [deleteCache, refetch]
  );

  const handleCancel = useCallback(() => {
    setCurrent(null);
    setVisible(false);
  }, []);

  const handleOk = useCallback(
    async (value: CacheFragment) => {
      if (current?.id) {
        try {
          setVisible(false);
          await updateCache({
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
          await createCache({
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
    [current, createCache, updateCache, refetch]
  );

  const columns = useMemo(
    (): SimpleColumnType<CacheFragment>[] => [
      {
        key: "id",
        title: "ID",
        dataIndex: "id",
        width: 80,
        filterType: FilterType.Input,
      },
      {
        key: "name",
        title: "名称",
        dataIndex: "name",
        width: 80,
        filterType: FilterType.Input,
      },
      {
        width: 80,
        filterType: FilterType.Input,
        key: "key",
        title: "标识",
        dataIndex: "key",
        copyable: true,
        ellipsis: true,
        sorter: true,
      },
      {
        key: "owner.name",
        title: "创建人",
        dataIndex: ["owner", "name"],
        width: 80,
        filterType: FilterType.Input,
      },
      {
        key: "enable",
        title: "状态",
        dataIndex: "enable",
        width: 80,
        filters: [
          { text: "运行", value: true },
          { text: "关闭", value: false },
        ],
        render: (value, row: CacheFragment): ReactNode =>
          row.enable ? (
            <Badge status="processing" text="运行" />
          ) : (
            <Badge status="default" text="关闭" />
          ),
      },

      {
        key: "createdAt",
        title: "创建时间",
        dataIndex: "createdAt",
        width: 100,
        valueType: ValueType.DATE_TIME,
      },
      {
        key: "updatedAt",
        title: "更新时间",
        dataIndex: "updatedAt",
        width: 100,
        valueType: ValueType.DATE_TIME,
      },
      {
        key: "action",
        title: "操作",
        fixed: "right",
        width: 80,
        ellipsis: true,
        sorter: true,
        render: (cache: CacheFragment): ReactElement => (
          <span>
            <Button
              style={{ padding: 0, border: 0 }}
              type="link"
              onClick={(): void => {
                setCurrent(cache);
                setVisible(true);
              }}
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              cancelText="取消"
              okText="确定"
              title={`删除 ${cache.name} 任务？`}
              onConfirm={(): Promise<void> => deleteClick(cache)}
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
      <GraphQLTable<CacheFragment>
        columns={columns}
        dataSource={data?.caches.edges.map(({ node }): CacheFragment => node)}
        hasMore={data?.caches.pageInfo.hasNextPage}
        id="Cache"
        loading={loading || deleteLoading || updateLoading || createLoading}
        name="Cache"
        rowKey="id"
        toolBarRender={(): ReactNode[] => [
          <Button type="primary" onClick={() => setVisible(true)}>
            创建缓存
          </Button>,
        ]}
        variables={variables}
        onLoadMore={(): void => {
          fetchMore({
            variables: {
              after: data?.caches.pageInfo.endCursor,
            },
            updateQuery: (previousResult, { fetchMoreResult }): CachesQuery => {
              if (!fetchMoreResult) return previousResult;

              return {
                caches: {
                  __typename: previousResult.caches.__typename,
                  totalCount: fetchMoreResult.caches.totalCount,
                  pageInfo: fetchMoreResult.caches.pageInfo,
                  edges: [
                    ...previousResult.caches.edges,
                    ...fetchMoreResult.caches.edges,
                  ],
                },
              };
            },
          });
        }}
        onRefresh={() => refetch()}
        onVariablesChange={setVariables}
      />

      <EditCache
        current={current}
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </Card>
  );
};

export default Cache;
