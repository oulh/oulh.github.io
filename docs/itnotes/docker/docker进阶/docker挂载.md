---
title: docker挂载
sidebar_position: 3
---



挂载宿主机目录到容器挂载点。



`docker inspect 容器` 可查看挂载情况。`docker inspect 镜像 ` 可查看镜像预设的挂载点。

例子，看一个容器挂载情况

显示形式：`卷名/目录/文件:容器挂载点`

```json
"HostConfig": {
            "Binds": [
                "jenkins-data:/var/jenkins_home",
                "/var/run/docker.sock:/var/run/docker.sock",
                "/home/leo/jenkins/home:/home"
            ],
              }
```

```json
"Mounts": [
            {
                "Type": "volume",
                "Name": "jenkins-data",
                "Source": "/var/lib/docker/volumes/jenkins-data/_data",
                "Destination": "/var/jenkins_home",
                "Driver": "local",
                "Mode": "z",
                "RW": true,
                "Propagation": ""
            },
            {
                "Type": "bind",
                "Source": "/var/run/docker.sock",
                "Destination": "/var/run/docker.sock",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            },
            {
                "Type": "bind",
                "Source": "/home/leo/jenkins/home",
                "Destination": "/home",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
```

简单分析：

- 如果指定卷名，如`jenkins-data`，则会默认挂载在 /var/lib/docker/volumes/jenkins-data/_data
- 如果指定目录，则挂载到指定的目录中。
- 如果不指定卷名和目录，则分配一个随机名称xxxxx，位置是 /var/lib/docker/volumes/xxxxx/_data
- 可以挂载文件。通过绑定挂载 docker unix 套接字和静态链接的 docker 二进制文件，可以为容器提供创建和操作主机的 Docker 守护程序的完全访问权限。

## docker 挂载类型

主要由三种，volume、bind、tmpfs，重点是volume和bind。另外还有一种：npipe(仅Windows容器)。

具体说明：[docs.docker.com](https://docs.docker.com/engine/reference/commandline/service_create/#add-bind-mounts-volumes-or-memory-filesystems)

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/aec379310a55b319acc680c9ed544d23cefc1755.png)

- 命名卷挂载 `type=volume`

  由 Docker 创建和管理，默认目录位于` /var/lib/docker/volumes` 。命名卷中的数据可以在容器和主机之间共享，也可以在多个容器之间共享

- 绑定挂载 `type=bind`

  将指定的主机中的目录或文件绑定挂载到容器中。可以是只读的或读写的。

- tmpfs 挂载 `type=tmpfs`

  将一个tmpfs挂载在一个容器内以存储易失性数据。

  tmpfs是一种基于内存的文件系统，存储数据效率会得到一定的提升，但数据是会丢失的。



### docker 源路径和目标路径



**源路径src（主机内）**

- type=volume

  指定卷名时，会创建具名卷，默认目录为`/var/lib/docker/volumes/卷名/_data`；

  若没指定卷名，则会为卷分配一个随机名称，默认目录为`/var/lib/docker/volumes/随机名/_data`。

- type=bind

  指定要绑定挂载的绝对路径的文件或目录。目录不存在会自动创建（`--mount`方式挂载例外，需指定现有host src）。

  不能挂载主机中不存在的文件！

- type=tmpfs ：不支持



**目标路径dest（容器内）**

如果容器的文件系统中不存在该路径，docker 会自动在指定位置创建对应的目录或文件。



**需要注意的是**，type=bind 模式下，源路径和目标路径的覆盖现象。[详](http://t.zoukankan.com/ColdJk-p-14301956.html)

- 目录挂载：不管主机src存不存在，当容器dest路径下存在文件时，都会被主机src清空或覆盖。
- 文件挂载：主机文件内容会覆盖容器文件(存在的话)内容，对同一目录下其他文件无影响。



### 只读和读写

不指定`--readonly`或`ro`的话，默认是`rw`（读写）的。

- `ro` 
  - 文件：不能在容器内修改
  - 目录：不能在容器内修改、新增、删除目录下的文件
- `rw`
  - 文件：容器内可修改，互相同步；但不能在容器中删除文件；
  - 目录：不管是在宿主机还是容器内修改、新增、删除文件，都会相互同步



## docker volume 常用命令

```shell
$ docker volume ls
$ docker volume create
# 卷详情
$ docker volume inspect
$ docker volume rm
# 删除无用卷:未被任何容器引用的本地卷
$ docker volume prune
```

详：[docker volume](https://docs.docker.com/engine/reference/commandline/volume_ls/)



