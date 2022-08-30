---
title: docker配置镜像源加速器
---



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

