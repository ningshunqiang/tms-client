import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}
const result: IntrospectionResultData = {
  __schema: {
    types: [],
  },
};
export default result;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  name: Scalars["String"];
  email: Scalars["String"];
  role: Role;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  tasks: TaskConnection;
  storages: StorageConnection;
  caches: CacheConnection;
};

export type UserTasksArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type UserStoragesArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type UserCachesArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type Ordering = {
  sort: Scalars["String"];
  direction?: Maybe<Direction>;
};

export enum Direction {
  ASC = "ASC",
  DESC = "DESC",
}

export type Cache = {
  __typename?: "Cache";
  id: Scalars["ID"];
  key: Scalars["String"];
  name: Scalars["String"];
  enable: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  ownerId: Scalars["String"];
  owner: User;
  collaborators: UserConnection;
  tasks: TaskConnection;
};

export type CacheCollaboratorsArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type CacheTasksArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TaskHistory = {
  __typename?: "TaskHistory";
  id: Scalars["ID"];
  name: Scalars["String"];
  code: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type TaskLog = {
  __typename?: "TaskLog";
  id: Scalars["ID"];
  result?: Maybe<Scalars["JSONObject"]>;
  status: RunningStatus;
  content: Scalars["String"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export enum RunningStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  TIMEOUT = "TIMEOUT",
}

export type Timer = {
  __typename?: "Timer";
  id: Scalars["ID"];
  name: Scalars["String"];
  cron: Scalars["String"];
  enable: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  taskId: Scalars["String"];
};

export type Webhook = {
  __typename?: "Webhook";
  id: Scalars["ID"];
  name: Scalars["String"];
  token: Scalars["String"];
  enable: Scalars["Boolean"];
  sync: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type Task = {
  __typename?: "Task";
  id: Scalars["ID"];
  key: Scalars["String"];
  name: Scalars["String"];
  code: Scalars["String"];
  enable: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  ownerId: Scalars["String"];
  owner: User;
  collaborators: UserConnection;
  histories: TaskHistoryConnection;
  timers: TimerConnection;
  webhooks: WebhookConnection;
  storages: StorageConnection;
  caches: CacheConnection;
  logs: TaskLogConnection;
  dependencies: TaskConnection;
};

export type TaskCollaboratorsArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TaskHistoriesArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TaskTimersArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TaskWebhooksArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TaskStoragesArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TaskCachesArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TaskLogsArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TaskDependenciesArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type Storage = {
  __typename?: "Storage";
  id: Scalars["ID"];
  key: Scalars["String"];
  name: Scalars["String"];
  enable: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  ownerId: Scalars["String"];
  owner: User;
  collaborators: UserConnection;
  tasks: TaskConnection;
};

export type StorageCollaboratorsArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type StorageTasksArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};

export type TaskEdge = {
  __typename?: "TaskEdge";
  node: Task;
  cursor: Scalars["String"];
};

export type TaskConnection = {
  __typename?: "TaskConnection";
  edges: Array<TaskEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UserEdge = {
  __typename?: "UserEdge";
  node: User;
  cursor: Scalars["String"];
};

export type UserConnection = {
  __typename?: "UserConnection";
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type StorageEdge = {
  __typename?: "StorageEdge";
  node: Storage;
  cursor: Scalars["String"];
};

export type StorageConnection = {
  __typename?: "StorageConnection";
  edges: Array<StorageEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type CacheEdge = {
  __typename?: "CacheEdge";
  node: Cache;
  cursor: Scalars["String"];
};

export type CacheConnection = {
  __typename?: "CacheConnection";
  edges: Array<CacheEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type TaskHistoryEdge = {
  __typename?: "TaskHistoryEdge";
  node: TaskHistory;
  cursor: Scalars["String"];
};

export type TaskHistoryConnection = {
  __typename?: "TaskHistoryConnection";
  edges: Array<TaskHistoryEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type TaskLogEdge = {
  __typename?: "TaskLogEdge";
  node: TaskLog;
  cursor: Scalars["String"];
};

export type TaskLogConnection = {
  __typename?: "TaskLogConnection";
  edges: Array<TaskLogEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type TimerEdge = {
  __typename?: "TimerEdge";
  node: Timer;
  cursor: Scalars["String"];
};

export type TimerConnection = {
  __typename?: "TimerConnection";
  edges: Array<TimerEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type WebhookEdge = {
  __typename?: "WebhookEdge";
  node: Webhook;
  cursor: Scalars["String"];
};

export type WebhookConnection = {
  __typename?: "WebhookConnection";
  edges: Array<WebhookEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type TokenPayload = {
  __typename?: "TokenPayload";
  token: Scalars["String"];
  user: User;
};

export type Query = {
  __typename?: "Query";
  storage: Storage;
  storages: StorageConnection;
  taskHistory: TaskHistory;
  taskLog: TaskLog;
  timer: Timer;
  webhook: Webhook;
  task: Task;
  tasks: TaskConnection;
  cache: Cache;
  caches: CacheConnection;
  user: User;
  users: UserConnection;
};

export type QueryStorageArgs = {
  id: Scalars["ID"];
};

export type QueryStoragesArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type QueryTaskHistoryArgs = {
  id: Scalars["ID"];
};

export type QueryTaskLogArgs = {
  id: Scalars["ID"];
};

export type QueryTimerArgs = {
  id: Scalars["ID"];
};

export type QueryWebhookArgs = {
  id: Scalars["ID"];
};

export type QueryTaskArgs = {
  id: Scalars["ID"];
};

export type QueryTasksArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type QueryCacheArgs = {
  id: Scalars["ID"];
};

export type QueryCachesArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type QueryUsersArgs = {
  query?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createStorage: Storage;
  updateStorage: Storage;
  deleteStorage: Storage;
  createTimer: Timer;
  updateTimer: Timer;
  deleteTimer: Timer;
  createWebhook: Webhook;
  updateWebhook: Webhook;
  deleteWebhook: Webhook;
  createTask: Task;
  updateTask: Task;
  deleteTask: Task;
  createCache: Cache;
  updateCache: Cache;
  deleteCache: Cache;
  createUser: User;
  updateUser: User;
  deleteUser: User;
  getToken: TokenPayload;
  refreshToken: TokenPayload;
};

export type MutationCreateStorageArgs = {
  input: CreateStorageInput;
};

export type MutationUpdateStorageArgs = {
  id: Scalars["ID"];
  input: UpdateStorageInput;
};

export type MutationDeleteStorageArgs = {
  id: Scalars["ID"];
};

export type MutationCreateTimerArgs = {
  input: CreateTimerInput;
};

export type MutationUpdateTimerArgs = {
  id: Scalars["ID"];
  input: UpdateTimerInput;
};

export type MutationDeleteTimerArgs = {
  id: Scalars["ID"];
};

export type MutationCreateWebhookArgs = {
  input: CreateWebhookInput;
};

export type MutationUpdateWebhookArgs = {
  id: Scalars["ID"];
  input: UpdateWebhookInput;
};

export type MutationDeleteWebhookArgs = {
  id: Scalars["ID"];
};

export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};

export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
  id: Scalars["ID"];
};

export type MutationDeleteTaskArgs = {
  id: Scalars["ID"];
};

export type MutationCreateCacheArgs = {
  input: CreateCacheInput;
};

export type MutationUpdateCacheArgs = {
  id: Scalars["ID"];
  input: UpdateCacheInput;
};

export type MutationDeleteCacheArgs = {
  id: Scalars["ID"];
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
  id: Scalars["ID"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type MutationGetTokenArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type CreateStorageInput = {
  key?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  enable: Scalars["Boolean"];
};

export type UpdateStorageInput = {
  key?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  enable?: Maybe<Scalars["Boolean"]>;
};

export type CreateTimerInput = {
  name: Scalars["String"];
  cron: Scalars["String"];
  enable: Scalars["Boolean"];
  taskId: Scalars["String"];
};

export type UpdateTimerInput = {
  name?: Maybe<Scalars["String"]>;
  cron?: Maybe<Scalars["String"]>;
  enable?: Maybe<Scalars["Boolean"]>;
};

export type CreateWebhookInput = {
  name: Scalars["String"];
  enable: Scalars["Boolean"];
  sync: Scalars["Boolean"];
  taskId: Scalars["String"];
};

export type UpdateWebhookInput = {
  name?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  enable?: Maybe<Scalars["Boolean"]>;
  sync?: Maybe<Scalars["Boolean"]>;
};

export type CreateTaskInput = {
  name: Scalars["String"];
  key?: Maybe<Scalars["String"]>;
  code: Scalars["String"];
  enable: Scalars["Boolean"];
};

export type UpdateTaskInput = {
  name?: Maybe<Scalars["String"]>;
  key?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  enable?: Maybe<Scalars["Boolean"]>;
};

export type CreateCacheInput = {
  key?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  enable: Scalars["Boolean"];
};

export type UpdateCacheInput = {
  key?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  enable?: Maybe<Scalars["Boolean"]>;
};

export type CreateUserInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type UpdateUserInput = {
  name?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "name" | "email"
>;

export type GetTokenMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type GetTokenMutation = { __typename?: "Mutation" } & {
  getToken: { __typename?: "TokenPayload" } & Pick<TokenPayload, "token"> & {
      user: { __typename?: "User" } & UserFragment;
    };
};

export type CurrentUserQueryVariables = {};

export type CurrentUserQuery = { __typename?: "Query" } & {
  user: { __typename?: "User" } & UserFragment;
};

export type RefreshTokenMutationVariables = {};

export type RefreshTokenMutation = { __typename?: "Mutation" } & {
  refreshToken: { __typename?: "TokenPayload" } & Pick<TokenPayload, "token">;
};

export type CacheFragment = { __typename?: "Cache" } & Pick<
  Cache,
  "id" | "name" | "enable" | "key" | "updatedAt" | "createdAt"
>;

export type CacheQueryVariables = {
  id: Scalars["ID"];
};

export type CacheQuery = { __typename?: "Query" } & {
  cache: { __typename?: "Cache" } & CacheFragment;
};

export type CachesQueryVariables = {
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type CachesQuery = { __typename?: "Query" } & {
  caches: { __typename?: "CacheConnection" } & Pick<
    CacheConnection,
    "totalCount"
  > & {
      pageInfo: { __typename?: "PageInfo" } & Pick<
        PageInfo,
        "hasNextPage" | "endCursor"
      >;
      edges: Array<
        { __typename?: "CacheEdge" } & {
          node: { __typename?: "Cache" } & {
            owner: { __typename?: "User" } & Pick<User, "name">;
          } & CacheFragment;
        }
      >;
    };
};

export type DeleteCacheMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteCacheMutation = { __typename?: "Mutation" } & {
  deleteCache: { __typename?: "Cache" } & CacheFragment;
};

export type CreateCacheMutationVariables = {
  input: CreateCacheInput;
};

export type CreateCacheMutation = { __typename?: "Mutation" } & {
  createCache: { __typename?: "Cache" } & {
    owner: { __typename?: "User" } & Pick<User, "name">;
  } & CacheFragment;
};

export type UpdateCacheMutationVariables = {
  id: Scalars["ID"];
  input: UpdateCacheInput;
};

export type UpdateCacheMutation = { __typename?: "Mutation" } & {
  updateCache: { __typename?: "Cache" } & {
    owner: { __typename?: "User" } & Pick<User, "name">;
  } & CacheFragment;
};

export type TaskHistoryFragment = { __typename?: "TaskHistory" } & Pick<
  TaskHistory,
  "id" | "name" | "createdAt" | "updatedAt"
> & { user: { __typename?: "User" } & Pick<User, "name"> };

export type TaskHistoryQueryVariables = {
  id: Scalars["ID"];
};

export type TaskHistoryQuery = { __typename?: "Query" } & {
  taskHistory: { __typename?: "TaskHistory" } & Pick<TaskHistory, "code"> &
    TaskHistoryFragment;
};

export type TaskHistoriesQueryVariables = {
  taskId: Scalars["ID"];
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TaskHistoriesQuery = { __typename?: "Query" } & {
  task: { __typename?: "Task" } & Pick<Task, "id"> & {
      histories: { __typename?: "TaskHistoryConnection" } & Pick<
        TaskHistoryConnection,
        "totalCount"
      > & {
          edges: Array<
            { __typename?: "TaskHistoryEdge" } & {
              node: { __typename?: "TaskHistory" } & TaskHistoryFragment;
            }
          >;
          pageInfo: { __typename?: "PageInfo" } & Pick<
            PageInfo,
            "hasNextPage" | "hasPreviousPage" | "startCursor" | "endCursor"
          >;
        };
    };
};

export type CreateUserMutationVariables = {
  input: CreateUserInput;
};

export type CreateUserMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "User" } & Pick<
    User,
    "id" | "name" | "email" | "createdAt" | "updatedAt"
  >;
};

export type StorageFragment = { __typename?: "Storage" } & Pick<
  Storage,
  "id" | "name" | "enable" | "key" | "updatedAt" | "createdAt"
> & { owner: { __typename?: "User" } & Pick<User, "name"> };

export type StorageQueryVariables = {
  id: Scalars["ID"];
};

export type StorageQuery = { __typename?: "Query" } & {
  storage: { __typename?: "Storage" } & StorageFragment;
};

export type StoragesQueryVariables = {
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type StoragesQuery = { __typename?: "Query" } & {
  storages: { __typename?: "StorageConnection" } & Pick<
    StorageConnection,
    "totalCount"
  > & {
      pageInfo: { __typename?: "PageInfo" } & Pick<
        PageInfo,
        "hasNextPage" | "endCursor"
      >;
      edges: Array<
        { __typename?: "StorageEdge" } & {
          node: { __typename?: "Storage" } & StorageFragment;
        }
      >;
    };
};

export type DeleteStorageMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteStorageMutation = { __typename?: "Mutation" } & {
  deleteStorage: { __typename?: "Storage" } & StorageFragment;
};

export type CreateStorageMutationVariables = {
  input: CreateStorageInput;
};

export type CreateStorageMutation = { __typename?: "Mutation" } & {
  createStorage: { __typename?: "Storage" } & StorageFragment;
};

export type UpdateStorageMutationVariables = {
  id: Scalars["ID"];
  input: UpdateStorageInput;
};

export type UpdateStorageMutation = { __typename?: "Mutation" } & {
  updateStorage: { __typename?: "Storage" } & StorageFragment;
};

export type TaskFragment = { __typename?: "Task" } & Pick<
  Task,
  "id" | "name" | "enable" | "key" | "updatedAt" | "createdAt" | "ownerId"
>;

export type TaskQueryVariables = {
  id: Scalars["ID"];
};

export type TaskQuery = { __typename?: "Query" } & {
  task: { __typename?: "Task" } & Pick<Task, "code"> & TaskFragment;
};

export type TasksQueryVariables = {
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TasksQuery = { __typename?: "Query" } & {
  tasks: { __typename?: "TaskConnection" } & Pick<
    TaskConnection,
    "totalCount"
  > & {
      pageInfo: { __typename?: "PageInfo" } & Pick<
        PageInfo,
        "hasNextPage" | "endCursor"
      >;
      edges: Array<
        { __typename?: "TaskEdge" } & {
          node: { __typename?: "Task" } & TaskFragment;
        }
      >;
    };
};

export type DeleteTaskMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteTaskMutation = { __typename?: "Mutation" } & {
  deleteTask: { __typename?: "Task" } & TaskFragment;
};

export type CreateTaskMutationVariables = {
  input: CreateTaskInput;
};

export type CreateTaskMutation = { __typename?: "Mutation" } & {
  createTask: { __typename?: "Task" } & TaskFragment;
};

export type UpdateTaskMutationVariables = {
  id: Scalars["ID"];
  input: UpdateTaskInput;
};

export type UpdateTaskMutation = { __typename?: "Mutation" } & {
  updateTask: { __typename?: "Task" } & Pick<Task, "code"> & TaskFragment;
};

export type TaskLogFragment = { __typename?: "TaskLog" } & Pick<
  TaskLog,
  "id" | "status" | "createdAt"
>;

export type TaskLogQueryVariables = {
  id: Scalars["ID"];
};

export type TaskLogQuery = { __typename?: "Query" } & {
  taskLog: { __typename?: "TaskLog" } & Pick<TaskLog, "result" | "content"> &
    TaskLogFragment;
};

export type TaskLogsQueryVariables = {
  taskId: Scalars["ID"];
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TaskLogsQuery = { __typename?: "Query" } & {
  task: { __typename?: "Task" } & Pick<Task, "id"> & {
      logs: { __typename?: "TaskLogConnection" } & Pick<
        TaskLogConnection,
        "totalCount"
      > & {
          edges: Array<
            { __typename?: "TaskLogEdge" } & {
              node: { __typename?: "TaskLog" } & TaskLogFragment;
            }
          >;
          pageInfo: { __typename?: "PageInfo" } & Pick<
            PageInfo,
            "hasNextPage" | "hasPreviousPage" | "startCursor" | "endCursor"
          >;
        };
    };
};

export type TimerFragment = { __typename?: "Timer" } & Pick<
  Timer,
  "id" | "name" | "createdAt" | "updatedAt" | "cron" | "enable" | "taskId"
>;

export type TimerQueryVariables = {
  id: Scalars["ID"];
};

export type TimerQuery = { __typename?: "Query" } & {
  timer: { __typename?: "Timer" } & TimerFragment;
};

export type TimersQueryVariables = {
  taskId: Scalars["ID"];
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type TimersQuery = { __typename?: "Query" } & {
  task: { __typename?: "Task" } & Pick<Task, "id"> & {
      timers: { __typename?: "TimerConnection" } & Pick<
        TimerConnection,
        "totalCount"
      > & {
          edges: Array<
            { __typename?: "TimerEdge" } & {
              node: { __typename?: "Timer" } & TimerFragment;
            }
          >;
          pageInfo: { __typename?: "PageInfo" } & Pick<
            PageInfo,
            "hasNextPage" | "hasPreviousPage" | "startCursor" | "endCursor"
          >;
        };
    };
};

export type DeleteTimerMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteTimerMutation = { __typename?: "Mutation" } & {
  deleteTimer: { __typename?: "Timer" } & TimerFragment;
};

export type CreateTimerMutationVariables = {
  input: CreateTimerInput;
};

export type CreateTimerMutation = { __typename?: "Mutation" } & {
  createTimer: { __typename?: "Timer" } & TimerFragment;
};

export type UpdatedTimerMutationVariables = {
  id: Scalars["ID"];
  input: UpdateTimerInput;
};

export type UpdatedTimerMutation = { __typename?: "Mutation" } & {
  updateTimer: { __typename?: "Timer" } & TimerFragment;
};

export type WebhookFragment = { __typename?: "Webhook" } & Pick<
  Webhook,
  "id" | "name" | "enable" | "createdAt" | "updatedAt" | "token" | "sync"
>;

export type WebhookQueryVariables = {
  id: Scalars["ID"];
};

export type WebhookQuery = { __typename?: "Query" } & {
  webhook: { __typename?: "Webhook" } & WebhookFragment;
};

export type WebhooksQueryVariables = {
  taskId: Scalars["ID"];
  after?: Maybe<Scalars["String"]>;
  query?: Maybe<Scalars["String"]>;
  orderBy?: Maybe<Array<Maybe<Ordering>>>;
};

export type WebhooksQuery = { __typename?: "Query" } & {
  task: { __typename?: "Task" } & Pick<Task, "id"> & {
      webhooks: { __typename?: "WebhookConnection" } & Pick<
        WebhookConnection,
        "totalCount"
      > & {
          edges: Array<
            { __typename?: "WebhookEdge" } & {
              node: { __typename?: "Webhook" } & WebhookFragment;
            }
          >;
          pageInfo: { __typename?: "PageInfo" } & Pick<
            PageInfo,
            "hasNextPage" | "hasPreviousPage" | "startCursor" | "endCursor"
          >;
        };
    };
};

export type DeleteWebhookMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteWebhookMutation = { __typename?: "Mutation" } & {
  deleteWebhook: { __typename?: "Webhook" } & WebhookFragment;
};

export type CreateWebhookMutationVariables = {
  input: CreateWebhookInput;
};

export type CreateWebhookMutation = { __typename?: "Mutation" } & {
  createWebhook: { __typename?: "Webhook" } & WebhookFragment;
};

export type UpdatedWebhookMutationVariables = {
  id: Scalars["ID"];
  input: UpdateWebhookInput;
};

export type UpdatedWebhookMutation = { __typename?: "Mutation" } & {
  updateWebhook: { __typename?: "Webhook" } & WebhookFragment;
};

export const UserFragmentDoc = gql`
  fragment User on User {
    id
    name
    email
  }
`;
export const CacheFragmentDoc = gql`
  fragment Cache on Cache {
    id
    name
    enable
    key
    updatedAt
    createdAt
  }
`;
export const TaskHistoryFragmentDoc = gql`
  fragment TaskHistory on TaskHistory {
    id
    name
    user {
      name
    }
    createdAt
    updatedAt
  }
`;
export const StorageFragmentDoc = gql`
  fragment Storage on Storage {
    id
    name
    enable
    key
    owner {
      name
    }
    updatedAt
    createdAt
  }
`;
export const TaskFragmentDoc = gql`
  fragment Task on Task {
    id
    name
    enable
    key
    updatedAt
    createdAt
    ownerId
  }
`;
export const TaskLogFragmentDoc = gql`
  fragment TaskLog on TaskLog {
    id
    status
    createdAt
  }
`;
export const TimerFragmentDoc = gql`
  fragment Timer on Timer {
    id
    name
    createdAt
    updatedAt
    cron
    enable
    taskId
  }
`;
export const WebhookFragmentDoc = gql`
  fragment Webhook on Webhook {
    id
    name
    enable
    createdAt
    updatedAt
    token
    sync
  }
`;
export const GetTokenDocument = gql`
  mutation GetToken($email: String!, $password: String!) {
    getToken(email: $email, password: $password) {
      token
      user {
        ...User
      }
    }
  }
  ${UserFragmentDoc}
`;
export type GetTokenMutationFn = ApolloReactCommon.MutationFunction<
  GetTokenMutation,
  GetTokenMutationVariables
>;

/**
 * __useGetTokenMutation__
 *
 * To run a mutation, you first call `useGetTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getTokenMutation, { data, loading, error }] = useGetTokenMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useGetTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GetTokenMutation,
    GetTokenMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    GetTokenMutation,
    GetTokenMutationVariables
  >(GetTokenDocument, baseOptions);
}
export type GetTokenMutationHookResult = ReturnType<typeof useGetTokenMutation>;
export type GetTokenMutationResult = ApolloReactCommon.MutationResult<
  GetTokenMutation
>;
export type GetTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GetTokenMutation,
  GetTokenMutationVariables
>;
export const CurrentUserDocument = gql`
  query CurrentUser {
    user {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    baseOptions
  );
}
export function useCurrentUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >(CurrentUserDocument, baseOptions);
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken {
    refreshToken {
      token
    }
  }
`;
export type RefreshTokenMutationFn = ApolloReactCommon.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, baseOptions);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult = ApolloReactCommon.MutationResult<
  RefreshTokenMutation
>;
export type RefreshTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const CacheDocument = gql`
  query Cache($id: ID!) {
    cache(id: $id) {
      ...Cache
    }
  }
  ${CacheFragmentDoc}
`;

/**
 * __useCacheQuery__
 *
 * To run a query within a React component, call `useCacheQuery` and pass it any options that fit your needs.
 * When your component renders, `useCacheQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCacheQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCacheQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CacheQuery,
    CacheQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CacheQuery, CacheQueryVariables>(
    CacheDocument,
    baseOptions
  );
}
export function useCacheLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CacheQuery,
    CacheQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<CacheQuery, CacheQueryVariables>(
    CacheDocument,
    baseOptions
  );
}
export type CacheQueryHookResult = ReturnType<typeof useCacheQuery>;
export type CacheLazyQueryHookResult = ReturnType<typeof useCacheLazyQuery>;
export type CacheQueryResult = ApolloReactCommon.QueryResult<
  CacheQuery,
  CacheQueryVariables
>;
export const CachesDocument = gql`
  query Caches($after: String, $query: String, $orderBy: [Ordering]) {
    caches(first: 10, after: $after, query: $query, orderBy: $orderBy) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...Cache
          owner {
            name
          }
        }
      }
    }
  }
  ${CacheFragmentDoc}
`;

/**
 * __useCachesQuery__
 *
 * To run a query within a React component, call `useCachesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCachesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCachesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      query: // value for 'query'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useCachesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CachesQuery,
    CachesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CachesQuery, CachesQueryVariables>(
    CachesDocument,
    baseOptions
  );
}
export function useCachesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CachesQuery,
    CachesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<CachesQuery, CachesQueryVariables>(
    CachesDocument,
    baseOptions
  );
}
export type CachesQueryHookResult = ReturnType<typeof useCachesQuery>;
export type CachesLazyQueryHookResult = ReturnType<typeof useCachesLazyQuery>;
export type CachesQueryResult = ApolloReactCommon.QueryResult<
  CachesQuery,
  CachesQueryVariables
>;
export const DeleteCacheDocument = gql`
  mutation DeleteCache($id: ID!) {
    deleteCache(id: $id) {
      ...Cache
    }
  }
  ${CacheFragmentDoc}
`;
export type DeleteCacheMutationFn = ApolloReactCommon.MutationFunction<
  DeleteCacheMutation,
  DeleteCacheMutationVariables
>;

/**
 * __useDeleteCacheMutation__
 *
 * To run a mutation, you first call `useDeleteCacheMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCacheMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCacheMutation, { data, loading, error }] = useDeleteCacheMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCacheMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteCacheMutation,
    DeleteCacheMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteCacheMutation,
    DeleteCacheMutationVariables
  >(DeleteCacheDocument, baseOptions);
}
export type DeleteCacheMutationHookResult = ReturnType<
  typeof useDeleteCacheMutation
>;
export type DeleteCacheMutationResult = ApolloReactCommon.MutationResult<
  DeleteCacheMutation
>;
export type DeleteCacheMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteCacheMutation,
  DeleteCacheMutationVariables
>;
export const CreateCacheDocument = gql`
  mutation CreateCache($input: CreateCacheInput!) {
    createCache(input: $input) {
      ...Cache
      owner {
        name
      }
    }
  }
  ${CacheFragmentDoc}
`;
export type CreateCacheMutationFn = ApolloReactCommon.MutationFunction<
  CreateCacheMutation,
  CreateCacheMutationVariables
>;

/**
 * __useCreateCacheMutation__
 *
 * To run a mutation, you first call `useCreateCacheMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCacheMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCacheMutation, { data, loading, error }] = useCreateCacheMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCacheMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateCacheMutation,
    CreateCacheMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateCacheMutation,
    CreateCacheMutationVariables
  >(CreateCacheDocument, baseOptions);
}
export type CreateCacheMutationHookResult = ReturnType<
  typeof useCreateCacheMutation
>;
export type CreateCacheMutationResult = ApolloReactCommon.MutationResult<
  CreateCacheMutation
>;
export type CreateCacheMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCacheMutation,
  CreateCacheMutationVariables
>;
export const UpdateCacheDocument = gql`
  mutation UpdateCache($id: ID!, $input: UpdateCacheInput!) {
    updateCache(id: $id, input: $input) {
      ...Cache
      owner {
        name
      }
    }
  }
  ${CacheFragmentDoc}
`;
export type UpdateCacheMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCacheMutation,
  UpdateCacheMutationVariables
>;

/**
 * __useUpdateCacheMutation__
 *
 * To run a mutation, you first call `useUpdateCacheMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCacheMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCacheMutation, { data, loading, error }] = useUpdateCacheMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCacheMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateCacheMutation,
    UpdateCacheMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateCacheMutation,
    UpdateCacheMutationVariables
  >(UpdateCacheDocument, baseOptions);
}
export type UpdateCacheMutationHookResult = ReturnType<
  typeof useUpdateCacheMutation
>;
export type UpdateCacheMutationResult = ApolloReactCommon.MutationResult<
  UpdateCacheMutation
>;
export type UpdateCacheMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCacheMutation,
  UpdateCacheMutationVariables
>;
export const TaskHistoryDocument = gql`
  query TaskHistory($id: ID!) {
    taskHistory(id: $id) {
      ...TaskHistory
      code
    }
  }
  ${TaskHistoryFragmentDoc}
`;

/**
 * __useTaskHistoryQuery__
 *
 * To run a query within a React component, call `useTaskHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskHistoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskHistoryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TaskHistoryQuery,
    TaskHistoryQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<TaskHistoryQuery, TaskHistoryQueryVariables>(
    TaskHistoryDocument,
    baseOptions
  );
}
export function useTaskHistoryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TaskHistoryQuery,
    TaskHistoryQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    TaskHistoryQuery,
    TaskHistoryQueryVariables
  >(TaskHistoryDocument, baseOptions);
}
export type TaskHistoryQueryHookResult = ReturnType<typeof useTaskHistoryQuery>;
export type TaskHistoryLazyQueryHookResult = ReturnType<
  typeof useTaskHistoryLazyQuery
>;
export type TaskHistoryQueryResult = ApolloReactCommon.QueryResult<
  TaskHistoryQuery,
  TaskHistoryQueryVariables
>;
export const TaskHistoriesDocument = gql`
  query TaskHistories(
    $taskId: ID!
    $after: String
    $query: String
    $orderBy: [Ordering]
  ) {
    task(id: $taskId) {
      id
      histories(first: 20, after: $after, query: $query, orderBy: $orderBy) {
        edges {
          node {
            ...TaskHistory
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
  ${TaskHistoryFragmentDoc}
`;

/**
 * __useTaskHistoriesQuery__
 *
 * To run a query within a React component, call `useTaskHistoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskHistoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskHistoriesQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      after: // value for 'after'
 *      query: // value for 'query'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useTaskHistoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TaskHistoriesQuery,
    TaskHistoriesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    TaskHistoriesQuery,
    TaskHistoriesQueryVariables
  >(TaskHistoriesDocument, baseOptions);
}
export function useTaskHistoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TaskHistoriesQuery,
    TaskHistoriesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    TaskHistoriesQuery,
    TaskHistoriesQueryVariables
  >(TaskHistoriesDocument, baseOptions);
}
export type TaskHistoriesQueryHookResult = ReturnType<
  typeof useTaskHistoriesQuery
>;
export type TaskHistoriesLazyQueryHookResult = ReturnType<
  typeof useTaskHistoriesLazyQuery
>;
export type TaskHistoriesQueryResult = ApolloReactCommon.QueryResult<
  TaskHistoriesQuery,
  TaskHistoriesQueryVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<
  CreateUserMutation,
  CreateUserMutationVariables
>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<
  CreateUserMutation
>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const StorageDocument = gql`
  query Storage($id: ID!) {
    storage(id: $id) {
      ...Storage
    }
  }
  ${StorageFragmentDoc}
`;

/**
 * __useStorageQuery__
 *
 * To run a query within a React component, call `useStorageQuery` and pass it any options that fit your needs.
 * When your component renders, `useStorageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStorageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStorageQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    StorageQuery,
    StorageQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<StorageQuery, StorageQueryVariables>(
    StorageDocument,
    baseOptions
  );
}
export function useStorageLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    StorageQuery,
    StorageQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<StorageQuery, StorageQueryVariables>(
    StorageDocument,
    baseOptions
  );
}
export type StorageQueryHookResult = ReturnType<typeof useStorageQuery>;
export type StorageLazyQueryHookResult = ReturnType<typeof useStorageLazyQuery>;
export type StorageQueryResult = ApolloReactCommon.QueryResult<
  StorageQuery,
  StorageQueryVariables
>;
export const StoragesDocument = gql`
  query Storages($after: String, $query: String, $orderBy: [Ordering]) {
    storages(first: 10, after: $after, query: $query, orderBy: $orderBy) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...Storage
        }
      }
    }
  }
  ${StorageFragmentDoc}
`;

/**
 * __useStoragesQuery__
 *
 * To run a query within a React component, call `useStoragesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoragesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoragesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      query: // value for 'query'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useStoragesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    StoragesQuery,
    StoragesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<StoragesQuery, StoragesQueryVariables>(
    StoragesDocument,
    baseOptions
  );
}
export function useStoragesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    StoragesQuery,
    StoragesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<StoragesQuery, StoragesQueryVariables>(
    StoragesDocument,
    baseOptions
  );
}
export type StoragesQueryHookResult = ReturnType<typeof useStoragesQuery>;
export type StoragesLazyQueryHookResult = ReturnType<
  typeof useStoragesLazyQuery
>;
export type StoragesQueryResult = ApolloReactCommon.QueryResult<
  StoragesQuery,
  StoragesQueryVariables
>;
export const DeleteStorageDocument = gql`
  mutation DeleteStorage($id: ID!) {
    deleteStorage(id: $id) {
      ...Storage
    }
  }
  ${StorageFragmentDoc}
`;
export type DeleteStorageMutationFn = ApolloReactCommon.MutationFunction<
  DeleteStorageMutation,
  DeleteStorageMutationVariables
>;

/**
 * __useDeleteStorageMutation__
 *
 * To run a mutation, you first call `useDeleteStorageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStorageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStorageMutation, { data, loading, error }] = useDeleteStorageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStorageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteStorageMutation,
    DeleteStorageMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteStorageMutation,
    DeleteStorageMutationVariables
  >(DeleteStorageDocument, baseOptions);
}
export type DeleteStorageMutationHookResult = ReturnType<
  typeof useDeleteStorageMutation
>;
export type DeleteStorageMutationResult = ApolloReactCommon.MutationResult<
  DeleteStorageMutation
>;
export type DeleteStorageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteStorageMutation,
  DeleteStorageMutationVariables
>;
export const CreateStorageDocument = gql`
  mutation CreateStorage($input: CreateStorageInput!) {
    createStorage(input: $input) {
      ...Storage
    }
  }
  ${StorageFragmentDoc}
`;
export type CreateStorageMutationFn = ApolloReactCommon.MutationFunction<
  CreateStorageMutation,
  CreateStorageMutationVariables
>;

/**
 * __useCreateStorageMutation__
 *
 * To run a mutation, you first call `useCreateStorageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStorageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStorageMutation, { data, loading, error }] = useCreateStorageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStorageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateStorageMutation,
    CreateStorageMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateStorageMutation,
    CreateStorageMutationVariables
  >(CreateStorageDocument, baseOptions);
}
export type CreateStorageMutationHookResult = ReturnType<
  typeof useCreateStorageMutation
>;
export type CreateStorageMutationResult = ApolloReactCommon.MutationResult<
  CreateStorageMutation
>;
export type CreateStorageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateStorageMutation,
  CreateStorageMutationVariables
>;
export const UpdateStorageDocument = gql`
  mutation UpdateStorage($id: ID!, $input: UpdateStorageInput!) {
    updateStorage(id: $id, input: $input) {
      ...Storage
    }
  }
  ${StorageFragmentDoc}
`;
export type UpdateStorageMutationFn = ApolloReactCommon.MutationFunction<
  UpdateStorageMutation,
  UpdateStorageMutationVariables
>;

/**
 * __useUpdateStorageMutation__
 *
 * To run a mutation, you first call `useUpdateStorageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStorageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStorageMutation, { data, loading, error }] = useUpdateStorageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStorageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateStorageMutation,
    UpdateStorageMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateStorageMutation,
    UpdateStorageMutationVariables
  >(UpdateStorageDocument, baseOptions);
}
export type UpdateStorageMutationHookResult = ReturnType<
  typeof useUpdateStorageMutation
>;
export type UpdateStorageMutationResult = ApolloReactCommon.MutationResult<
  UpdateStorageMutation
>;
export type UpdateStorageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateStorageMutation,
  UpdateStorageMutationVariables
>;
export const TaskDocument = gql`
  query Task($id: ID!) {
    task(id: $id) {
      ...Task
      code
    }
  }
  ${TaskFragmentDoc}
`;

/**
 * __useTaskQuery__
 *
 * To run a query within a React component, call `useTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<TaskQuery, TaskQueryVariables>
) {
  return ApolloReactHooks.useQuery<TaskQuery, TaskQueryVariables>(
    TaskDocument,
    baseOptions
  );
}
export function useTaskLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TaskQuery,
    TaskQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<TaskQuery, TaskQueryVariables>(
    TaskDocument,
    baseOptions
  );
}
export type TaskQueryHookResult = ReturnType<typeof useTaskQuery>;
export type TaskLazyQueryHookResult = ReturnType<typeof useTaskLazyQuery>;
export type TaskQueryResult = ApolloReactCommon.QueryResult<
  TaskQuery,
  TaskQueryVariables
>;
export const TasksDocument = gql`
  query Tasks($after: String, $query: String, $orderBy: [Ordering]) {
    tasks(first: 10, after: $after, query: $query, orderBy: $orderBy) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...Task
        }
      }
    }
  }
  ${TaskFragmentDoc}
`;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *      after: // value for 'after'
 *      query: // value for 'query'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useTasksQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TasksQuery,
    TasksQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<TasksQuery, TasksQueryVariables>(
    TasksDocument,
    baseOptions
  );
}
export function useTasksLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TasksQuery,
    TasksQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<TasksQuery, TasksQueryVariables>(
    TasksDocument,
    baseOptions
  );
}
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksQueryResult = ApolloReactCommon.QueryResult<
  TasksQuery,
  TasksQueryVariables
>;
export const DeleteTaskDocument = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`;
export type DeleteTaskMutationFn = ApolloReactCommon.MutationFunction<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteTaskMutation,
    DeleteTaskMutationVariables
  >(DeleteTaskDocument, baseOptions);
}
export type DeleteTaskMutationHookResult = ReturnType<
  typeof useDeleteTaskMutation
>;
export type DeleteTaskMutationResult = ApolloReactCommon.MutationResult<
  DeleteTaskMutation
>;
export type DeleteTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
>;
export const CreateTaskDocument = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`;
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateTaskMutation,
    CreateTaskMutationVariables
  >(CreateTaskDocument, baseOptions);
}
export type CreateTaskMutationHookResult = ReturnType<
  typeof useCreateTaskMutation
>;
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<
  CreateTaskMutation
>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTaskMutation,
  CreateTaskMutationVariables
>;
export const UpdateTaskDocument = gql`
  mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      ...Task
      code
    }
  }
  ${TaskFragmentDoc}
`;
export type UpdateTaskMutationFn = ApolloReactCommon.MutationFunction<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateTaskMutation,
    UpdateTaskMutationVariables
  >(UpdateTaskDocument, baseOptions);
}
export type UpdateTaskMutationHookResult = ReturnType<
  typeof useUpdateTaskMutation
>;
export type UpdateTaskMutationResult = ApolloReactCommon.MutationResult<
  UpdateTaskMutation
>;
export type UpdateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateTaskMutation,
  UpdateTaskMutationVariables
>;
export const TaskLogDocument = gql`
  query TaskLog($id: ID!) {
    taskLog(id: $id) {
      ...TaskLog
      result
      content
    }
  }
  ${TaskLogFragmentDoc}
`;

/**
 * __useTaskLogQuery__
 *
 * To run a query within a React component, call `useTaskLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskLogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskLogQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TaskLogQuery,
    TaskLogQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<TaskLogQuery, TaskLogQueryVariables>(
    TaskLogDocument,
    baseOptions
  );
}
export function useTaskLogLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TaskLogQuery,
    TaskLogQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<TaskLogQuery, TaskLogQueryVariables>(
    TaskLogDocument,
    baseOptions
  );
}
export type TaskLogQueryHookResult = ReturnType<typeof useTaskLogQuery>;
export type TaskLogLazyQueryHookResult = ReturnType<typeof useTaskLogLazyQuery>;
export type TaskLogQueryResult = ApolloReactCommon.QueryResult<
  TaskLogQuery,
  TaskLogQueryVariables
>;
export const TaskLogsDocument = gql`
  query TaskLogs(
    $taskId: ID!
    $after: String
    $query: String
    $orderBy: [Ordering]
  ) {
    task(id: $taskId) {
      id
      logs(first: 10, after: $after, query: $query, orderBy: $orderBy) {
        edges {
          node {
            ...TaskLog
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
  ${TaskLogFragmentDoc}
`;

/**
 * __useTaskLogsQuery__
 *
 * To run a query within a React component, call `useTaskLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskLogsQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      after: // value for 'after'
 *      query: // value for 'query'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useTaskLogsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TaskLogsQuery,
    TaskLogsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<TaskLogsQuery, TaskLogsQueryVariables>(
    TaskLogsDocument,
    baseOptions
  );
}
export function useTaskLogsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TaskLogsQuery,
    TaskLogsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<TaskLogsQuery, TaskLogsQueryVariables>(
    TaskLogsDocument,
    baseOptions
  );
}
export type TaskLogsQueryHookResult = ReturnType<typeof useTaskLogsQuery>;
export type TaskLogsLazyQueryHookResult = ReturnType<
  typeof useTaskLogsLazyQuery
>;
export type TaskLogsQueryResult = ApolloReactCommon.QueryResult<
  TaskLogsQuery,
  TaskLogsQueryVariables
>;
export const TimerDocument = gql`
  query Timer($id: ID!) {
    timer(id: $id) {
      ...Timer
    }
  }
  ${TimerFragmentDoc}
`;

/**
 * __useTimerQuery__
 *
 * To run a query within a React component, call `useTimerQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTimerQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TimerQuery,
    TimerQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<TimerQuery, TimerQueryVariables>(
    TimerDocument,
    baseOptions
  );
}
export function useTimerLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TimerQuery,
    TimerQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<TimerQuery, TimerQueryVariables>(
    TimerDocument,
    baseOptions
  );
}
export type TimerQueryHookResult = ReturnType<typeof useTimerQuery>;
export type TimerLazyQueryHookResult = ReturnType<typeof useTimerLazyQuery>;
export type TimerQueryResult = ApolloReactCommon.QueryResult<
  TimerQuery,
  TimerQueryVariables
>;
export const TimersDocument = gql`
  query Timers(
    $taskId: ID!
    $after: String
    $query: String
    $orderBy: [Ordering]
  ) {
    task(id: $taskId) {
      id
      timers(first: 10, after: $after, query: $query, orderBy: $orderBy) {
        edges {
          node {
            ...Timer
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
  ${TimerFragmentDoc}
`;

/**
 * __useTimersQuery__
 *
 * To run a query within a React component, call `useTimersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimersQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      after: // value for 'after'
 *      query: // value for 'query'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useTimersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    TimersQuery,
    TimersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<TimersQuery, TimersQueryVariables>(
    TimersDocument,
    baseOptions
  );
}
export function useTimersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TimersQuery,
    TimersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<TimersQuery, TimersQueryVariables>(
    TimersDocument,
    baseOptions
  );
}
export type TimersQueryHookResult = ReturnType<typeof useTimersQuery>;
export type TimersLazyQueryHookResult = ReturnType<typeof useTimersLazyQuery>;
export type TimersQueryResult = ApolloReactCommon.QueryResult<
  TimersQuery,
  TimersQueryVariables
>;
export const DeleteTimerDocument = gql`
  mutation DeleteTimer($id: ID!) {
    deleteTimer(id: $id) {
      ...Timer
    }
  }
  ${TimerFragmentDoc}
`;
export type DeleteTimerMutationFn = ApolloReactCommon.MutationFunction<
  DeleteTimerMutation,
  DeleteTimerMutationVariables
>;

/**
 * __useDeleteTimerMutation__
 *
 * To run a mutation, you first call `useDeleteTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTimerMutation, { data, loading, error }] = useDeleteTimerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTimerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteTimerMutation,
    DeleteTimerMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteTimerMutation,
    DeleteTimerMutationVariables
  >(DeleteTimerDocument, baseOptions);
}
export type DeleteTimerMutationHookResult = ReturnType<
  typeof useDeleteTimerMutation
>;
export type DeleteTimerMutationResult = ApolloReactCommon.MutationResult<
  DeleteTimerMutation
>;
export type DeleteTimerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteTimerMutation,
  DeleteTimerMutationVariables
>;
export const CreateTimerDocument = gql`
  mutation CreateTimer($input: CreateTimerInput!) {
    createTimer(input: $input) {
      ...Timer
    }
  }
  ${TimerFragmentDoc}
`;
export type CreateTimerMutationFn = ApolloReactCommon.MutationFunction<
  CreateTimerMutation,
  CreateTimerMutationVariables
>;

/**
 * __useCreateTimerMutation__
 *
 * To run a mutation, you first call `useCreateTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTimerMutation, { data, loading, error }] = useCreateTimerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTimerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateTimerMutation,
    CreateTimerMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateTimerMutation,
    CreateTimerMutationVariables
  >(CreateTimerDocument, baseOptions);
}
export type CreateTimerMutationHookResult = ReturnType<
  typeof useCreateTimerMutation
>;
export type CreateTimerMutationResult = ApolloReactCommon.MutationResult<
  CreateTimerMutation
>;
export type CreateTimerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTimerMutation,
  CreateTimerMutationVariables
>;
export const UpdatedTimerDocument = gql`
  mutation UpdatedTimer($id: ID!, $input: UpdateTimerInput!) {
    updateTimer(id: $id, input: $input) {
      ...Timer
    }
  }
  ${TimerFragmentDoc}
`;
export type UpdatedTimerMutationFn = ApolloReactCommon.MutationFunction<
  UpdatedTimerMutation,
  UpdatedTimerMutationVariables
>;

/**
 * __useUpdatedTimerMutation__
 *
 * To run a mutation, you first call `useUpdatedTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatedTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatedTimerMutation, { data, loading, error }] = useUpdatedTimerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatedTimerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdatedTimerMutation,
    UpdatedTimerMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdatedTimerMutation,
    UpdatedTimerMutationVariables
  >(UpdatedTimerDocument, baseOptions);
}
export type UpdatedTimerMutationHookResult = ReturnType<
  typeof useUpdatedTimerMutation
>;
export type UpdatedTimerMutationResult = ApolloReactCommon.MutationResult<
  UpdatedTimerMutation
>;
export type UpdatedTimerMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatedTimerMutation,
  UpdatedTimerMutationVariables
>;
export const WebhookDocument = gql`
  query Webhook($id: ID!) {
    webhook(id: $id) {
      ...Webhook
    }
  }
  ${WebhookFragmentDoc}
`;

/**
 * __useWebhookQuery__
 *
 * To run a query within a React component, call `useWebhookQuery` and pass it any options that fit your needs.
 * When your component renders, `useWebhookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWebhookQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWebhookQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    WebhookQuery,
    WebhookQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<WebhookQuery, WebhookQueryVariables>(
    WebhookDocument,
    baseOptions
  );
}
export function useWebhookLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    WebhookQuery,
    WebhookQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<WebhookQuery, WebhookQueryVariables>(
    WebhookDocument,
    baseOptions
  );
}
export type WebhookQueryHookResult = ReturnType<typeof useWebhookQuery>;
export type WebhookLazyQueryHookResult = ReturnType<typeof useWebhookLazyQuery>;
export type WebhookQueryResult = ApolloReactCommon.QueryResult<
  WebhookQuery,
  WebhookQueryVariables
>;
export const WebhooksDocument = gql`
  query Webhooks(
    $taskId: ID!
    $after: String
    $query: String
    $orderBy: [Ordering]
  ) {
    task(id: $taskId) {
      id
      webhooks(first: 10, after: $after, query: $query, orderBy: $orderBy) {
        edges {
          node {
            ...Webhook
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  }
  ${WebhookFragmentDoc}
`;

/**
 * __useWebhooksQuery__
 *
 * To run a query within a React component, call `useWebhooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useWebhooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWebhooksQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      after: // value for 'after'
 *      query: // value for 'query'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useWebhooksQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    WebhooksQuery,
    WebhooksQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<WebhooksQuery, WebhooksQueryVariables>(
    WebhooksDocument,
    baseOptions
  );
}
export function useWebhooksLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    WebhooksQuery,
    WebhooksQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<WebhooksQuery, WebhooksQueryVariables>(
    WebhooksDocument,
    baseOptions
  );
}
export type WebhooksQueryHookResult = ReturnType<typeof useWebhooksQuery>;
export type WebhooksLazyQueryHookResult = ReturnType<
  typeof useWebhooksLazyQuery
>;
export type WebhooksQueryResult = ApolloReactCommon.QueryResult<
  WebhooksQuery,
  WebhooksQueryVariables
>;
export const DeleteWebhookDocument = gql`
  mutation DeleteWebhook($id: ID!) {
    deleteWebhook(id: $id) {
      ...Webhook
    }
  }
  ${WebhookFragmentDoc}
`;
export type DeleteWebhookMutationFn = ApolloReactCommon.MutationFunction<
  DeleteWebhookMutation,
  DeleteWebhookMutationVariables
>;

/**
 * __useDeleteWebhookMutation__
 *
 * To run a mutation, you first call `useDeleteWebhookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWebhookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWebhookMutation, { data, loading, error }] = useDeleteWebhookMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWebhookMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteWebhookMutation,
    DeleteWebhookMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteWebhookMutation,
    DeleteWebhookMutationVariables
  >(DeleteWebhookDocument, baseOptions);
}
export type DeleteWebhookMutationHookResult = ReturnType<
  typeof useDeleteWebhookMutation
>;
export type DeleteWebhookMutationResult = ApolloReactCommon.MutationResult<
  DeleteWebhookMutation
>;
export type DeleteWebhookMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteWebhookMutation,
  DeleteWebhookMutationVariables
>;
export const CreateWebhookDocument = gql`
  mutation CreateWebhook($input: CreateWebhookInput!) {
    createWebhook(input: $input) {
      ...Webhook
    }
  }
  ${WebhookFragmentDoc}
`;
export type CreateWebhookMutationFn = ApolloReactCommon.MutationFunction<
  CreateWebhookMutation,
  CreateWebhookMutationVariables
>;

/**
 * __useCreateWebhookMutation__
 *
 * To run a mutation, you first call `useCreateWebhookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWebhookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWebhookMutation, { data, loading, error }] = useCreateWebhookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWebhookMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateWebhookMutation,
    CreateWebhookMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateWebhookMutation,
    CreateWebhookMutationVariables
  >(CreateWebhookDocument, baseOptions);
}
export type CreateWebhookMutationHookResult = ReturnType<
  typeof useCreateWebhookMutation
>;
export type CreateWebhookMutationResult = ApolloReactCommon.MutationResult<
  CreateWebhookMutation
>;
export type CreateWebhookMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateWebhookMutation,
  CreateWebhookMutationVariables
>;
export const UpdatedWebhookDocument = gql`
  mutation UpdatedWebhook($id: ID!, $input: UpdateWebhookInput!) {
    updateWebhook(id: $id, input: $input) {
      ...Webhook
    }
  }
  ${WebhookFragmentDoc}
`;
export type UpdatedWebhookMutationFn = ApolloReactCommon.MutationFunction<
  UpdatedWebhookMutation,
  UpdatedWebhookMutationVariables
>;

/**
 * __useUpdatedWebhookMutation__
 *
 * To run a mutation, you first call `useUpdatedWebhookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatedWebhookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatedWebhookMutation, { data, loading, error }] = useUpdatedWebhookMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatedWebhookMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdatedWebhookMutation,
    UpdatedWebhookMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdatedWebhookMutation,
    UpdatedWebhookMutationVariables
  >(UpdatedWebhookDocument, baseOptions);
}
export type UpdatedWebhookMutationHookResult = ReturnType<
  typeof useUpdatedWebhookMutation
>;
export type UpdatedWebhookMutationResult = ApolloReactCommon.MutationResult<
  UpdatedWebhookMutation
>;
export type UpdatedWebhookMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatedWebhookMutation,
  UpdatedWebhookMutationVariables
>;
