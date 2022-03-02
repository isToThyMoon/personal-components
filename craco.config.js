/*
 * @Author: 王荣
 * @Date: 2022-03-02 14:45:17
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-02 20:54:39
 * @Description: craco.config.js
 */

const CracoLessPlugin = require("craco-less");
const { whenDev, whenProd, when } = require("@craco/craco");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const fs = require("fs");
const path = require("path");

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
  webpack: {
    /**
     * 重写 webpack 任意配置
     *  - 与直接定义 configure 对象方式互斥
     *  - 几乎所有的 webpack 配置均可以在 configure 函数中读取，然后覆盖
     */
    configure: (webpackConfig, { env, paths }) => {
      console.log("entry", webpackConfig.entry);
      // 修改entry
      webpackConfig.entry = {
        app: webpackConfig.entry,
      };

      // 修改 output
      webpackConfig.output = {
        ...webpackConfig.output,
        ...{
          filename: whenDev(() => "static/js/bundle.js", "static/js/[name].js"),
          chunkFilename: "static/js/[name].js",
        },
      };

      // 关闭 devtool
      webpackConfig.devtool = false;

      // 配置扩展扩展名
      webpackConfig.resolve.extensions = [
        ...webpackConfig.resolve.extensions,
        ...[".scss", ".less"],
      ];

      // 配置 splitChunks
      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        ...{
          chunks: "all",
          name: true,
        },
      };

      // 覆盖已经内置的 plugin 配置
      webpackConfig.plugins.map((plugin) => {
        whenProd(() => {
          if (plugin instanceof MiniCssExtractPlugin) {
            Object.assign(plugin.options, {
              filename: "static/css/[name].css",
              chunkFilename: "static/css/[name].css",
            });
          }
          if (plugin instanceof ManifestPlugin) {
            console.log("************", plugin);
            Object.assign(plugin.opts, {
              generate: (seed, files, entrypoints) => {
                const manifestFiles = files.reduce((manifest, file) => {
                  manifest[file.name] = file.path;
                  return manifest;
                }, seed);
                // const entrypointFiles = entrypoints.main.filter(
                //     fileName => !fileName.endsWith('.map')
                // );
                // 上面的语句导致入口文件名必须为main；如果重定义入口文件 必须修改它。
                let entrypointFiles = [];

                let filterUnMap = function (entryFiles) {
                  return entryFiles.filter(
                    (fileName) => !fileName.endsWith(".map")
                  );
                };
                // 遍历所有入口文件生成然后再加入entrypointFiles
                Object.keys(entrypoints).forEach((entry) => {
                  entrypointFiles.push(filterUnMap(entrypoints[entry]));
                });

                console.log("!!", entrypointFiles);

                return {
                  files: manifestFiles,
                  entrypoints: entrypointFiles,
                };
              },
            });
          }
        });
        return plugin;
      });

      return webpackConfig;
    },
  },
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
