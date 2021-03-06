const path = require('path');
const webpack = require('webpack');

module.exports = [{
  name: 'client',
  entry: [
    './src/client/index.js',
  ],
  output: {
    filename: '[hash]-index.js',
    path: path.resolve('./build/client'),
    publicPath: '/',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { modules: false }],
            'react',
            'stage-3',
          ],
          compact: true,
        },
      }],
    }, {
      test: /\.(png|gif|jpg|svg)$/,
      use: [{
        loader: 'file-loader',
        options: { name: '[hash]-[name].[ext]' },
      }],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}, {
  name: 'client-App for server-side rendering',
  entry: [
    './src/client/App.jsx',
  ],
  output: {
    filename: 'App.js',
    path: path.resolve('./build/client'),
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  externals: /^[a-z\-0-9]+$/,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { modules: false }],
            'react',
            'stage-3',
          ],
          compact: true,
        },
      }],
    }],
  },
}, {
  name: 'client-reducer for server-side rendering',
  entry: [
    './src/client/reducer.js',
  ],
  output: {
    filename: 'reducer.js',
    path: path.resolve('./build/client'),
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  externals: /^[a-z\-0-9]+$/,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { modules: false }],
            'react',
            'stage-3',
          ],
          compact: true,
        },
      }],
    }],
  },
}];
