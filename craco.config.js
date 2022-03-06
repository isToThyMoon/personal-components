/*
 * @Author: 王荣
 * @Date: 2022-03-05 00:08:18
 * @LastEditors: 王荣
 * @LastEditTime: 2022-03-06 11:56:05
 * @Description: 填写简介
 */

const CracoLessPlugin = require("craco-less");
const {
  whenDev,
  whenProd,
  when,
  getPlugin,
  pluginByName,
} = require("@craco/craco");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const TerserPlugin = require("terser-webpack-plugin");

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

  webpack: {
    /**
     * 重写 webpack 任意配置
     *  - 与直接定义 configure 对象方式互斥
     *  - 几乎所有的 webpack 配置均可以在 configure 函数中读取，然后覆盖
     */
    configure: (webpackConfig, { env, paths }) => {
      console.log("entry", webpackConfig.entry);
      // 修改统计信息输出
      webpackConfig.stats = "normal";
      // 修改entry
      webpackConfig.entry = {
        app: webpackConfig.entry,
        // button: path.resolve(__dirname, "src/components/button/index.tsx"),
        // button: './src/components/button/index.tsx'
      };

      // 修改 output
      webpackConfig.output = {
        ...webpackConfig.output,
        ...{
          // filename: whenDev(() => "static/js/bundle.js", "static/js/[name].js"),
          filename: whenDev(() => "static/js/[name].js", "static/js/[name].js"),
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

      // 配置optimization minimizer
      whenProd(() => {
        webpackConfig.optimization.minimize = true;
        webpackConfig.optimization.minimizer.map((plugin, index) => {
          if (plugin instanceof TerserPlugin) {
            webpackConfig.optimization.minimizer[index] = new TerserPlugin({
              extractComments: false, // 禁止生成license文件
              terserOptions: {
                parse: {
                  ecma: 8,
                },
                compress: {
                  ecma: 5,
                  warnings: false,
                  comparisons: false,
                  inline: 2,
                  //生产环境打包时删除console内容
                  drop_console: true,
                },
                mangle: {
                  safari10: true,
                },
                // Added for profiling in devtools
                keep_classnames: true,
                keep_fnames: true,
                output: {
                  ecma: 5,
                  comments: false,
                  ascii_only: true,
                },
              },
              // sourceMap: false,  新版仅建议在devtool中配置sourceMap 详见官方文档
            });
          }
        });
      });

      // 配置 splitChunks
      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        ...{
          chunks: "all",
          name: false,
          // name(module, chunks, cacheGroupKey) {
          //   const moduleFileName = module
          //     .identifier()
          //     .split('/')
          //     .reduceRight((item) => item);
          //   const allChunksNames = chunks.map((item) => item.name).join('~');
          //   return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          // },
          cacheGroups: {
            backgroundVendor: {
              name: "app-vendor",
              chunks: (chunk) => {
                return chunk.name === "app";
              },
            },
            contentVendor: {
              name: "button-vendor",
              chunks: (chunk) => {
                // console.log("********button vendor chunk", chunk);
                return chunk.name === "button";
              },
            },
          },
        },
      };

      // 覆盖已经内置的 plugin 配置
      const {
        isFound: isFoundMiniCssExtractPlugin,
        match: foundedMiniCssExtractPlugin,
      } = getPlugin(webpackConfig, pluginByName("MiniCssExtractPlugin"));
      // console.log('*********', foundedMiniCssExtractPlugin)
      if (isFoundMiniCssExtractPlugin) {
        Object.assign(foundedMiniCssExtractPlugin.options, {
          filename: "static/css/[name].css",
          chunkFilename: "static/css/[name].css",
        });
      }

      const {
        isFound: isFoundWebpackManifestPlugin,
        match: foundedWebpackManifestPlugin,
      } = getPlugin(webpackConfig, pluginByName("WebpackManifestPlugin"));
      // console.log('*********', webpackConfig.plugins)
      // console.log('*********', foundedWebpackManifestPlugin)
      if (isFoundWebpackManifestPlugin) {
        Object.assign(foundedWebpackManifestPlugin.options, {
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

      return webpackConfig;
    },
  },
};
