---
title: docker容器随docker重启而自启动
---



如果容器还没启动

```shell
docker run命令加上参数 --restart=always
```

如果已经启动了
```shell
$ docker update --restart=always <CONTAINER ID>
```

