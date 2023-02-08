const { defineConfig } = require('@vue/cli-service');
const RenamePlugin = require('./webpack/rename-plugin');
const WrapperPlugin = require('./webpack/wrapper-plugin');

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  productionSourceMap: false,
  filenameHashing: false,
  publicPath: '',
  css: {
    extract: false,
  },

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = '[name].js';
      config.output.chunkFilename = '[name].js';
      config.performance = { hints: false };

      config.optimization.splitChunks = false;
      config.optimization.usedExports = false;

      // do not mock in production
      config.externals = { '@/mock/google': 'google' };
    }
  },

  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap((args) => {
        args[0].minify = false;
        args[0].inject = false;

        return args;
      });

      config.plugin('wrapper').use(WrapperPlugin, [
        {
          test: /app\.js/,
          header: '<script>',
          footer: '</script>',
          afterOptimizations: true,
        },
      ]);

      config.plugin('rename').use(RenamePlugin);
    }
  },
});
