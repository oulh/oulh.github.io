---
title: npm基础使用
---

> npm快速入门基础使用命令


## 安装和更新npm

### 安装Node.js和npm

npm 是用 Node.js 编写的，因此需要安装 Node.js 才能使用 npm。安装 node.js 时，会自动安装 npm。

[Node.js下载地址](https://nodejs.org/en/download/)

```shell
# 版本查看
$ node -v
v16.15.0
$ npm -v
8.5.5
```

### 更新 npm

更新到最新稳定版本

```shell
npm install npm@latest -g
```

更新到最新未发布测试版

```shell
npm install npm@next -g
```

## 包管理

### 包安装

#### **本地安装**

在项目目录下执行安装命令，安装的包会保存在当前目录下的`node_modules` 目录下。

1. `npm install [<@scope>/]<package_name>`

   如果当前目录下没有[package.json](https://www.npmjs.cn/files/package.json)文件，或packge.json里不存在该包信息，则安装该包最新版本，并把包信息写入packge.json文件中；否则会在 `package.json` 文件中查找针对这个包所约定的[语义化版本规则](https://www.npmjs.cn/getting-started/semantic-versioning)，然后安装符合此规则的最新版本。

   <@scope>表示一个集合，安装的包会保存在node_modules/@scope目录下，可不加该参数。

2. `npm install [<@scope>/]<name>@<tag>`

   安装指定标签引用的包的版本，默认值是latest

3. `npm install [<@scope>/]<name>@<version>`

    安装指定版本的包

4. `npm install`不加任何参数

    默认情况下，将安装package.json中作为dependenceies列出的模块

> [npm install](https://www.npmjs.cn/cli/install/)
>
> [package.json](https://www.npmjs.cn/getting-started/using-a-package.json/)管理本地包

#### 全局安装

如果你想将其作为一个命令行工具，那么你应该将其安装到全局。这种安装方式后可以让你在任何目录下使用这个包。

```shell
npm install -g <package>
```

### 更新包

```shell
# 更新本地指定包
npm update [<pkg>...]
#更新全局指定包
npm update [-g] [<pkg>...]
```

或 `npm update`更新package.json中所有可更新的包

1. 在 `package.json` 文件所在的目录中执行 `npm update` 命令。

2. 执行 `npm outdated` 命令。不应该有任何输出。

   > `npm outdated`可查找package.json中所列模块的可更新版本

### 卸载包

```shell
# 卸载本地包
npm uninstall <package>
# 卸载全局包
npm uninstall -g <package>
```

所卸载的包（package）所对应的目录将从node_modules消失。

**参数**

--save: 从 package.json 文件中删除依赖（Dependency）

--save-dev：从 package.json 文件中删除依赖（devDependency）

### 构建包

```shell
npm build [<package-folder>]
#<package-folder>: 在其根目录中包含一个 package.json 文件的文件夹。
```

## 参考

[npm中文文档](https://www.npmjs.cn/)

[查找包的网站](https://www.npmjs.com/)
