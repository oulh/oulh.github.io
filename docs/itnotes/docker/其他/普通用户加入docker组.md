---
title: 普通用户加入docker组
---



> 加入docker组后无需sudo执行docker命令



## Ubuntu


1. 查看是否存在docker组，没有就添加一个
```shell
$ cat /etc/group |grep docker 
$ sudo groupadd docker
```
2. 把当前用户加入docker用户组
```shell
$ sudo gpasswd -a ${USER} docker
```
3. 重启docker
```shell
$ sudo service docker restart
```
4. 切换当前会话到新 group
```shell
$ newgrp - docker
```

例：
```shell
leo@ubt-ou:~$ cat /etc/group |grep docker  //查看是否存在docker组 
docker:x:129: //有显示说明已存在docker组 
leo@ubt-ou:~$ sudo gpasswd -a ${USER} docker  //把当前用户加入docker用户组 
正在将用户“leo”加入到“docker”组中 
leo@ubt-ou:~$ sudo service docker restart  //重启docker 
leo@ubt-ou:~$ newgrp - docker  //切换当前会话到新 group
```

## Centos

1.查看是否存在docker组，没有就添加一个
```shell
$ cat /etc/group |grep docker sudo groupadd -g 999 docker  //-g 999 为组ID，也可以不指定
```
2.把当前用户加入docker用户组
```shell
$ sudo gpasswd -a ${USER} docker
```
3.重启docker-daemon
```shell
$ sudo systemctl restart docker
```
4.执行docker命令如“docker info” ，如果提示get ...... dial unix /var/run/docker.sock权限不够，则修改/var/run/docker.sock权限
```shell
$ sudo chmod a+rw /var/run/docker.sock
```

