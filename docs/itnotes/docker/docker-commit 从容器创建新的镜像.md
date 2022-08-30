---
title: docker commit 从容器创建新的镜像
---



##### 语法

```shell
$ docker commit [OPTIONS] <CONTAINER ID> [REPOSITORY[:TAG]]
```
OPTIONS说明：

- **-a :**提交的镜像作者；
- **-c :**使用Dockerfile指令来创建镜像；
- **-m :**提交时的说明文字；
- **-p :**在commit时，将容器暂停。

##### 实例
```shell
$ docker commit -a "leo" -m "add-ssh" a404c6c174a2  python/ssh:v2
```
![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603295240020-c6171635-9928-4a1f-9e6e-383ee43dd6a6.png)

##### 问：用容器创建的新镜像再创建容器
现存一个容器，它当时的创建命令是：`docker run --name syncplayer -itd -p 3399:8999 debian:10.11 /bin/bash`
> [15:31:15 root@VM-8-17-centos ~]#docker ps
> CONTAINER ID    NAMES       IMAGE               COMMAND        CREATED         STATUS              PORTS              a4dd593697ca    syncplayer   71d646d8e086     "/bin/bash"      2 days ago      Up 22 hours      0.0.0.0:3399->8999/tcp                        


现在从这个容器创建一个新的镜像，镜像名为debian-syncplay-server
`docker commit a4dd593697ca debian-syncplay-server:1.69`
> [15:31:15 root@VM-8-17-centos ~]#docker images
> REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
> debian-syncplay-server   1.69                80b532bc90e5        28 hours ago        233MB


用这个镜像再创建容器，要用什么命令参数呢？

1. 如果需要shell交互，不用再加`/bin/bash`（如果是从快照创建的镜像，还是要加/bin/bash）
1. 如果需要端口映射，需要重新加 -p 端口映射，不然只显示`8999/tcp`
1. 还是得要有-i 或 -t其中一个，不然容器无法启动
