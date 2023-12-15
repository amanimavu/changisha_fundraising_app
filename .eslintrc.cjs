/* eslint-env node */
module.exports = {
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // my TypeScript files extension
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/strict-type-checked",
      ],
      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
};
