---
title: Dockerfile构建镜像
---

## Dockerfile简介

> 官方文档：[Dockerfile reference |Docker 文档](https://docs.docker.com/engine/reference/builder/)
>
> <small>发现有的地方在runoob上讲得更通俗易懂：https://www.runoob.com/docker/docker-dockerfile.html</small>

作用：用于构建镜像的一个文本文件。

使用步骤：
构建Dockerfile文件 > 用`docker build`命令构建镜像 > 用`docker run`运行容器

![img](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/30020766174215690279.png)

**Dockerfile文本格式：**

```
# Comment(注释)
INSTRUCTION(指令) arguments(参数)
```

指令

- 不区分大小写，但一般只用大写，为了容易与参数区分
- 必须以 `FROM` 指令开头
- Docker 按顺序运行指令
-  每条指令都会创建一个新的镜像层并对镜像进行提交

**Dockerfile用法**

在大多数情况下，最好从空目录作为上下文开始，并将 Dockerfile 保存在该目录中。仅添加构建 Docker 文件所需的文件。

```shell
 $ docker build .
 # 构建过程做的第一件事是将整个上下文（递归）发送到守护程序。
 # !! 不要将根目录 （） 用作构建上下文，因为这会导致构建将硬盘驱动器的全部内容传输到 Docker 守护程序。
```

**中间镜像**

build构建过程中会陆续生成中间层镜像，直到最后一条指令执行完毕。`docker images -a`可以看到，这些镜像命名为"none:none"，其中包括有效的(和一些子镜像有依赖关系)和无效的。

可以使用以下命令删除无效的 *none* 镜像：

```shell
# 查看是否有无效的 none 镜像
& docker images -f "dangling=true"
# 如果有的话就执行以下删除命令
& docker rmi $(docker images -f "dangling=true" -q)
```

可以在构建镜像过程中强制删除中间镜像：`docker build `命令添加`--force-rm`参数



## 指令选项

| 指令        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| FROM        | 指定基础镜像。                                               |
| RUN         | 镜像构建过程中运行的命令。                                   |
| CMD         | 指定启动容器时默认的命令。                                   |
| ENTRYPOINT  | 指定镜像的默认入口以及运行命令 。                            |
| EXPOSE      | 声明镜像内服务监听的端口，一般而言，此指令只有指导意义，如：SpringBoot 项目的端口是 8080 ，而指定的 EXPOSE 是 8090 ，当然依据 8080 了。 |
| ENV         | 指定环境变量，可以在 docker run 的时候使用 -e 改变。         |
| ADD         | 复制指定的 src 路径下的内容到容器中的 dest 路径下，src 可以为 url 会自动下载，也可以为 tar 文件，会自动解压。 |
| COPY        | 复制本地主机的 src 路径下的内容到镜像中的 dest 路径下，但是不会自动解压等等。 |
| LABEL       | 指定生成镜像的元数据标签信息。                               |
| VOLUME      | 创建数据卷挂载点。                                           |
| USER        | 指定运行容器时的用户名或 UID 。                              |
| WORKDIR     | 配置工作目录，为后续的 RUN、CMD、ENTRYPOINT 指令配置工作目录。 |
| ARG         | 指定镜像内使用的参数（如版本号信息等），可以在 docker build 的时候，使用 --build-args 改变。 |
| OBBUILD     | 配置当创建的镜像作为其他镜像的基础镜像是，所指定的创建操作指令。 |
| STOPSIGNAL  | 容器退出的信号值。                                           |
| HEALTHCHECK | 健康检查。                                                   |
| SHELL       | 指定使用 shell 时的默认 shell 类型。                         |

指令书写顺序建议：

一开始必须指明所基于的镜像名称，接下来推荐说明维护者信息。后面则是镜像操作指令，例如 RUN 指令，RUN 指令将对镜像执行跟随的命令。每运行一条 RUN 指令，镜像添加新的一层，并提交。最后是 CMD 指令，来指定运行容器时的操作命令。

### FROM

-  FROM 指定基础镜像，推荐使用 `alpine` 或 `slim` 之类的基础小镜像。 

-  `scratch` 镜像是一个空镜像，常常用于多阶段构建。 

```dockerfile
FROM [--platform=<platform>] <image> [AS <name>]
Or

FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]
Or

FROM [--platform=<platform>] <image>[@<digest>] [AS <name>]
```

### LABEL

LABEL 用来标注镜像的一些说明信息，常常用来指定维护者的信息。

`LABEL <key>=<value> <key>=<value> <key>=<value> ...`

若要在值中包含空格，请使用引号和反斜杠。

可以选择在单个指令中指定多个标签，方法是以下两种方式之一：

```dockerfile
LABEL multi.label1="value1" multi.label2="value2" other="value3"
或
LABEL multi.label1="value1" \
      multi.label2="value2" \
      other="value3"
```



### WORKDIR

语法格式：`WORKDIR /path/to/workdir`

该指令为它后面的`RUN` `CMD` `ENTRYPOINT` `COPY` `ADD` 指令设置工作目录。如果`WORKDIR`不存在，即使它没有在任何后续指令中使用，它也会被创建。

如果没有指定，默认是`/`。

该指令可多次使用，还可以使用相对于上一个WORKDIR的相对路径。

该`WORKDIR`指令可以解析先前使用 `ENV`设置的环境变量：

```dockerfile
ENV DIRPATH=/path
WORKDIR $DIRPATH/$DIRNAME
RUN pwd
```



### USER

```dockerfile
USER <user>[:<group>]
or
USER <UID>[:<GID>]
```

该`USER`指令设置用户名（或 UID）和可选的用户组（或 GID），以用作当前阶段剩余部分的默认用户和组。指定用户用于`RUN`指令，并在运行时运行相关`ENTRYPOINT`和`CMD`命令。

注意：

- 如果指定的user没有初始的组，则默认使用root组。

- 在Windows上需要先创建用户

  ```dockerfile
  FROM microsoft/windowsservercore
  # Create Windows user in the container
  RUN net user /add patrick
  # Set it for subsequent commands
  USER patrick
  ```

### RUN

每条 RUN 指令将在当前镜像基础上执行指定命令，并提交为新的镜像。当命令较长时可以使用 \ 来换行。

RUN有2种形式：

- shell形式：`RUN <command>` 

  该指令运行在一个shell上，在Linux或Windows上默认是`/bin/sh -c`，`cmd /S /C`

  ```dockerfile
  ...
  RUN command
  # 指定“/bin/sh”以外的其他 shell
  RUN /bin/bash -c command
  ```
  
  可以使用（反斜杠）将单个 RUN 指令继续到下一行，
  
  ```dockerfile
  RUN /bin/bash -c 'source $HOME/.bashrc; \
  echo $HOME'
  # 它们一起等效于这一行：
  RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'
  ```
  
- exec形式：`RUN ["executable", "param1", "param2"]`

  *exec*形式被解析为 JSON 数组，这意味着您必须在单词周围使用双引号 (") 而不是单引号 (')。

  ```dockerfile
  RUN ["/bin/bash", "-c", "echo hello"]
  ```



与*shell*形式不同，*exec*形式不调用shell。这意味着不能正常进行shell处理。例如： `RUN [ "echo", "$HOME" ]`不能输出$HOME变量的值，而是直接输出字符串"$HOME"。如果你想要 shell 处理，那么要么使用*shell*形式，要么直接执行 shell，例如：`RUN [ "sh", "-c", "echo $HOME" ]`



### ARG

格式：`ARG <name>[=<default value>]`

-  ARG 指令定义了一个变量，用户可以在构建的时候使用 `--build-arg name=value` 传递，docker build 命令会将其传递给构建器。 

-  `--build-arg` 指定参数会覆盖 Dockerfile 中指定的同名参数。 

-  如果用户指定了 `未在 Dockerfile 中定义的构建参数` ，则构建会输出 `警告` 。 

-  ARG 只在构建时期有效，运行时期无效。 

-  不建议使用构建时变量来传递注入 github 密码、用户凭据等机密，因为构建时变量的值可以通过 docker history 来观察到。 

-  ARG 变量定义从 Dockerfile 定义的行开始生效。 

-  使用 ENV 指定定义的环境变量始终会覆盖同名的 ARG 指令。



### ENV

格式：`ENV <key>=<value> ...`

-  ENV 和 ARG 很类似，但是 ENV 在构建期和运行期都有效，并且使用 ENV 指定定义的环境变量始终会覆盖同名的 ARG 指令。 

-  可以使用 `docker run --env <key>=<value>` 修改 ENV 定义的环境变量。 

若值包含空格，则要使用双引号""或反斜杠\

```dockerfile
ENV MY_NAME="John Doe"
ENV MY_DOG=Rex\ The\ Dog
ENV MY_CAT=fluffy
```

允许一次设置多个变量，以空格分隔；若换行书写，需要加反斜杠\

```dockerfile
ENV MY_NAME="John Doe"	MY_DOG=Rex\ The\ Dog \
	MY_CAT=fluffy
```

当容器从生成的图像运行时，使用ENV设置的环境变量将保持不变。可以使用`docker inspect`查看值，可以使用`docker run --env <key>=<value>`更改它们。

### ADD

两种形式：

```dockerfile
ADD [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
# 如果路径中包含空格，要使用第二种形式
```

从 src 指定的路径或url复制文件、目录到镜像的 dest 路径中。

dest 可以是绝对路径或相对`WORKDIR`的相对路径。

**注意规则：**

- `<src>`路径必须在构建目录里，不能使用`../xxx/` `../../xxx`这种形式
- 如果`<dest>`不存在，它会连同其路径中所有缺失的目录一起创建。
- 如果`<dest>`不以`/`结尾，则将其视为常规文件，把`<src>`所指文件写入`<dest>`文件中
- 如果`<dest>`以斜杠`/`结尾，则将其视为目录，把文件复制为`<dest>/<filename>`
- 如果`<src>`是目录，不管`<dest>`是不是以`/`结尾，复制`<src>`下的全部内容到`<dest>`目录下，包括文件系统元数据。注意：目录本身没有被复制，只是它的内容。
- 如果指定了多个`<src>`，或使用通配符'*''?'指定了多个资源，则`<dest>`必须是目录，且书写以`/`结尾
- 如果`<src>`是可识别压缩格式（identity、gzip、bzip2 或 xz）的*本地*tar 存档，则自动将其解压缩为目录。而URL资源不会被自动解压。

### COPY

```dockerfile
COPY [--chown=<user>:<group>] <src>... <dest>
COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

COPY 和 ADD 类似，区别是，COPY不支持自动解压归档文件，以及指定远程URL。

### EXPOSE

告诉Docker在容器在运行时要侦听的网络端口。可以指定端口监听 TCP 还是 UDP，如果不指定协议，则默认为 TCP。

`EXPOSE <port> [<port>/<protocol>...]`

```dockerfile
# 指定多个端口
EXPOSE 80 443 8080
#指定协议
EXPOSE 80/udp
EXPOSE 80/udp 443
# 一个端口指定多个协议
EXPOSE 80/tcp
EXPOSE 80/udp
```

EXPOSE指令只是声明了端口，并不会映射端口，目的是帮助镜像使用者理解这个镜像服务的守护端口，以方便配置映射。如果要在容器运行时映射端口，仍要使用`docker run -p`或`docker run -P`。

-p和-P的差别就是：`-p`要指定容器端口和宿主机的[ip]端口，`-P`会映射容器所有EXPOSED的端口到随机的宿主机端口。



### VOLUME

`VOLUME`指令创建具有指定名称的挂载点。如果在启动容器时忘记挂载数据卷，会自动挂载到匿名卷。也可以在启动容器时挂载来自主机或其他容器的目录。

```dockerfile
# JSON数组形式，要用双引号，不能用单引号
VOLUME ["/var/log/"]
# 纯字符串
VOLUME /var/log
# 多个参数
VOLUME /var/log /var/db
```

注意事项：

- 基于Windows的容器，只能指定`C:`盘以外的且不存在或空的目录。
- 如果任何构建步骤在声明卷后更改了卷中的数据，则这些更改将被丢弃。
- 为了保证镜像的可移植性，VOLUME指令无法在Dockerfile中指定主机挂载目录，必须在创建或运行容器时指定挂载目录。



用`docker inspect  ` 查看挂载情况（Dockerfile中声明了VOLUME的参数为"/var/log"）

```json
//启动容器时指定了挂载卷 -v /home/leo/temp/docker:/var/log
"Mounts": [
    {
        "Type": "bind",
        "Source": "/home/leo/temp/docker",
        "Destination": "/var/log",
        "Mode": "",
        "RW": true,
        "Propagation": "rprivate"
    }
],

//启动容器时未指定挂载卷
"Mounts": [
    {
        "Type": "volume",
        "Name": "f81bb2c0581a5fc07b37b32798a6a379563b394eb1ad290cf99fc2e301b4e2eb",
        "Source": "/var/lib/docker/volumes/f81bb2c0581a5fc07b37b32798a6a379563b394eb1ad290cf99fc2e301b4e2eb/_data",
        "Destination": "/var/log",
        "Driver": "local",
        "Mode": "",
        "RW": true,
        "Propagation": ""
    }
],
```



### CMD

类似于 RUN 指令，用于运行程序，但二者运行的时间点不同:

- CMD 在docker run 时运行。
- RUN 是在 docker build。

**作用**：为启动的容器指定默认要运行的程序，程序运行结束，容器也就结束。CMD 指令指定的程序可被 docker run 命令行参数中指定要运行的程序所覆盖。

**注意**：如果 Dockerfile 中如果存在多个 CMD 指令，仅最后一个生效。

格式：

```dockerfile
CMD <shell 命令> 
CMD ["<可执行文件或命令>","<param1>","<param2>",...] 
CMD ["<param1>","<param2>",...]  # 该写法是为 ENTRYPOINT 指令指定的程序提供默认参数
```

推荐使用第二种格式，执行过程比较明确。第一种格式实际上在运行的过程中也会自动转换成第二种格式运行，并且默认可执行文件是 sh。

### ENTRYPOINT

类似于 CMD 指令，但其不会被 docker run 的命令行参数指定的指令所覆盖，而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序。

但是, 如果运行 docker run 时使用了 --entrypoint 选项，将覆盖 ENTRYPOINT 指令指定的程序。

**优点**：在执行 docker run 的时候可以指定 ENTRYPOINT 运行所需的参数。

**注意**：如果 Dockerfile 中如果存在多个 ENTRYPOINT 指令，仅最后一个生效。

格式：

```dockerfile
ENTRYPOINT ["<executeable>","<param1>","<param2>",...]
```

可以搭配 CMD 命令使用：一般是变参才会使用 CMD ，这里的 CMD 等于是在给 ENTRYPOINT 传参，以下示例会提到。

示例：

假设已通过 Dockerfile 构建了 nginx:test 镜像：

```dockerfile
FROM nginx

ENTRYPOINT ["nginx", "-c"] # 定参
CMD ["/etc/nginx/nginx.conf"] # 变参 
```

1、不传参运行

```shell
$ docker run  nginx:test
```

容器内会默认运行以下命令，启动主进程。

```shell
nginx -c /etc/nginx/nginx.conf
```

2、传参运行

```shell
$ docker run  nginx:test -c /etc/nginx/new.conf
```

容器内会默认运行以下命令，启动主进程(/etc/nginx/new.conf:假设容器内已有此文件)

```shell
nginx -c /etc/nginx/new.conf
```



## build命令

https://www.runoob.com/docker/docker-build-command.html



## 多阶段构建

> 官网文档：https://docs.docker.com/develop/develop-images/multistage-build/

很多情况下，需要一个镜像用于开发，一个镜像用于生产，但维护多个Dockerfile并不理想。我们最终只是需要用于生产的应用和运行所需的文件。

用多阶段构建（multistage-build）可大大简化这个过程。

在 Dockerfile 中使用多个`FROM`语句，使用不同的基础镜像来实现不同阶段的构建，可以从上一个构建阶段得到的内容复制到下一个阶段使用，最后只保留我们需要的东西。

通过这样的Dockerfile构建，最终能得到基于最后一个`FROM`的镜像。

例(官网文档)：

```dockerfile
# syntax=docker/dockerfile:1
FROM golang:1.16
WORKDIR /go/src/github.com/alexellis/href-counter/
RUN go get -d -v golang.org/x/net/html  
COPY app.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=0 /go/src/github.com/alexellis/href-counter/app ./
CMD ["./app"]  
```

- 阶段命名和引用

  ```dockerfile
  FROM xxx AS <name>
  # eg: 
  FROM golang:1.16 AS builder
  ```

  命名后，可以在后续阶段通过命名来引用前面的阶段。

  ```dockerfile
  COPY --from=builder <src> <dest>
  ```

  命名之前，要通过整数来引用，从0开始，第一条FROM为0，一次类推

  ```dockerfile
  COPY --from=0 <src> <dest>
  ```

- 在build时指定目标构建阶段

  ```shell
   $ docker build --target builder -t alexellis2/href-counter:latest .
  ```

- 使用前一个阶段作为新阶段：

  ```dockerfile
  # syntax=docker/dockerfile:1
  FROM alpine:latest AS builder
  RUN apk --no-cache add build-base
  
  FROM builder AS build1
  COPY source1.cpp source.cpp
  RUN g++ -o /binary source.cpp
  
  FROM builder AS build2
  COPY source2.cpp source.cpp
  RUN g++ -o /binary source.cpp
  ```

- 部镜像中复制东西

  使用`COPY --from`指令从单独的镜像中复制，可以使用本地镜像名称、本地或 Docker 注册表上可用的标签，或标签 ID

  ```dockerfile
  COPY --from=nginx:latest /etc/nginx/nginx.conf /nginx.conf
  ```





------

[编写 Dockerfile 的最佳实践（英文）](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)



摘取几个简单好理解的可以瘦身镜像的建议：

1. 选择最小的基础镜像，如基于alpine的，slim过的。

2. 减少生成的镜像层，如合并 RUN 指令中的命令

3. 使用 .dockerignore 文件，排除上下文中无需参与构建的资源。

4. 合理使用多阶段构建。

   ......
