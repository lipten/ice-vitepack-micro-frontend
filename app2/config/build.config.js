import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import path from 'path';
const deps = require('../package.json').dependencies;
module.exports = {
  // 根究环境改变配置
  devPublicPath: 'http://localhost:6012/',
  publicPath: 'http://localhost:6012/',
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
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  moduleFederation: {
    name: 'APP2',
    // filename: 'remoteEntry.js',
    remotes: {
      // baseApp: 'baseApp@http://localhost:6010/remoteEntry.js',
      baseApp: `promise new Promise(resolve => {
        // This part depends on how you plan on hosting and versioning your federated modules
        const remoteUrlWithVersion = 'http://localhost:6010/remoteEntry.js'
        const script = document.createElement('script')
        script.src = remoteUrlWithVersion
        script.onload = () => {
          // the injected script has loaded and is available on window
          // we can now resolve this Promise
          const proxy = {
            get: (request) => window.baseApp.get(request),
            init: (arg) => {
              try {
                return window.baseApp.init(arg)
              } catch(e) {
                console.log('remote container already initialized')
              }
            }
          }
          resolve(proxy)
        }
        // inject this script with the src set to the versioned remoteEntry.js
        document.head.appendChild(script);
      })
      `,
      // APP1: 'APP1@http://localhost:6011/remoteEntry.js',
    },
    shared: {
      ...deps,
    },
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
