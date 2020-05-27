// umi routes: https://umijs.org/zh/guide/router.html

export default [
  {
    path: "/",
    component: "../layouts/RootLayout",
    routes: [
      {
        path: "/auth",
        component: "../layouts/AuthLayout",
        routes: [
          {
            name: "登录",
            path: "/auth/login",
            component: "./auth/Login",
          },
          {
            name: "注册",
            path: "/auth/register",
            component: "./auth/Register",
          },
        ],
      },
      {
        path: "/",
        component: "../layouts/SecurityLayout",
        routes: [
          {
            path: "/",
            component: "../layouts/BasicLayout",
            routes: [
              {
                path: "/",
                redirect: "/tasks",
              },

              {
                name: "任务管理",
                path: "/tasks",
                hideChildrenInMenu: true,
                routes: [
                  {
                    name: "任务列表",
                    path: "/tasks",
                    component: "./task/TaskManager",
                  },
                  {
                    name: "创建任务",
                    path: "/tasks/create",
                    component: "./task/CreateTask",
                  },
                  {
                    name: "编辑任务",
                    path: "/tasks/:id/edit",
                    component: "./task/EditTask",
                  },

                  {
                    name: "任务日志",
                    path: "/tasks/:id/logs",
                    component: "./task/TaskLog",
                  },
                ],
              },
              {
                path: "/storages",
                name: "存储管理",
                component: "./storage/StorageManager",
              },
              {
                path: "/caches",
                name: "缓存管理",
                component: "./cache/CacheManager",
              },
              {
                component: "./404",
              },
            ],
          },
          {
            component: "./404",
          },
        ],
      },
      {
        component: "./404",
      },
    ],
  },
  {
    component: "./404",
  },
];
