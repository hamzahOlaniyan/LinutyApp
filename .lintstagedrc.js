// module.exports = {
//   // Type check TypeScript files
//   "**/*.(ts|tsx)": () => "pnpm ts-check",

//   // Lint & Prettify TS and JS files
//   "**/*.(ts|tsx|js)": () => ["pnpm lint:fix", "pnpm prettier:fix"],

//   // Prettify only Markdown and JSON files
//   "**/*.(md|json)": () => "pnpm prettier:fix"
// };

module.exports = {
  // Lint & Prettify: Run ONLY on the staged files.
  // We use 'pnpm exec' to run the binaries directly from node_modules.
  "**/*.(ts|tsx|js|jsx)": filenames => [
    `npm exec eslint --fix --no-warn-ignored ${filenames.join(" ")}`,
    `npm exec prettier --write ${filenames.join(" ")}`
  ],

  // JSON & Markdown: Run prettier only on staged files
  "**/*.(md|json)": filenames =>
    `npm exec prettier --write ${filenames.join(" ")}`
};
