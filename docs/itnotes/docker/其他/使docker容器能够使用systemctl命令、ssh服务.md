---
title: 使docker容器能够使用systemctl命令、ssh服务
---



> 刚开始捣鼓docker的时候折腾了这个，觉得没啥实用，反而可能增加容器的安全风险

systemctl命令对于容器来说也许不起什么作用，但实验中需要用到时，用简单的命令运行容器无法使用systemctl命令，想要使用ssh登录容器也失败了。经过网上查阅和多次试验，总结出两个比较有效的方法，一是运行容器时加上--privileged  和 /usr/sbin/init，二是使用dockerfile构建可行的镜像。

## 方法一
#### docker run 加上--privileged  和 /usr/sbin/init（如果是ubuntu主机，则是/sbin/init）

这是个直接方便的方法，但是有一定的隐患：
> 1. --privileged是用于创建特权容器的，使用/usr/sbin/init启动容器并加上--privileged参数，相当于docker容器获得了宿主机的全权委托权限。这时docker容器内部的init与宿主机的init产生了混淆。
> 1. 会偶然出现一个名为agetty的进程一直持续100%占用cpu时间


1. 启动容器
```shell
$ docker run --name centos7-systemctl -p 31311:22 -itd centos:7 /usr/sbin/init
```
现在该容器可以使用systemctl命令了
```shell
$ docker exec -it centos7-systemd /bin/bash
$ systemctl
```
想要ssh连接容器的话，运行容器时加上端口映射，然后进入容器安装openssh-server就行了

`-p 31311:22` ：主机的31311端口，容器的22端口


2. 关于agetty进程

我也不清楚这个进程是怎么回事，它不会在刚运行容器的时候出现，我也是在容器运行过程中偶然发现的。

agetty进程出现后，即使停止容器也无法停掉agetty进程，要使用以下命令关掉和屏蔽agetty进程。

```shell
# 可以通过在宿主机和容器中执行以下命令将agetty关闭。
$ systemctl stop getty@tty1.service
$ systemctl mask getty@tty1.service
```

## 方法二
#### 通过dockerfile构建可以使用systemd的镜像
参考 [https://github.com/docker-library/docs/tree/master/centos#Systemd-integration](https://github.com/docker-library/docs/tree/master/centos#Systemd-integration)

引用文中的一段话：

> 现在，centos：7和centos：latest基本容器中都包含Systemd，但默认情况下它不处于活动状态。为了使用systemd，您将需要包含类似于以下示例Dockerfile的文本：


1. 创建dockerfile文件，写入一下内容
> FROM centos:7
> ENV container docker
> RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == \
> systemd-tmpfiles-setup.service ] || rm -f $i; done); \
> rm -f /lib/systemd/system/multi-user.target.wants/*;\
> rm -f /etc/systemd/system/*.wants/*;\
> rm -f /lib/systemd/system/local-fs.target.wants/*; \
> rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
> rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
> rm -f /lib/systemd/system/basic.target.wants/*;\
> rm -f /lib/systemd/system/anaconda.target.wants/*;
> VOLUME [ "/sys/fs/cgroup" ]
> CMD ["/usr/sbin/init"]

2. 构建镜像
```shell
# 在dockerfile所在目录下
$ docker build --rm -t local/centos7-systemd .
```

3.  运行可以使用systemd的容器

In order to run a container with systemd, you will need to mount the cgroups volumes from the host. （为了运行带有systemd工具的容器，需要从主机上挂载cgroups卷）
```shell
$ docker run --name centos7-systemd -ti -v /tmp/$(mktemp -d):/run -v /sys/fs/cgroup:/sys/fs/cgroup:ro -p 31310:22 local/centos7-systemd
```
This container is running with systemd in a limited context, with the cgroups filesystem mounted. There have been reports that if you're using an Ubuntu host, you will need to add `-v /tmp/$(mktemp -d):/run` in addition to the cgroups mount.

这里提到如果使用的是ubuntu主机，需要加`-v /tmp/$(mktemp -d):/run` ，但我的宿主机是centos7.6，也要加

上这个参数才成功。

docker run 运行结果：

> [root@aoliao ~]# docker run --name centos7-systemd -ti -v /tmp/$(mktemp -d):/run -v /sys/fs/cgroup:/sys/fs/cgroup:ral/centos7-systemd
> systemd 219 running in system mode. (+PAM +AUDIT +SELINUX +IMA -APPARMOR +SMACK +SYSVINIT +UTMP +LIBCRYPTSETUP +GCR+XZ +LZ4 -SECCOMP +BLKID +ELFUTILS +KMOD +IDN)
> Detected virtualization docker.
> Detected architecture x86-64.

> Welcome to CentOS Linux 7 (Core)!

> Set hostname to <780d9f1ec5ed>.

> Initializing machine ID from random generator.

> [  OK  ] Reached target Swap.

> [  OK  ] Created slice Root Slice.

> [  OK  ] Created slice System Slice.

> [  OK  ] Reached target Slices.

> [  OK  ] Listening on Journal Socket.

> [  OK  ] Reached target Local File Systems.

> [  OK  ] Reached target Paths.

> [  OK  ] Listening on Delayed Shutdown Socket.

>          Starting Create Volatile Files and Directories...

>          Starting Journal Service...

> [  OK  ] Started Create Volatile Files and Directories.

> [ INFO ] Update UTMP about System Boot/Shutdown is not active.

> [DEPEND] Dependency failed for Update UTMP about System Runlevel Changes.

> Job systemd-update-utmp-runlevel.service/start failed with result 'dependency'.

> [  OK  ] Started Journal Service.

> [  OK  ] Reached target System Initialization.

> [  OK  ] Listening on D-Bus System Message Bus Socket.

> [  OK  ] Reached target Sockets.

> [  OK  ] Started Daily Cleanup of Temporary Directories.

> [  OK  ] Reached target Timers.

> [  OK  ] Reached target Basic System.

> [  OK  ] Reached target Multi-User System.


4. 进入容器测试
```shell
$ docker exec -it centos7-systemd /bin/bash
$ systemctl
```

