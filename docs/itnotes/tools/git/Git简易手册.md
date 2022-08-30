---
title: Git简易手册
---



## Git 

分布式版本控制系统

## 安装

https://git-scm.com/downloads

**打开 Git Bash**

**初始设置**

```shell
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

## 创建仓库

```bash
$ mkdir <仓库name>
$ cd <仓库name>
$ git init
```

或者在一个已有内容的目录下git init

## 添加文件到仓库

```bash
$ git add <filename or dirname> <filename or dirname> #把文件添加到缓存区
或
$ git add . #全部文件添加到缓存区

$ git commit -m "提交描述" # 把文件从缓存区提交到仓库
```

### 提交描述规范

```
# 新建(add)
# 删除(rm)
# 更新(update)
# 改动(change)
# 实现
# 发布
# 修复
...
```

## 版本管理

### 提交修改

```shell
# 显示新增/删除/改动的文件
$ git status
$ git add changedfilename
$ git commit -m "describe"
# 提交后可再次查看
$ git status
```

### 查看版本记录

```sh
git log # 显示版本号、提交时间等信息
```

也可使用可视化工具查看Git版本历史： 在仓库目录右键 > `Git BUI Here`

### 回退版本

#### 查看版本记录

```sh
$ git log
commit d47fe341e7417c32a64ce4acdf07f36837494ce3 (HEAD -> master, origin/master)
Author: name <email@example.com>
Date:   Tue Jun 14 03:26:51 2022 +0800
```

d47fe34 : 提交ID

HEAD : 当前版本

HEAD^ : 上一版本

HEAD^^ : 上上版本

#### 回退版本

```sh
# 回退到上一版本
$ git reset --hard HEAD^
```

#### 恢复到最新版本

回退到旧版本之后，`git log`原来新的版本没有了， 可以用版本号回到原来的版本

```
$ git reset --hard <版本号前几位>
```

 `git relog`记录了每一次命令，可以查看版本号

### 撤销修改

> 有些撤消操作是不可逆的。 这是在使用 Git 的过程中，会因为操作失误而导致之前的工作丢失的少有的几个地方之一。

[Git - 撤消操作 (git-scm.com)](https://git-scm.com/book/zh/v2/Git-基础-撤消操作)

#### 重新提交

提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。 此时，可以

```shell
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```

最终你只会有一个提交，第二次提交将代替第一次提交的结果。

#### 取消暂存的文件

暂存文件后，`git status`命令有提示如何取消暂存，就是`git reset HEAD <file>...`

```shell
$ git add *
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    renamed:    README.md -> README
    modified:   CONTRIBUTING.md
```

```shell
$ git reset HEAD CONTRIBUTING.md
Unstaged changes after reset:
M	CONTRIBUTING.md
```

::: danger
`git reset` 确实是个危险的命令，如果加上了 `--hard` 选项则更是如此。 然而在上述场景中，工作目录中的文件尚未修改，因此相对安全一些。
:::

#### 撤消对文件的修改(包括删除)

不想保留对文件的修改，撤消修改，将它还原成上次提交时的样子(或者刚克隆完的样子，或者刚把它放入工作目录时的样子)

`git status`也有提示怎么做

```bash
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   ../../../../.gitignore

```

```shell
$ git checkout -- <modifiedFileName>
```


::: danger
`git checkout -- <file>` 是一个危险的命令。 你对那个文件在本地的任何修改都会消失——Git 会用最近提交的版本覆盖掉它。
:::

### 删除文件

[git rm 命令 | 菜鸟教程 (runoob.com)](https://www.runoob.com/git/git-rm.html)

## 远程仓库

### 设置SSH验证

ssh key保存在.ssh目录下，分别是`id_rsa`和`id_rsa.pub`文件，如果有则不需要再次创建。

Windows: C:/Users/username/\.ssh

Linux：~/.ssh

1. 创建SSH KEY

   ```shell
   $ ssh-keygen -t rsa -C "email@example.com"
   # 执行成功后就会在.ssh目录下生成 id_rsa 和 id_rsa.pub 文件
   ```

2. 在github上添加key，头像 > settings > SSH and GPG keys >Add SSH Key，在key的文本框里粘贴id_rsa.pub文件的内容。**github可添加多个key**

### 关联远程仓库

1. 在github创建仓库，记得取消 `Initialize this repository with a README`的勾选。

2. 关联远程仓库。在本地命令：

   ```shell
   # 关联远程仓库，仓库名一般使用origin
   git remote add <仓库名> <远程仓库地址>
   # 例：git remote add origin git@github.com:oulh/test.git
   ```

   **注意**：

   远程仓库地址有两种形式，

   -  `SSH`（使用SSH KEY验证）：`git@github.com:oulh/test.git`；

   - `HTTPS`（账号密码验证）：`https://github.com/oulh/test.git`，

     需要知情的是，github在2021年8月13号宣布不能再使用账号的密码验证，要用Personal access tokens代替密码，设置方式：`用户头像/Settings/Developer settings/Personal access tokens`

   

