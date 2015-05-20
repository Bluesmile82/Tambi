module.exports = {
    context: __dirname,
    entry: {
        graph_creator:  "./javascripts/graph-creator.js"
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