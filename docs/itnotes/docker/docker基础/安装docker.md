---
title: 安装docker
sidebar_position: 1
---



参考文档

docker官方：[https://docs.docker.com/install/linux/docker-ce/ubuntu/](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

runoob：[https://www.runoob.com/docker/ubuntu-docker-install.html](https://www.runoob.com/docker/ubuntu-docker-install.html)（从官方文档翻译来的）

官方文档用的是docker官方的源，可能会比较慢。

以下基于**ubuntu**系统，使用国内的源来安装docker

## 设置仓库

1. 更新 apt 包索引。
```shell
$ sudo apt-get update
```

2. 安装 apt 依赖包，用于通过HTTPS来获取仓库:
```shell
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

3. 添加GPG密钥
```shell
$ curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -
```

4. 写入docker stable版本的阿里云镜像软件源
```shell
$ sudo add-apt-repository \
   "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu \
    $(lsb_release -cs) \
    stable"
```

其他docker源：
> 阿里云：[https://mirrors.aliyun.com/docker-ce/](https://mirrors.aliyun.com/docker-ce/)
> 腾讯云：[https://mirrors.cloud.tencent.com/docker-ce/](https://mirrors.cloud.tencent.com/docker-ce/)
> 中科大：[http://mirrors.ustc.edu.cn/docker-ce/](http://mirrors.ustc.edu.cn/docker-ce/)

 

## 安装 Docker Engine-Community
更新 apt 包索引。
```shell
$ sudo apt-get update
```
安装最新版本的 Docker Engine-Community 和 containerd
```shell
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```
允许开机自启
```shell
$ sudo systemctl enable docker //允许开机自启
```

 测试 Docker 是否安装成功，输入以下指令，打印出以下信息则安装成功:
```shell
$ sudo docker run hello-world

Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
1b930d010525: Pull complete                                                                                                                                  Digest: sha256:c3b4ada4687bbaa170745b3e4dd8ac3f194ca95b2d0518b417fb47e5879d9b5f
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
......
```

### 查看docker版本信息
Client 和 Server 的版本信息都正常显示的话说明docker守护进程正常运行
```shell
$ docker version
```



## docker配置镜像源加速器

> 安装完docker后，拉取镜像默认用的是docker官方镜像源，所以换一个国内较快的源

使用阿里云docker镜像加速器

1. 打开并登陆  [https://cr.console.aliyun.com/cn-shenzhen/instances/mirrors](https://cr.console.aliyun.com/cn-shenzhen/instances/mirrors)，获取加速器地址

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603285124175-94147790-7c68-4b64-ba90-0a2692592c34.png)



```shell
$ sudo mkdir -p /etc/docker
$ sudo tee /etc/docker/daemon.json <<-'EOF' 
{
   "registry-mirrors": ["你的阿里云镜像加速器地址"] 
} 
EOF
```

2. 重启服务

```shell
$ sudo systemctl daemon-reload 
$ sudo systemctl restart docker
```

3. 如果还是拉取不到镜像就再换一个加速地址

如: 

> 网易：{ "registry-mirrors": ["http://hub-mirror.c.163.com"] }
> 腾讯：{"registry-mirrors": ["https://mirror.ccs.tencentyun.com"]}


修改/etc/docker/daemon.json文件

```json
{
   "registry-mirrors": ["镜像加速地址"] 
}
```

