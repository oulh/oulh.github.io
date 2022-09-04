---
title: docker镜像库
sidebar_position: 2.1
---



现有一镜像，REPOSITORY(仓库名)：debian-syncplay-server，TAG(版本)：1.69，IMAGE ID(镜像id)：

80b532bc90e5

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1647945221019-3a1440c0-55ab-4f2c-86c0-8e3283e2c878.png)

## 上传到DockerHub

注册账号：hub.docker.com
#### 在linux上登陆账号
> docker login --username=username

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1647940087679-9dc3611f-9d96-4628-862c-11de61e661c0.png) 
#### 上传镜像到hub仓库

1. 镜像的仓库名(REPOSITORY)要与dockerhub用户名对应，即dockerhub名/xxxxxx，不对应就要打tag

docker tag：
> [18:59:12 root@VM-8-17-centos ~]#docker tag
> "docker tag" requires exactly 2 arguments.
> See 'docker tag --help'.
> Usage:  **docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]**
> Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE


```shell
docker tag ImageID dockerhub用户名/xxxxxx:TAG
# xxxxxx可以自定义，但dockerhub用户名一定要和自己的一致
# 不加版本号的话默认是latest
```
![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1647946489471-89624046-dee2-43dd-a340-0017dffd0642.png)

注意它们的IMAGE ID 是一样的，要删掉tag镜像就用docker rmi REPOSITORY:TAG

2. push镜像到镜像库
```shell
docker push oulh/debian-syncplay-server:1.69
```
![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1647952778211-14eed745-2853-4216-9847-20202fdc2718.png)
## 上传到阿里云
到阿里云开通容器镜像托管服务，开通时要设置一个服务密码(可以修改)
#### 登陆
登录用户名为阿里云账号名（不是账号ID），密码为开通服务时设置的密码，最后加上容器镜像服务实例的网络地址
> docker login --username 阿里云账号名 registry.cn-shenzhen.aliyuncs.com

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1647948271045-6fe19581-d166-4bb2-9a08-6ab8c729bb0b.png)

ps：登陆用公网地址。上传镜像时，如果服务器和容器镜像服务实例在同一地域(比如华南-深圳)，用专有网络地址速度快，不用扣公网流量


#### 上传镜像 
上传镜像的步骤和dockerhub的一样，不一样的地方是，`dockerhub用户名`相当于`阿里云容器镜像服务实例地址/空间名`

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1647944092404-c9986b24-3756-45fa-a2f6-449d7b7378f7.png)

登陆阿里账号查看：[https://cr.console.aliyun.com/cn-shenzhen/instance/repositories](https://cr.console.aliyun.com/cn-shenzhen/instance/repositories)

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1647944299931-8d3a2edd-e769-4b3f-a9c7-cc2113bba918.png)
