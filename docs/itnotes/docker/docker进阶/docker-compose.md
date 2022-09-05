---
title: Docker Compose
sidebar_position: 4
---

相关文档：



> 官网文档
>
> compose：[Get started with Docker Compose ](https://docs.docker.com/compose/gettingstarted/)
>
> compose文档撰写：[Compose file reference](https://docs.docker.com/compose/compose-file/)
>
> docker compose命令：[full list of Compose commands](https://docs.docker.com/engine/reference/commandline/compose/)
>
> 其他
>
> [Docker Compose | 菜鸟教程 (runoob.com)](https://m.runoob.com/docker/docker-compose.html)
>
> [Docker Compose | coonote](https://www.coonote.com/docker/docker-compose-project.html)（包含Compose命令说明和yaml文件配置选项）

## 概述

Compose可以通过一个模板YAML文件定义一组相关联的应用容器（可看作一个 project）。

三个关键要素：

- docker-compose.yml ：定义service和project的相关信息
- service：一个个应用容器实例
- project：一个项目可以由多个服务（容器）关联而成

Compose使用步骤：

1. 

1. 创建一个project目录，用于存放应用程序所需的文件、Dockerfile、docker-compose.yml等
2. 使用 Dockerfile 定义应用程序运行的环境
3. 使用 docker-compose.yml 定义应用程序需要的各个服务
4. 执行 docker-compose up 命令来启动并运行整个应用程序

一个来自官网的简单入门案例：[https://docs.docker.com/compose/gettingstarted/](https://docs.docker.com/compose/gettingstarted/)

## 安装卸载

版本发布页：[https://github.com/docker/compose/releases](https://github.com/docker/compose/releases)

github太慢了，已替换成道客云的链接：

```shell
$ sudo curl -L https://get.daocloud.io/docker/compose/releases/download/\
v2.7.0/docker-compose-`uname -s`-`uname -m` \
-o /usr/local/bin/docker-compose
```

给予可执行权限：

```shell
$ sudo chmod +x /usr/local/bin/docker-compose
```

测试安装：

```shell
[leo@CentOS7 ~]$docker-compose version
Docker Compose version v2.7.0
```

如果安装后`docker-compose`命令失败，请检查路径。也可以选择在`/usr/bin`路径中创建指向docker-compose文件的符号链接。例如：

```shell
$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

**卸载docker-compose**

```shell
# 二进制包方式安装的，删除二进制文件即可
rm /usr/local/bin/docker-compose
```

