const path = require('path');
const DIST_FOLDER = path.resolve( __dirname, 'dist' );

module.exports = {
  mode: "development",
  entry: [ './demoApp.js'],
  output: {
    path: DIST_FOLDER,
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env', '@babel/preset-react' ],
          }
        }
      }
    ]
  }
}