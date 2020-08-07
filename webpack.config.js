const path = require('path');

const SRC_DIR = path.join(__dirname, 'client');
const DIST_DIR = path.join(__dirname, 'public');

module.exports = {
  entry: path.resolve(SRC_DIR, 'index.jsx'),
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
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
<<<<<<< Updated upstream
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
=======
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
};
>>>>>>> Stashed changes
