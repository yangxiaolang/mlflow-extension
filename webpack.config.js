const webpack = require('webpack')
module.exports = {
  plugins: [new webpack.DefinePlugin({
    process:{
      env:{
        HIDE_EXPERIMENT_LIST:JSON.stringify('false'),
        HIDE_HEADER:JSON.stringify('false')
      }
    }
  })],
};
