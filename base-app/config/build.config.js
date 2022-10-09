import monacoEditorPlugin from 'vite-plugin-monaco-editor';
const path = require('path');
const fs = require('fs');
const { CachedInputFileSystem, ResolverFactory } = require('enhanced-resolve');
const deps = require('../package.json').dependencies;
// 查找第三方模块的各种打包版本兼容处理
const myResolver = ResolverFactory.createResolver({
  fileSystem: new CachedInputFileSystem(fs, 4000),
  conditionNames: ['node'],
  extensions: ['.js', '.json', '.node'],
  useSyncFileSystemCalls: true,
  mainFields: ['esm', 'module', 'main'],
});

// 获取 antd 包入口路径，优先 esm，兜底 cjs
// myResolver.resolveSync({}, process.cwd(), 'antd');
export const resolveModule = (moduleName) =>
  myResolver.resolveSync({}, process.cwd(), moduleName);


module.exports = {
  // 根究环境改变配置
  modeConfig: {
    // 本地环境用vite
    vite: {
      vite: true,
      vitePlugins: [monacoEditorPlugin()],
    },
    // 构建用webpack
    webpack: {
      vite: false,
      webpackPlugins: {
        'monaco-editor-webpack-plugin': {
          languages: [
            'json',
            'javascript',
            'sql',
            'mysql',
            'css',
            'html',
            'markdown',
            'python',
            'shell',
            'java',
            'ini',
          ],
        },
      },
    },
  },
  router: {
    configPath: 'src/routes/index.tsx',
  },
  outputDir: 'dist',
  store: false, // 关闭自带的状态管理
  auth: false, // 关闭自带的权限控制
  request: false, // 关闭自带的request
  hash: 'contenthash',
  disableRuntime: false, // 关闭所有运行时能力
  tsChecker: false,
  alias: {
    '@': './src/',
    '~': './',
  },
  publicPath: 'http://localhost:6010/',
  moduleFederation: {
    name: 'baseApp',
    filename: 'remoteEntry.js',
    library: { type: 'window', name: 'baseApp' },
    exposes: {
      './ShareInfo': './src/ShareInfo.tsx',
    },
    shared: {
      ...deps,
    },
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  plugins: [
    [
      'build-plugin-ignore-style',
      {
        libraryName: 'antd',
      },
    ],
    [
      'build-plugin-moment-locales',
      {
        locales: ['zh-cn'],
      },
    ],
    [path.resolve(__dirname, './build.plugin.js'), {}],
  ],
};
