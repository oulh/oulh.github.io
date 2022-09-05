---
title: docker网络
sidebar_position: 2 
---



docker network 可使容器间互相通信。

容器之间可以使用`网络别名`直接通信，可避免ip变化的影响。

```shell
[leo@CentOS7 ~]$docker network create webservice
b099067fea347f8f710e0c4cc10ad1e63fc65694e46b714557f8cd0336453fef
[leo@CentOS7 ~]$
[leo@CentOS7 ~]$docker network connect --alias nginxproxy webservice nginxproxy
[leo@CentOS7 ~]$docker network connect --alias jenkins webservice jenkins
[leo@CentOS7 ~]$docker network connect --alias nginx-oulh webservice nginx-oulh
```

```shell
/etc/nginx/conf.d # ping nginx-oulh
PING nginx-oulh (172.18.0.4): 56 data bytes
64 bytes from 172.18.0.4: seq=0 ttl=64 time=0.075 ms
64 bytes from 172.18.0.4: seq=1 ttl=64 time=0.076 ms
^C
--- nginx-oulh ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.075/0.075/0.076 ms
/etc/nginx/conf.d # ping jenkins
PING jenkins (172.18.0.3): 56 data bytes
64 bytes from 172.18.0.3: seq=0 ttl=64 time=0.078 ms
64 bytes from 172.18.0.3: seq=1 ttl=64 time=0.086 ms
^C
--- jenkins ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.078/0.082/0.086 ms
```

## docker network 常用命令

```shell
$ docker network --help
$ docker network ls
$ docker network inspect xxx
$ docker network create xxx
$ docker network rm xxx
```



## docker network 模式

docker 默认自带了3个网络，名称是bridge、host、none，分别是 bridge、host、null 模式

```shell
[leo@CentOS7 env-arg]$docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
26707d71f1c3        bridge              bridge              local
bab48e02a0d5        host                host                local
1ae9b70cf00c        none                null                local
```

新建的容器如果不指定网络，将默认是bridge(Name)。`docker inspect 容器 ` 会有记录

- 桥接模式：`bridge`

  从宿主机虚拟出一个网卡，在宿主机内用 `ip addr` 或 `ifconfig` 可查看到，标识符为`docker 0` 的就是对应 bridge(Name) 这个网络的。每新增一个bridge型网络，就多一个虚拟网卡。

- 主机模式：`host`

  直接使用宿主机网卡（`eth0` 或其他），共用真实的ip和端口。

- 禁用网络：`null`

  该网络下的容器只有127.0.0.1本地回环网络。

另外还有一个`container`模式，可以使新容器和现有容器共享一个网络。容器的文件系统还是独立的。

