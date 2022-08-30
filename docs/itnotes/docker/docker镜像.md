---
title: docker镜像
---



官方开源镜像仓库网站：[hub.docker.com](hub.docker.com)

#### 查看已拉取的docker镜像
```shell
$ docker images
```

- REPOSITORY：表示镜像的仓库源
- TAG：镜像的标签
- IMAGE ID：镜像ID
- CREATED：镜像创建时间
- SIZE：镜像大小
> docker images命令显示的镜像大小信息只是逻辑上的大小信息，因为一个镜像是由多个镜像层（layer）组成的，而相同的镜像层本地只会存储一份，所以，真实情况下，占用的物理存储空间大小，可能会小于逻辑大小。

tips：基于alpine的轻量级镜像的体积都比较小，很多主流服务都有alpine版本，可以在hub.docker.com查找

#### 删除docker镜像
```shell
$ docker rmi <IMAGE ID> <IMAGE ID> ......
# 或<REPOSITORY:TAG>
```
#### 查找镜像
我们可以从 Docker Hub 网站来搜索镜像，Docker Hub 网址为： [**https://hub.docker.com/**](https://hub.docker.com/)
```shell
$ docker search 镜像名
```
#### 拉取镜像
```shell
$ docker pull <REPOSITORY:TAG>
$ docker pull nginx:lastest
$ docker pull nginx # 不写TAG则默认拉取最新版本
$ docker pull nginx:1.18.0
```
#### 从镜像创建并启动一个容器
```shell
$ docker run --name 容器名 <IMAGE ID>(或REPOSITORY:TAG)
# 如果不存在该镜像则会自动拉取
```

#### 设置镜像标签
```shell
$ docker tag 镜像ID REPOSITORY:TAG
```
####  查看镜像详细信息
docker inspect 命令，可以获取镜像的详细信息，其中，包括创建者，各层的数字摘要等。

docker history 命令，可以列出镜像各个层（layer）的创建信息。
