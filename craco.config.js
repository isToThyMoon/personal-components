/*
 * @Author: 王荣
 * @Date: 2022-03-02 14:45:17
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-02 14:49:12
 * @Description: craco.config.js
 */

const CracoLessPlugin = require("craco-less");

module.exports = {
  babel: {
    plugins: [
      // 配置 babel-plugin-import 按需加载antd组件
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: "css",
        },
        "antd",
      ],
    ],
  },
  webpack: {},
  // craco 提供的插件
  plugins: [
    // 配置 less
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // 自定义主题（如果有需要，单独文件定义更好一些）
              "@primary-color": "#1DA57A",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
