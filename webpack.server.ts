import path from 'path';
import webpack from 'webpack';
import glob from 'glob';
import GasPlugin from 'gas-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';

const config: webpack.Configuration = {
  mode: 'production',
  entry: glob.sync('./src/*(server|types)/**/!(*.d).ts'),
  target: ['node', 'es5'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Code.js',
  },
  module: {
    rules: [
      {
        test: /(\.ts)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.server.json'),
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    usedExports: false,
    moduleIds: 'named',
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        terserOptions: {
          ecma: 2015,
          mangle: true,
          keep_fnames: true,
          output: {
            beautify: true,
          },
        },
      }),
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new Dotenv({
      path: path.join(
        __dirname,
        process.env.STAGING === 'true' ? '.env.staging' : '.env.production'
      ),
    }),
    new GasPlugin({
      autoGlobalExportsFiles: glob.sync('./src/server/**/!(*.d).ts'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'appsscript.json'),
          // flatten: true,
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],
};

export default config;
