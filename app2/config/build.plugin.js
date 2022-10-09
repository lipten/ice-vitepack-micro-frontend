const plugin = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    console.log('plugin-loader ============================================');
    // config.mode('production');
    // optimize chunks
    // config.optimization
    //   // share the same chunks across different modules
    //   .runtimeChunk(false)
    //   .splitChunks({
    //     chunks: 'all',
    //     name: 'vendors',
    //     maxInitialRequests: Infinity,
    //     minSize: 0,
    //     cacheGroups: {
    //       monaco_editor: {
    //         name: 'monaco-editor',
    //         test: /[\\/]node_modules[\\/]_?monaco-editor(.*)/,
    //         priority: 20,
    //       },
    //     },
    //   });
  });
};

module.exports = plugin;
