import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import path from 'path';
module.exports = {
  // 根究环境改变配置
  devPublicPath: 'http://localhost:6012/',
  libraryTarget: 'umd',
  library: 'app2',
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
  outputDir: 'build',
  store: false, // 关闭自带的状态管理
  auth: false, // 关闭自带的权限控制
  request: false, // 关闭自带的request
  hash: true,
  disableRuntime: false, // 关闭所有运行时能力
  tsChecker: false,
  alias: {
    '@': './src/',
    '~': './',
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
