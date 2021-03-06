var path = require('path');

module.exports = {
  entry: {
    app: './src',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: "[name].js"
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.(jpeg|jpg|png|gif|ico)$/i,
        loader: 'file?name=[path][name].[ext]'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/, 
        loader: 'json-loader'
      },
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
