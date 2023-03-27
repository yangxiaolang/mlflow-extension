var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js','jsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [],
  externals: [
    // Everything that starts with "@phosphor/"
    /^@phosphor\/.+$/,
    /^@jupyterlab\/.+$/
  ]
};
