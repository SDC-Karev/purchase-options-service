const path = require('path');

const SRC_DIR = path.join(__dirname, 'client');
const DIST_DIR = path.join(__dirname, 'public');

module.exports = {
  entry: path.resolve(SRC_DIR, 'PurchaseOptions.jsx'),
  output: {
    filename: 'app.js',
    path: DIST_DIR,
    library: 'PurchaseOptions',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          SRC_DIR,
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
    ],
  },
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
>>>>>>> Stashed changes
=======
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css']
  },
>>>>>>> 0ef58e058db842abe6c423cfc3df471fa0e481d3
};
