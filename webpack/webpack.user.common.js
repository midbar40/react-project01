const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    user: "./src/user/userIndex.tsx"
  },
  resolve: {
    // TS2732: Cannot find module '../data/mainSectionImgs.json'. Consider using '--resolveJsonModule' to import module with '.json' extension.
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],  //  위 ts2732 오류로 .json 추가함 => 해결됨
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "../dist/user"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename : 'index.html', 
      template: "./public/userIndex.html",
      chunks:['user'] 
    }),
    new CleanWebpackPlugin(),

  ],
};
