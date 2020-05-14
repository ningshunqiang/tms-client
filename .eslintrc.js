module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: ["simple-import-sort", "react-hooks"],
  rules: {
    "no-underscore-dangle": ["error", { allow: ["__typename"] }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "simple-import-sort/sort": "error",
    "react/prop-types": "off",
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
      },
    ],
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "@typescript-eslint/no-var-requires": 0,
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
