module.exports = {
  stories: ["../stories/**/*.stories.tsx"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: async (config) => {
    config.resolve.extensions.push(".ts", ".tsx");

    config.module.rules.push({
      test: /\.less$/,
      use: [
        "style-loader",
        "css-loader",
        { loader: "less-loader", options: { javascriptEnabled: true } },
      ],
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: ["awesome-typescript-loader", "react-docgen-typescript-loader"],
    });

    return config;
  },
};
