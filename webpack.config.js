const webpack = require('webpack');
const path = require('path')
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
            plugins: [
              [
                'formatjs',
                {
                  idInterpolationPattern: '[sha512:contenthash:base64:6]',
                  ast: true
                }
              ]
            ]
          }
        }
      },
      {
        test: [new RegExp(path.join('lib/i18n/', '.*json'))],
        use: [
          {
            loader: require.resolve('./I18nCompileLoader'),
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          HIDE_EXPERIMENT_LIST: JSON.stringify('false'),
          HIDE_HEADER: JSON.stringify('true')
        }
      }
    })
  ]
};
