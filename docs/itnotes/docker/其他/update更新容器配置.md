---
title: update更新容器配置
---



本文来自 [https://docs.docker.com/engine/reference/commandline/update/](https://docs.docker.com/engine/reference/commandline/update/)

## 说明
更新一个或多个容器的配置
## 用法
```
docker update [OPTIONS] CONTAINER [CONTAINER...]
```
## 扩展说明
该`docker update`命令动态更新容器配置。您可以使用此命令来防止容器从其Docker主机消耗太多资源。使用单个命令，您可以在单个或多个容器上设置限制。要指定多个容器，请提供以空格分隔的容器名称或ID列表。

With the exception of the `--kernel-memory` option, you can specify these options on a running or a stopped container. On kernel version older than 4.6, you can only update `--kernel-memory` on a stopped container or on a running container with kernel memory initialized.



> **warn：**该`docker update`和`docker container update`命令不支持Windows的容器。


## 参数

| Name, shorthand | Default | Description |
| --- | --- | --- |
| `--blkio-weight` |  | Block IO (relative weight), between 10 and 1000, or 0 to disable (default 0) |
| `--cpu-period` |  | Limit CPU CFS (Completely Fair Scheduler) period |
| `--cpu-quota` |  | Limit CPU CFS (Completely Fair Scheduler) quota |
| `--cpu-rt-period` |  | [**API 1.25+**](https://docs.docker.com/engine/api/v1.25/)
Limit the CPU real-time period in microseconds |
| `--cpu-rt-runtime` |  | [**API 1.25+**](https://docs.docker.com/engine/api/v1.25/)
Limit the CPU real-time runtime in microseconds |
| `--cpu-shares , -c` |  | CPU shares (relative weight) |
| `--cpus` |  | [**API 1.29+**](https://docs.docker.com/engine/api/v1.29/)
Number of CPUs |
| `--cpuset-cpus` |  | CPUs in which to allow execution (0-3, 0,1) |
| `--cpuset-mems` |  | MEMs in which to allow execution (0-3, 0,1) |
| `--kernel-memory` |  | Kernel memory limit |
| `--memory , -m` |  | Memory limit |
| `--memory-reservation` |  | Memory soft limit |
| `--memory-swap` |  | Swap limit equal to memory plus swap: ‘-1’ to enable unlimited swap |
| `--pids-limit` |  | [**API 1.40+**](https://docs.docker.com/engine/api/v1.40/)
Tune container pids limit (set -1 for unlimited) |
| `--restart` |  | Restart policy to apply when a container exits |

## 例子
The following sections illustrate ways to use this command.
### Update a container’s cpu-shares
To limit a container’s cpu-shares to 512, first identify the container name or ID. You can use `docker ps` to find these values. You can also use the ID returned from the `docker run` command. Then, do the following:
```
$ docker update --cpu-shares 512 abebf7571666
```
### Update a container with cpu-shares and memory
To update multiple resource configurations for multiple containers:
```
$ docker update --cpu-shares 512 -m 300M abebf7571666 hopeful_morse
```
### Update a container’s kernel memory constraints
You can update a container’s kernel memory limit using the `--kernel-memory` option. On kernel version older than 4.6, this option can be updated on a running container only if the container was started with `--kernel-memory`. If the container was started _without_ `--kernel-memory` you need to stop the container before updating kernel memory.

For example, if you started a container with this command:

```
$ docker run -dit --name test --kernel-memory 50M ubuntu bash
```
You can update kernel memory while the container is running:
```
$ docker update --kernel-memory 80M test
```
If you started a container _without_ kernel memory initialized:
```
$ docker run -dit --name test2 --memory 300M ubuntu bash
```
Update kernel memory of running container `test2` will fail. You need to stop the container before updating the `--kernel-memory` setting. The next time you start it, the container uses the new value.

Kernel version newer than (include) 4.6 does not have this limitation, you can use `--kernel-memory` the same way as other options.

### Update a container’s restart policy
You can change a container’s restart policy on a running container. The new restart policy takes effect instantly after you run `docker update` on a container.

To update restart policy for one or more containers:

```
$ docker update --restart=on-failure:3 abebf7571666 hopeful_morse
```
Note that if the container is started with “--rm” flag, you cannot update the restart policy for it. The `AutoRemove` and `RestartPolicy` are mutually exclusive for the container.
### Parent command
| Command | Description |
| :--- | :--- |
| [docker](https://docs.docker.com/engine/reference/commandline/docker/) | The base command for the Docker CLI. |

