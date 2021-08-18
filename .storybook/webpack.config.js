module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        }
      },
      require.resolve("react-docgen-typescript-loader")
    ]
  });

  config.module.rules.push({
    test: /\.scss?$/,
    loader: 'style-loader!css-loader!sass-loader',
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
