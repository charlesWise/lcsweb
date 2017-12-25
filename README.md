# react多页面脚手架
用webpack打包js和css并生成html文件，gulp迁移img等静态资源，并将react组件提前渲染到页面中。
* [Features](#features)
* [项目部署](#项目部署)
    * [开发环境](#开发环境)
    * [生产环境](#生产环境)
* [目录树](#目录树)

## Features
不改变原有的react写法，可以复用react组件，通过gulp来渲染html，方便搜索引擎抓取。
## 项目部署
在项目根目录下执行
 ```
npm install
 ```     
### 开发环境
在项目根目录下执行
```
npm run **dev;
```   
#### 开发环境代理服务器设置
打开build.js,找到proxy,把里面的规则替换成开发环境需要拦截的规则。

### 生产环境
在项目根目录下执行
```
npm run build;
```  
要发布的资源在release文件夹下。

## 目录树

```
- root/                 # 根目录
  - js/                 # js目录
      - views/          # view,
        + pages/
        + widget/       # 通用组件，不涉及任何业务代码的组件
      + controller      # 逻辑层
      + res             # js静态资源，常量表
      + stores          # stores
      + util            # 工具类库
      + libs/           # 第三方纯js库
  + templates/          # html模板文件
  + asset               # 静态资源目录 images font 等
  + targets             # 项目配置
  + scss                # scss目录
  - release/            # 发布目录
    + js/               # 编译输出的js目录
    + images/           # 编译输出的图片目录
    + css/              # 编译输出的css目录
    - *.html            # html入口
 + webpack/             # webpack配置文件
  webpack.config.*.js   # 各个环境的webpack配置入口文件
  package.json          # 项目配置
  README.md             # 项目说明

```
