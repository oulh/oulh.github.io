---
title: docker容器
sidebar_position: 3
---

## 查看容器

```shell
# 查看正在运行的容器
$ docker ps
# 查看所有容器
$ docker ps -a
```

## 启动容器
```shell
# 启动一个新的容器
$ docker run --name 容器名 [-itd] 镜像ID(或镜像名) [/bin/bash]
# 启动已停止的容器
$ docker start 容器ID或容器名
# 重启容器
$ docker restart 容器ID或容器名
# 停止容器
$ docker stop 容器ID或容器名
```
可选择的参数：

- **-t:** 终端。
- **-i:** 交互式操作。
- **-d: **后台运行
- **/bin/bash** 交互式 Shell
- 其他参数

### -p 端口映射
```shell
$ docker run --name 容器名 -itd -p 2222:22 -p 8888:80 镜像ID或镜像名 /bin/bash
```
可以写多组端口映射
也可以这样：` -p 3000-4000：3000-4000`

**如果要修改或增加映射端口**，可以这么做：

- 先把当前容器提交为新的镜像，
- 再从新镜像启动一个新的容器，
- 删除原来的容器

### -v 挂载宿主机目录
将宿主机目录挂载到容器目录下: `-v 宿主机目录:容器目录`
```shell
$ docker run --name some-nginx -v /some/content:/usr/share/nginx/html:ro -d nginx
```
注意：必须为绝对路径


## 进入正在后台运行的容器

在使用 **-d** 参数时，容器启动后会进入后台。此时想要进入容器，可以通过以下指令进入：
```shell
$ docker attach 容器ID(或容器名)
$ docker exec -it 容器ID(容器名) /bin/bash
```
推荐使用 docker exec 命令，因为此退出容器终端，不会导致容器的停止。

要退出终端，直接输入 **exit**:
```shell
root@ed09e4490c57:/# exit
```

## 删除容器
```shell
$ docker rm -f 容器名或容器ID
```
**
## 查询容器的IP地址
```shell
1. 使用命令
$ docker inspect 容器ID
2.过虑出 IPAddress
$ docker inspect 容器ID | grep IPAddress
```

## 容器快照

```shell
#导出容器快照：
$ docker export 1e560fca3906 > ubuntu.tar
导入容器快照：
$ cat docker/ubuntu.tar | docker import - test/ubuntu:v1
从快照文件ubuntu.tar 创建新的镜像 test/ubuntu:v1
```




> $ docker 查看Docker 客户端的所有命令选项
> $ docker command --help  深入的了解指定的 Docker 命令使用方法

