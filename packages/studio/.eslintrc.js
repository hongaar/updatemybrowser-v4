module.exports = {
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2015,
  },
  rules: {
    "import/no-unresolved": ["error", { ignore: [".*:.*"] }],
  },
};
