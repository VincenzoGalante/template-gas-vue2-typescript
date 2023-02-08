// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Compiler = require('webpack').Compiler;

class RenamePlugin {
  /**
   * @param {Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('RenamePlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'RenamePlugin',
          stage:
            compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER,
        },
        () => {
          compilation.renameAsset('app.js', 'app.js.html');
        }
      );
    });
  }
}

module.exports = RenamePlugin;
