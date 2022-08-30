---
title: 基于ECS快速搭建Docker环境
date: 2020-10-21
---

## 基于ECS快速搭建Docker环境

### 安装Docker CE
Docker有两个分支版本：Docker CE和Docker EE，即社区版和企业版。本教程基于CentOS 7安装Docker CE。

1. 安装Docker的依赖库。
```
yum install -y yum-utils device-mapper-persistent-data lvm2
```

2. 添加Docker CE的软件源信息。
```
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

3. 安装Docker CE。
```shell
yum makecache fast
yum -y install docker-ce
```

4. 启动Docker服务。
```
systemctl start docker
```
### 配置阿里云镜像仓库（镜像加速）

1. 获取加速地址

阿里云控制台 > 【容器镜像服务】>【镜像中心】 > 【镜像加速器】

2. 配置Docker的自定义镜像仓库地址

请将下面命令中的镜像仓库地址`[https://kqh8****.mirror.aliyuncs.com](https://kqh8****.mirror.aliyuncs.com)`替换为阿里云为您提供的专属镜像加速地址
```
tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://kqh8****.mirror.aliyuncs.com"]
}
EOF
```

4. 重新加载服务配置文件。
```
systemctl daemon-reload
```

5. 重启Docker服务。
```
systemctl restart docker
```
### 使用Docker安装Nginx服务

1. 查看Docker镜像仓库中Nginx的可用版本。
```
docker search nginx
```

2. 拉取最新版的Nginx镜像。
```
docker pull nginx:latest
```

3. 查看本地镜像。
```
docker images
```

4. 运行容器。
```
docker run --name nginx-test -p 8080:80 -d nginx
```
命令参数说明：

- --name nginx-test：容器名称。
- -p 8080:80： 端口进行映射，将本地8080端口映射到容器内部的80端口。
- -d nginx： 设置容器在后台一直运行。
5. 在浏览器地址栏输入`http://<ECS公网地址>:8080`访问Nginx服务。
