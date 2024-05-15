module.exports = {
    // ...
    
    module: {
      rules: [
        
        // ...
        
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
          exclude: /node_modules/,
        },
      ],
    },
  }