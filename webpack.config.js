// const path = require('path');

// module.exports = {
//   entry: './client/index.jsx',
//   output: {
//     path: path.join(__dirname, 'client'),
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx$/,
//         exclude: /node_modules/,
//         query: {
//           presets: ['es2015', 'react']
//         }
//       },
//       {
//         test: /\.css$/,
//         loader: "css-loader"
//       }
//     ],
//   },
//   resolve: {
//     modules: [
//       path.join(__dirname, 'node_modules'),
//     ],
//   },
//   watch: true
// };



// const webpack = require('webpack');
// const path = require('path');

// let config = {
//   entry: './client/index.jsx',
//   output: {
//     path: path.join(__dirname, 'client'),
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [{
//       test: /\.jsx$/, // files ending with .js
//       exclude: /node_modules/, // exclude the node_modules directory
//       loader: "babel-loader" // use this (babel-core) loader
//     }]
//   }
// }

// module.exports = config;


'use strict'

var path = require('path');
var webpack = require('webpack');

var config = {
  entry: './client/index.jsx',
  output: { path: __dirname + '/client', filename: 'bundle.js' },
  module: {
    loaders: [
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread']
      }
    }]
  },
  node: {
    fs: "empty"
  },
  watch: true
}

module.exports = config;