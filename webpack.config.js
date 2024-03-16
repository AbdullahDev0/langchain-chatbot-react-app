const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Adjust if your entry file is different
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'langchain-react-app.min.js',
    library: 'LangchainReactApp',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};
