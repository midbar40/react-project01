const { merge } = require("webpack-merge");
const commonUser = require("./webpack.user.common.js");
const commonAdmin = require("./webpack.admin.common.js");
const TerserPlugin = require('terser-webpack-plugin');
const path = require("path"); 


module.exports = (env) => {
  const commonConfig = env.target === "admin" ? commonAdmin : commonUser;
  return merge(commonConfig, {
    mode: "production",
    devtool: "hidden-source-map",
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"], // 오른쪽에서 왼쪽으로 실행됨
          exclude: /node_modules/,
        },
      ],
    },
  })
};