3. 把本地库的所有内容推送到远程库上

   ```shell
   # 把文件推送到远程仓库
   git push -u <仓库名> <分支名>
   # 第一次用 -u 可建立远程分支和本地分支关联，之后可用简化的“git push”
   # 例：git push -u origin master
   ```

   前提是已经git init初始化仓库，并且git status状态没改动，如果有改动则先git add .添加至缓存区，git commit -m '提交描述'提交至仓库，然后执行上面命令。

> git remote add 可关联多个仓库，要给不同仓库取不一样的仓库名，提交时也要按仓库名称提交到不同的仓库

### 查看已关联的远程仓库

```shell
# 查看远程仓库
git remote -v
```

### 移除远程仓库的关联

```shell
# 删除远程仓库关联
git remote rm <仓库名>
```

### 从远程库克隆项目

```shell
# 从远程库克隆项目
git clone <仓库地址>
```

####  克隆指定分支

```bash
# 克隆指定分支
git clone -b <分支名> <仓库地址>
```

## 分支管理

### 创建分支

```bash
# 创建分支
git checkout -b <分支名>
```

### 查看分支

```bash
# 查看分支
git branch
```

查看分支时，在分支前带 * 号的表示当前的分支

### 切换分支

```bash
# 切换分支
git checkout <分支名>
```

### 合并分支

[Git - 分支的新建与合并 (git-scm.com)](https://git-scm.com/book/zh/v2/Git-分支-分支的新建与合并)

```bash
# 合并本地的分支
git merge <分支名>

# 合并远程的分支
git merge <远程仓库名>/<分支名>
```

**注意**，是将指定分支合并到当前分支，并非当前分支合并到指定分支。

一般情况下是把当前分支切换到**主分支**，然后把**子分支**合并到**主分支**。

### 删除分支

```bash
# 删除分支
git branch -d <分支名>
```

### 修改分支名

```bash
# 修改分支名
git branch -m <原分支名> <新分支名>
```

## 帮助命令

```shell
#帮助命令
git help
```

工具翻译：

```
$ git help
使用：git [--version] [--help] [-C <path>] [-c <name>=<value>]
           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects] [--bare]
           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
           <command> [<args>]

这些是在各种情况下使用的通用Git命令：

start a working area (参见命令: git help tutorial)
   clone      将存储库克隆到新目录中
   init       创建一个空的Git存储库或重新初始化一个现有的存储库

work on the current change (参见命令: git help everyday)
   add        将文件内容添加到索引中
   mv         移动或重命名文件、目录或符号链接
   reset      将当前磁头重置为指定状态
   rm         从工作树和索引中删除文件

examine the history and state (参见命令: git help revisions)
   bisect     使用二分查找查找引入错误的提交
   grep       打印与模式匹配的行
   log        显示提交日志
   show       显示各种类型的对象
   status     显示工作树状态

grow, mark and tweak your common history
   branch     列出、创建或删除分支
   checkout   切换分支或还原工作树文件
   commit     记录对存储库的更改
   diff       显示提交、提交和工作树等之间的更改
   merge      将两个或多个开发历史连接在一起
   rebase     在另一个基本提示之上重新应用提交
   tag        创建、列表、删除或验证用GPG签名的标记对象

collaborate (参见命令: git help workflows)
   fetch      从另一个存储库下载对象和引用
   pull       从另一个存储库或本地分支获取并与之集成
   push       更新远程引用和相关对象

'git help -a' 和 'git help -g' 列出可用的子命令和一些概念指导。
命令'git help <command>' 或 'git help <concept>' 查看特定子命令或概念.
```

## Git文档

> Runoob：[Git 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/git/git-tutorial.html)
>
> git文档：[Git - Book (git-scm.com)](https://git-scm.com/book/zh/v2)

