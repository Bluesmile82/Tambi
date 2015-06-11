module.exports = {
    context: __dirname,
    entry: {
        index:  "./fe/javascripts/index.js"
    },
    output: {
        path: "./app/views/ideas/",
        filename: "_appBundle.js",
    },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
          {
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    }
    ]
  }
};