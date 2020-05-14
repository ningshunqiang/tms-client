import path from "path";
import * as IWebpackChainConfig from "webpack-chain";
import { GenerateSW } from "workbox-webpack-plugin";

const { NODE_ENV } = process.env;

function getModulePackageName(module: { context: string }) {
  if (!module.context) return null;

  const nodeModulesPath = path.join(__dirname, "../node_modules/");
  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }

  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName: string | null = moduleDirName;
  // handle tree shaking
  if (packageName && packageName.match("^_")) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)![1];
  }
  return packageName;
}

export default (config: IWebpackChainConfig) => {
  // PWA
  if (NODE_ENV === "production") {
    config.plugin("workbox").use(GenerateSW, [
      {
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
    ]);
  }

  // optimize chunks
  config.optimization
    // share the same chunks across different modules
    .runtimeChunk(false)
    .splitChunks({
      chunks: "async",
      name: "vendors",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: (module: { context: string }) => {
            const packageName = getModulePackageName(module) || "";
            if (packageName) {
              return [
                "apollo-boost",
                "lodash",
                "moment",
                "numeral",
                "styled-components",
              ].includes(packageName);
            }
            return false;
          },
        },
      },
    });
};
