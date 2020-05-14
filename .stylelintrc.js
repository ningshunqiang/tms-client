module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-prettier/recommended",
    "stylelint-order-config-yandex",
  ],
  plugins: ["stylelint-order"],
  rules: {
    "function-name-case": null,
    "value-keyword-case": null,
  },
};
