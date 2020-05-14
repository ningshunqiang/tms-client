// https://umijs.org/config/
import { defineConfig, utils } from "umi";
import defaultSettings from "./defaultSettings";
import chainWebpack from "./plugin.config";
import routes from "./routes.config";

const { winPath } = utils;

const { SERVER_URL } = process.env;

export default defineConfig({
  hash: true,
  antd: {
    // dark: true,
  },
  dynamicImport: {
    loading: "@/components/PageLoading/index",
  },
  targets: {
    ie: 11,
  },
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    "primary-color": defaultSettings.primaryColor,
  },
  define: {
    SERVER_URL: SERVER_URL,
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string
      ) => {
        if (
          context.resourcePath.includes("node_modules") ||
          context.resourcePath.includes("ant.design.pro.less") ||
          context.resourcePath.includes("global.less")
        ) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace(".less", "");
          const arr = winPath(antdProPath)
            .split("/")
            .map((a: string) => a.replace(/([A-Z])/g, "-$1"))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join("-")}-${localName}`.replace(/--/g, "-");
        }
        return localName;
      },
    },
  },
  manifest: {
    basePath: "/",
  },
  chainWebpack,
  extraBabelPlugins: [
    [
      "babel-plugin-styled-components",
      {
        displayName: true,
      },
    ],
  ],
});
