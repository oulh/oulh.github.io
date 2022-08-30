---
title: yarn基础使用
---

> yarn快速入门基础使用命令
## 安装

```shell
npm install -g yarn
#检测是否安装成功
yarn --version
```

```shell
#初始化一个新项目
yarn init
```

## 包管理

### **添加依赖包**

```shell
#安装最新版
yarn add [package]
#安装指定版本
yarn add [package]@[version]
#安装'tag'版本，一般表示测试版、稳定版等
yarn add [package]@[tag]
```

[yarn add | Yarn 中文文档](https://yarn.bootcss.com/docs/cli/add)

**将依赖项添加到不同依赖项类别中**

分别添加到 `devDependencies`、`peerDependencies` 和 `optionalDependencies` 类别中：

```shell
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

[依赖和版本 | Yarn 中文文档](https://yarn.bootcss.com/docs/dependencies)

### **升级依赖包**

```shell
yarn upgrade
# 更新package.json中注明的所有依赖的的最新版本，会重新生成yarn.lock文件
```

```shell
# 更新某依赖包的最新版本
yarn upgrade [package]
# 更新某依赖包的指定版本
yarn upgrade [package]@[version]
# 更新带"tag"标签的依赖包
yarn upgrade [package]@[tag]
```

[yarn upgrade | Yarn 中文文档](https://yarn.bootcss.com/docs/cli/upgrade)

### **移除依赖包**

```shell
yarn remove [package]
```

### **安装项目的全部依赖**

安装package.json中详细注明的所有依赖包

```shell
yarn
```

或者

```shell
yarn install
```

### 设置yarn源

```shell
# 查看当前源
$ yarn config get registry
https://registry.yarnpkg.com
$ yarn config set registry https://registry.npm.taobao.org
yarn config v1.22.18
success Set "registry" to "https://registry.npm.taobao.org".
Done in 0.08s.
$ yarn config get registry
https://registry.npm.taobao.org
```



## yarn和npm命令对比

Yarn 可以使用与 npm 相同的格式，并且可以从 npm 注册表安装任何包。`package.json`

如果你想在现有的 npm 项目上试用 Yarn，只需运行：

```shell
yarn
```



| npm (v5)                                | Yarn                            |
| --------------------------------------- | :------------------------------ |
| `npm install`                           | `yarn add`                      |
| **(N/A)**                               | `yarn add --flat`               |
| **(N/A)**                               | `yarn add --har`                |
| `npm install --no-package-lock`         | `yarn add --no-lockfile`        |
| **(N/A)**                               | `yarn add --pure-lockfile`      |
| `npm install [package] --save`          | `yarn add [package]`            |
| `npm install [package] --save-dev`      | `yarn add [package] --dev`      |
| **(N/A)**                               | `yarn add [package] --peer`     |
| `npm install [package] --save-optional` | `yarn add [package] --optional` |
| `npm install [package] --save-exact`    | `yarn add [package] --exact`    |
| **(N/A)**                               | `yarn add [package] --tilde`    |
| `npm install [package] --global`        | `yarn global add [package]`     |
| `npm update --global`                   | `yarn global upgrade`           |
| `npm rebuild`                           | `yarn add --force`              |
| `npm uninstall [package]`               | `yarn remove [package]`         |
| `npm cache clean`                       | `yarn cache clean [package]`    |
| `rm -rf node_modules && npm install`    | `yarn upgrade`                  |
| `npm version major`                     | `yarn version --major`          |
| `npm version minor`                     | `yarn version --minor`          |
| `npm version patch`                     | `yarn version --patch`          |

 [从 npm 迁移到 yarn |yarn中文文档](https://yarn.bootcss.com/docs/migrating-from-npm)

## 附

### [Yarn(v1) 中文文档](https://yarn.bootcss.com/docs)

### [Yarn 工作流介绍 ](https://yarn.bootcss.com/docs/yarn-workflow)

### [package.json详解](https://yarn.bootcss.com/docs/package-json)

