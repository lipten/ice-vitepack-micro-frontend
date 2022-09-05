## 基于icejs定制的vite+webpack的react项目
## 简介
本项目基于[ice.js](https://ice.work/docs/guide/about).搭建，支持vite模式和webpack模式，但**摒弃了很多ice自带的运行时功能**（runApp/约定式路由/状态管理/请求库/权限），**改造成自行引入相关功能**（自定义entry/react-router-dom/dva），**还引入一些第三方库作为演示作用**（monaco-editor、echarts）,如不需要可以去掉。

ice.js有许多约定式的自带功能，而摒弃自带功能有两方面原因：
1. 避免黑盒，自定义项目功能保证透明可控性，但依然会使用ice的工程配置能力
2. 从其他脚手架（如umi）迁移过来需要尽量保持原来的功能写法
> 以上两点原因也可以作为本项目的适用范围，笔者已经实践过从umi迁移成该项目成功，已经投入生产使用
## 技术栈
* react 17.0.2
* Typescript 4.5.5
* antd 4.18.2
* react-router-dom 5.2.0
* dva 2.4.1
* ice.js 2.0.0

演示用第三方库：
* monaco-editor
* echarts
* lodash
* moment
## 使用

```bash
# 安装依赖
$ yarn install

# 以vite模式启动本地服务
$ yarn start  # visit http://localhost:3333

# 以webpack模式构建生产包
$ yarn build
```

## 目录

```md
├── config/                        # 工程配置
│   ├── build.config.js            # ice配置
│   └── build.plugin.js           # 自定义ice插件实现进阶配置
├── public/                        
│   ├── index.html                 # 应用入口 HTML
│   └── favicon.png                # Favicon
├── src/                           # 源码路径
│   ├── assets/                    # 图片、字体图标等资源
│   │   └── images/                # 图片资源
│   ├── components/                # 复用的业务组件
│   ├── layouts/                   # 布局组件
│   │   └── BasicLayout/
│   │       ├── index.tsx
│   ├── pages/                     # 页面组件目录
│   │   └── Home/                  # home 页面
│   │       ├── components/        # 页面级自定义业务组件
│   │       ├── index.tsx
│   │       └── index.module.less 
│   ├──routes/                     # 路由配置（在工程配置指定了路径）
│   │   └── index.tsx              
│   ├── services/                  # api接口
│   ├── models/                    # 状态管理模型
│   │   ├── index.ts
│   │   └── count.ts
│   ├── utils/                     # 工具库
│   ├── global.less                # 全局样式
│   └── app.tsx                    # 应用入口脚本
├── README.md
├── package.json
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .stylelintignore
├── .stylelintrc.js
├── .gitignore
└── tsconfig.json
```

## 常见问题

### 为什么webpack的一些进阶配置需要在config/plugin-config里配置作为ice插件
ice的工程配置仅支持以下webpack配置：
* webpackLoaders
* webpackPlugins
* libraryTarget
* library
* libraryExport
* publicPath
* proxy
* devServer

所以对于webpack的其他配置项（如：optimization、module、externals）则只能通过ice插件定制工程能力来配置

本项目中的[config/build.plugin.js](https://github.com/lipten/ice-vitepack-project/blob/master/config/build.plugin.js)使用了optimization处理chunks分包的场景，可以作为参考
### 第三方库不兼容ESModule：

vite只能加载ESModule规范的模块，对于其他模块规范文件需要特殊处理，vite的依赖预构建默认会找package.json里的依赖包自动处理兼容的写法，所以第三方库我们可以放到src路径下，通过**yarn add ./src/xxx** 添加本地库

添加后就会在package.json自动有下面这行依赖

```React
"xxx": "./src/libs/xxx",
```

### require语句换成Import xxx from 'xxx'

一些静态资源可能用了require语句，需要换成ESM的写法

### 动态路径加载文件地址

当vite需要实现require(`@/assets/images/${imgPath}`)这种动态路径加载时，换成以下写法：

```JavaScript
// 仅支持相对路径
new URL(`../../../src/${path}`, import.meta.url).href
```

可以做一下兼容webpack的处理

```JavaScript
export const importAssetsPath = (path: string) => {
  return window.IS_VITE ? new URL(`../../../src/assets/${path}`, import.meta.url).href : require(`../assets/${path}`);
};

```
### 动态加载模块import().then()

vite不支持动态加载模块import('xxxx').then()

![Image](https://static.lipten.link/blogs/202202071810699.png)



vite自带的rollup支持这种用法，所以可以增加 /* @vite-ignore */ 可以支持import('xxxx').then()

![Image](https://static.lipten.link/blogs/202202071810342.png)



### 引入@ant-design/compatible报错

![Image](https://static.lipten.link/blogs/202202071810181.png)

因为@ant-design/compatible依赖了draft-js里面用了global这个变量在浏览器会报错，只要在入口js赋值一下global即可

```JavaScript
window.global = window
```

### require()使用动态路径时必须要有src/xxx作为静态路径

webpack可能在分析require路径时需要确定src下以及路径作为静态字符串目录

下面的代码是无法正常解析的：

```JavaScript
const path = 'assets/images/xxx.png'
require(`@/${path}`)
require(`../${path}`)
require(`~/src/${path}`)
```

应该改为下面的路径写法：

```JavaScript
const path = 'images/xxx.png'
require(`@/assets/${path}`)
require(`../assets/${path}`)
require(`~/src/assets/${path}`)
```
