const path = require("path");

module.exports = {
  stories: ["../src/components/**/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-postcss"],
  framework: "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules.push(path.resolve(__dirname, "../src"));
    return config;
  },
};
