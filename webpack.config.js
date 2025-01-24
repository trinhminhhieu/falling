const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: "falling",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  externals: {
    react: "react", // Đảm bảo không bundle React vào gói
    "react-dom": "react-dom", // Đảm bảo không bundle ReactDOM vào gói
  },
  target: "web",
  mode: "production", // Hoặc 'production' nếu bạn muốn build cho môi trường sản xuất
};
