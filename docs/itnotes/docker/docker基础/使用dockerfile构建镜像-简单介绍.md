---
title: 使用dockerfile构建镜像-简单介绍
---



本例：构建一个包含宿主机某个目录和文件的nginx镜像

> 参考：
> [https://www.runoob.com/docker/docker-dockerfile.html](https://www.runoob.com/docker/docker-dockerfile.html)
> [https://hub.docker.com/_/nginx](https://hub.docker.com/_/nginx)


### 使用 Dockerfile 定制镜像
新建一个Dockerfile 文件，

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603281024535-6ffc54b4-28cb-48f3-9815-b13db750ffb0.png)

并在文件内添加以下内容：

```
FROM nginx
# 可以指定nginx版本
COPY html /usr/share/nginx/html
# COPY <源路径> <目标路径>
```

**COPY**: 复制指令，从上下文目录中复制文件或者目录到容器里指定路径。
**源路径**是以Dockerfile文件所在的目录为参照，不能是绝对路径

### 构建镜像
在 Dockerfile 文件的存放目录下，执行构建动作。
```shell
$ docker build -t some-content-nginx .
```
指令最后一个 `.`是上下文路径，是指Dockerfile 文件所在的目录
### 启动容器
```shell
$ docker run --name some-nginx -d -p 8080:80 some-content-nginx
```


ps：通过该方式复制到镜像的内容是一次性且固定的，如要实时更新静态内容，只要选择`-v`参数以挂载宿主机目录的方式启动容器
```shell
$ docker run --name some-nginx -d -v /root/study/html:/usr/share/nginx/html nginx
# 把宿主机的/root/study/html挂载到容器的/usr/share/nginx/html，路径必须是绝对路径
```

