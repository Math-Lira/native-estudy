module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@storage': './src/storage',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
