---
slug: jenkins-docker-github-auto自动构建部署
title: jenkins+docker+github自动构建和部署站点
authors: Leo
tags: [jenkins, docker]
---



关联git项目，只要push就自动构建，部署站点，像腾讯云托管、Clouflare、Netlify、Vercel 等云服务商都有这样的服务。来看看在服务器上怎么实现这个过程。

<!--truncate-->

> 本文操作环境：
>
> - 腾讯云轻量应用服务器
> - docker v18.06
>
> 本文相关：
>
> docker、Jenkins、Github、webhook、nginx、node.js、vuepress
>



## Github 准备

### 创建 Github Personal access tokens

Personal access tokens 是 Github 的用户令牌，可替代用户密码用于账号验证，可自由设置令牌权限和有效期。

在本文中用于 Github 仓库验证以及 Github Server 的验证。

**设置步骤：**

`github 头像 - Settings - Developer settings - Personal access tokens   `

选择 Generate new token

在 权限选择里 勾选 `repo`和`admin:repo hook`

![image-20220824095134774](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824095134774.png)



![image-20220824095239847](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824095239847.png)



底下那串字符就是 access token，只出现一次，必须复制保存

![image-20220824095937405](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824095937405.png)



### webhook 设置

实现自动拉取git仓库的重要步骤，相当于一个触发器，当仓库push的时候，会立刻向jenkins服务器发送通知。

**设置步骤：**

在相应仓库的设置里，找到 `Webhooks` ，Add webhook，填写 Payload URL ，其他选项默认值就行。

