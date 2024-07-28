const { merge } = require("webpack-merge");
const commonUser = require("./webpack.user.common.js");
const commonAdmin = require("./webpack.admin.common.js");
const path = require("path"); 

module.exports = (env) => {
  const commonConfig = env.target === "admin" ? commonAdmin : commonUser;
  return merge(commonConfig, {
    mode: "development",
    devtool: "eval",
    devServer: {
      static: path.join(__dirname, `dist/${env.target}`), // .24.07.27 디렉토리 user/admin 변경하면서 추가, contentbase => static으로 변경
      host: 'localhost',
      historyApiFallback: true,
      port: env.target === "admin" ? 3001 : 3000,
      hot: true,
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

