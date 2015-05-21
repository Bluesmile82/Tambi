module.exports = {
    context: __dirname,
    entry: {
        index:  "./javascripts/index.js"
    },
    output: {
        path: "../app/assets/javascripts/",
        filename: "app-bundle.js",
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