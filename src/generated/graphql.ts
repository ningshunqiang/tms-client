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
};

export type CreateStorageInput = {
  key?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  enable: Scalars["Boolean"];
};

export type CreateTaskHistoryInput = {
  name: Scalars["String"];
  code: Scalars["String"];
  version: Scalars["Float"];
  taskId: Scalars["String"];
};

export type CreateTaskInput = {
  name: Scalars["String"];
  code: Scalars["String"];
  enable: Scalars["Boolean"];
};

export type CreateTimerInput = {
  name: Scalars["String"];
  cron: Scalars["String"];
  enable: Scalars["Boolean"];
  taskId: Scalars["String"];
};

export type CreateUserInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type CreateWebhookInput = {
  name: Scalars["String"];
  enable: Scalars["Boolean"];
  taskId: Scalars["String"];
};

export enum Direction {
  ASC = "ASC",
  DESC = "DESC",
}

export type Mutation = {
  __typename?: "Mutation";
  createTaskHistory: TaskHistory;
  createTimer: Timer;
  updateTimer: Timer;
  deleteTimer: Timer;
  createWebhook: Webhook;
  updateWebhook: Webhook;
  deleteWebhook: Webhook;
  createTask: Task;
  updateTask: Task;
  deleteTask: Task;
  createStorage: Storage;
  updateStorage: Storage;
  deleteStorage: Storage;
  createUser: User;
  updateUser: User;
  deleteUser: User;
  login: TokenPayload;
  refreshToken: TokenPayload;
};

export type MutationCreateTaskHistoryArgs = {
  input: CreateTaskHistoryInput;
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

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type Ordering = {
  sort: Scalars["String"];
  direction?: Maybe<Direction>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  taskHistory: TaskHistory;
  timer: Timer;
  webhook: Webhook;
  task: Task;
  tasks: TaskConnection;
  storage: Storage;
  storages: StorageConnection;
  user: User;
  users: UserConnection;
};

export type QueryTaskHistoryArgs = {
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

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

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

export type StorageConnection = {
  __typename?: "StorageConnection";
  edges: Array<StorageEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type StorageEdge = {
  __typename?: "StorageEdge";
  node: Storage;
  cursor: Scalars["String"];
};

export type Task = {
  __typename?: "Task";
  id: Scalars["ID"];
  name: Scalars["String"];
  code: Scalars["String"];
  enable: Scalars["Boolean"];
  version: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  ownerId: Scalars["String"];
  owner: User;
  collaborators: UserConnection;
  histories: TaskHistoryConnection;
  timers: TimerConnection;
  webhooks: WebhookConnection;
  storages: StorageConnection;
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

export type TaskConnection = {
  __typename?: "TaskConnection";
  edges: Array<TaskEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type TaskEdge = {
  __typename?: "TaskEdge";
  node: Task;
  cursor: Scalars["String"];
};

export type TaskHistory = {
  __typename?: "TaskHistory";
  id: Scalars["ID"];
  name: Scalars["String"];
  code: Scalars["String"];
  version: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type TaskHistoryConnection = {
  __typename?: "TaskHistoryConnection";
  edges: Array<TaskHistoryEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type TaskHistoryEdge = {
  __typename?: "TaskHistoryEdge";
  node: TaskHistory;
  cursor: Scalars["String"];
};

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

export type TimerConnection = {
  __typename?: "TimerConnection";
  edges: Array<TimerEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type TimerEdge = {
  __typename?: "TimerEdge";
  node: Timer;
  cursor: Scalars["String"];
};

export type TokenPayload = {
  __typename?: "TokenPayload";
  token: Scalars["String"];
  user: User;
};

export type UpdateStorageInput = {
  key?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  enable?: Maybe<Scalars["Boolean"]>;
};

export type UpdateTaskInput = {
  name?: Maybe<Scalars["String"]>;
  code?: Maybe<Scalars["String"]>;
  enable?: Maybe<Scalars["Boolean"]>;
};

export type UpdateTimerInput = {
  name?: Maybe<Scalars["String"]>;
  cron?: Maybe<Scalars["String"]>;
  enable?: Maybe<Scalars["Boolean"]>;
};

export type UpdateUserInput = {
  name?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type UpdateWebhookInput = {
  name?: Maybe<Scalars["String"]>;
  token?: Maybe<Scalars["String"]>;
  enable?: Maybe<Scalars["Boolean"]>;
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

export type UserConnection = {
  __typename?: "UserConnection";
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UserEdge = {
  __typename?: "UserEdge";
  node: User;
  cursor: Scalars["String"];
};

export type Webhook = {
  __typename?: "Webhook";
  id: Scalars["ID"];
  name: Scalars["String"];
  token: Scalars["String"];
  enable: Scalars["Boolean"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type WebhookConnection = {
  __typename?: "WebhookConnection";
  edges: Array<WebhookEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type WebhookEdge = {
  __typename?: "WebhookEdge";
  node: Webhook;
  cursor: Scalars["String"];
};

export type UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "name" | "email"
>;

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "TokenPayload" } & Pick<TokenPayload, "token"> & {
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

export type StorageFragment = { __typename?: "Storage" } & Pick<
  Storage,
  "id" | "name" | "enable" | "key" | "ownerId" | "updatedAt" | "createdAt"
>;

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
  "id" | "name" | "code" | "enable" | "updatedAt" | "createdAt" | "ownerId"
>;

export type TaskQueryVariables = {
  id: Scalars["ID"];
};

export type TaskQuery = { __typename?: "Query" } & {
  task: { __typename?: "Task" } & TaskFragment;
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

export type UpdatedTaskMutationVariables = {
  id: Scalars["ID"];
  input: UpdateTaskInput;
};

export type UpdatedTaskMutation = { __typename?: "Mutation" } & {
  updateTask: { __typename?: "Task" } & TaskFragment;
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
  "id" | "name" | "enable" | "createdAt" | "updatedAt" | "token"
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
export const StorageFragmentDoc = gql`
  fragment Storage on Storage {
    id
    name
    enable
    key
    ownerId
    updatedAt
    createdAt
  }
`;
export const TaskFragmentDoc = gql`
  fragment Task on Task {
    id
    name
    code
    enable
    updatedAt
    createdAt
    ownerId
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
  }
`;
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...User
      }
    }
  }
  ${UserFragmentDoc}
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
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
export const UpdatedTaskDocument = gql`
  mutation UpdatedTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`;
export type UpdatedTaskMutationFn = ApolloReactCommon.MutationFunction<
  UpdatedTaskMutation,
  UpdatedTaskMutationVariables
>;

/**
 * __useUpdatedTaskMutation__
 *
 * To run a mutation, you first call `useUpdatedTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatedTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatedTaskMutation, { data, loading, error }] = useUpdatedTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatedTaskMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdatedTaskMutation,
    UpdatedTaskMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdatedTaskMutation,
    UpdatedTaskMutationVariables
  >(UpdatedTaskDocument, baseOptions);
}
export type UpdatedTaskMutationHookResult = ReturnType<
  typeof useUpdatedTaskMutation
>;
export type UpdatedTaskMutationResult = ApolloReactCommon.MutationResult<
  UpdatedTaskMutation
>;
export type UpdatedTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatedTaskMutation,
  UpdatedTaskMutationVariables
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
