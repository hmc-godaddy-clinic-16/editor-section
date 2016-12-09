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
        test: /\.(png|jpg|svg)$/, 
        loader: "url-loader?limit=8192"
      }
    ]
  }
};