Payload URL 可以从 Jenkins [Github服务器设置](#设置-github-server) 的帮助信息中获取，默认一般是`jenkins服务器地址/github-webhook/` 。**最后面一定要加 `/`**

![image-20220824102007871](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824102007871.png)



## Jenkins 准备

本文使用 docker 版的Jenkins，使用的是 Jenkins 社区推荐的镜像：`jenkinsci/blueocean`

### 安装 Jenkins

**创建并启动 Jenkins 容器**

```shell
docker run \
--name jenkins \
-d -u root -p 8080:8080 \
-v jenkins-data:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
-v "$HOME/jenkins/home":/home \
jenkinsci/blueocean
```

**同步容器时间**

该镜像的默认时间与中国大陆不同步，`exec`进入容器去更正一下

```shell
# 进入容器shell
[leo@CentOS7 jenkins]$docker exec -it jenkins bash
# 在容器shell中创建指向上海时间的软链接
bash-5.1# ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

**访问 Jenkins 服务**

默认地址是 `服务器地址:8080`

首次访问需要输入Admin密码，获取方式：

```shell
# 容器shell获取
bash-5.1# cat /var/jenkins_home/secrets/initialAdminPassword
6909873bb98b455xxxxbe0c8a08361ec
# 对应宿主机目录：
/var/lib/docker/volumes/jenkins-data/_data/secrets/initialAdminPassword
```

接着是安装插件，选择 推荐安装 就行；

创建用户；

登陆用户。

### 更新和安装相关插件

**安装 docker 相关插件**

- Docker Commons
- Docker Pipeline

插件管理 - 可选插件 - 搜索

![image-20220824180013467](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824180013467.png)

**更新 Git 相关插件**

Git client plugin 和 Github plugin 是接下来的构建任务必要的插件，现这两个插件发布了警告，还是更新一下吧，以免影响后续步骤。

![image-20220824174052582](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824174052582.png)

在 插件管理 - “可更新” 选项里搜索 “git”，并勾选，点击“下载待重启后安装”

![image-20220824175256455](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824175256455.png)

更新插件需要重启 Jenkins 。可在宿主机使用`docker restart`命令

### 添加 Github 凭证

添加两个凭证

![image-20220824172758041](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824172758041.png)

1. 用于 Github 仓库访问验证

选择 `Username with password` 类型，username 填 github 用户名，password 填 github 的 Personal access token

![image-20220824161229380](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824161229380.png)

2. 用于 Github Server 设置，以验证 Github webhook 发送的post请求

   选择 `Secret text` 类型，Secret 填写 Github Personal access token

![image-20220824172252100](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824172252100.png)

### 设置 Github Server

在系统配置中添加 Github 服务器

![image-20220824173305430](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824173305430.png)

点击测试，显示图示这样表示连接成功。

`Github 服务器 ` 帮助信息中的URL用于 [webhook 设置](#webhook-设置)

![image-20220825031844798](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220825031844798.png)

## 创建 Jenkins 任务

### 任务配置

新建任务，选择`流水线`

![image-20220824155405669](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824155405669.png)



填写 Github 项目地址

![image-20220824161930532](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824161930532.png)

“构建触发器” 选择 GitHub hook trigger for GITScm polling

![image-20220824160118511](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824160118511.png)

流水线设置，选择 SCM - Git ，设置仓库地址、凭证，指定分支

![image-20220824161530343](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824161530343.png)

**Jenkinsfile** 脚本路径，默认在根目录。

![image-20220824162410963](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824162410963.png)



### Jenkinsfile 配置

Jenkinsfile 用于定义构建流程，是 Jenkins 自动构建的关键步骤。

任务配置中设置了脚本路径为“./Jenkinsfile”，所以我们要在项目的根目录下创建名为“Jenkinsfile”的文件，写入构建流程：

<small>示例构建的是基于 vue3 的 vuepress2.0 静态站点</small>

```
pipeline {
    agent {
		docker {
			image 'node:lts-alpine3.15'
		}
	}
    stages {
        stage('Install modules') {
            steps {
                sh 'npm install' 
            }
        }
		stage('Build') {
            steps {
                sh 'yarn docs:build' 
            }
        }
    }
}
```

### 任务步骤分析

1. 根据任务配置，在 Jenkinsfile 作用前，Jenkins 会先通过 SCM 拉取github 仓库的代码，并存在任务目录下：`/var/jenkins_home/workspace/<任务名>`

2. 根据 Jenkinsfile ，接着 Jenkins 会拉取`node:lts-alpine3.15`镜像，启动一个node容器，该node容器与Jenkins共享数据卷，并以 `/var/jenkins_home/workspace/<任务名>` 为工作目录。接着在容器中运行`npm install` 和 `yarn docs:build`命令。

3. 根据 [vuepress](https://v2.vuepress.vuejs.org/zh/) 的特点，`build` 之后会得到一个`dist`目录，存放在站点数据。

   本文最后目标就是将 dist 目录交付给 nginx 应用。



## 构建和部署

### 任务构建

构建方式

- 在 Jenkins web 页面手动点击构建
- push 代码到 Github 仓库，自动触发构建

#### 手动构建

有多处点击构建的按钮.左侧边栏选择"打开 `Blue Ocean`"，演示更加直观

![image-20220824191213028](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824191213028.png)

第一次构建失败了（乌龟 Github，让我不得不动用 /etc/hosts，[https://raw.hellogithub.com/hosts](https://raw.hellogithub.com/hosts) ，早知直接用 gitee 好了）

![image-20220824192107202](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824192107202.png)

看第二次

![image-20220824192134971](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824192134971.png)



#### 自动构建

先行条件：

- Github 正确设置了Jenkins服务器的webhook地址
- Jenkins 设置了 Github 服务器API地址和凭据，且连接测试成功
- Jenkins 任务的"构建触发器"勾选了"GitHub hook trigger for GITScm polling"

**自动构建过程**：

1. push 代码到 Github

   push操作触发了 Github webhook，并向 Jenkins 服务器发送一个POST请求

   ![image-20220824195029899](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824195029899.png)

2. Jenkins 收到 Github 的信息，触发构建

   Jenkins 的轮询(SCM)日志：

   ![image-20220824201836732](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824201836732.png)

**值得注意的是**，由于我push了两个分支，触发了两次 Webhook

![image-20220824203029093](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220824203029093.png)

### Github hosts (可选)

这次用的是国内的腾讯服务器，Github访问很不稳定，故用更新 hosts 的方法提高稳定性。

```shell
#!/bin/ash
set -e

if ! test -f /etc/hosts.bak
then
   cp /etc/hosts /etc/hosts.bak
else
   echo "hosts.bak is existed"
fi

cd /home/autotask
if test -f hosts
then
   wget -O newhosts https://raw.hellogithub.com/hosts
else
   wget https://raw.hellogithub.com/hosts
   cat /etc/hosts.bak > /etc/hosts
   cat hosts >> /etc/hosts
fi

if test -n "`diff hosts newhosts`"
then
   cat /etc/hosts.bak > /etc/hosts
   cat newhosts > hosts
   cat hosts >> /etc/hosts
   echo "Github hosts changed"
fi
```

设置 crontab 任务，每30分钟检测一次hosts更新

```shell
bash-5.1# crontab -e
bash-5.1# crontab -l
# min	hour	day	month	weekday	command
*/30 * * * * /home/autotask/updateHostsForGithub.sh
# 启动crond
bash-5.1# find / -name crond
/usr/sbin/crond
bash-5.1# /usr/sbin/crond
bash-5.1# ps |grep crond
 2437 root      0:00 /usr/sbin/crond
 2440 root      0:00 grep crond
```

### 创建nginx容器

```shell
docker run \
--name nginx-mysite \
-d \
-p 80:80 \
-v /var/lib/docker/volumes/jenkins-data/_data/workspace/mysite/docs/.vuepress/dist:/usr/share/nginx/html \
nginx:alpine
```

前面由构建步骤获得了站点目录`dist`，现在只需创建一个`nginx`容器，把`dist`目录挂载到nginx容器的`/usr/share/nginx/html`目录就行了。

dist 目录在宿主机的具体位置可以推演得到：

- docker 容器的数据卷位置是 `/var/lib/docker/volumes/<卷名>/_data`
- 创建 Jenkins 容器时挂载参数是 `-v jenkins-data:/var/jenkins_home`
- 本次 Jenkins 任务名为“mysite”，所以该任务根目录是 `/var/jenkins_home/workspace/mysite`，
- vuepress项目默认构建的 dist 目录位于 docs/.vuepress/dist

dist 目录在 Jenkins 中的位置是：/var/jenkins_home/workspace/mysite/docs/.vuepress/dist

dist 目录在 宿主机的位置是：/var/lib/docker/volumes/jenkins-data/_data/workspace/mysite/docs/.vuepress/dist

