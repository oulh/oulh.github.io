---
title: Linux软件包管理
---

## Debian系apt、dpkg

> debian 及其衍生版，如 Ubuntu的包格式是 .deb，可以使用 DPKG程序来安装单个的 deb 文件，但是需要手工解决软件包的依赖关系。很多时候安装一个软件需要安装1个或多个其他软件，手动解决时，很复杂。apt等包管理工具则解决了这些问题，安装一个包时，会自动从仓库中寻找需要的依赖包并安装


### ubuntu的apt镜像源仓库列表

/etc/apt/source.lis

> 更换源？
> 到各大开源镜像站找对应的版本，有使用说明！
> 常用源站：阿里云、中科大、清华、163……

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603198673474.png)

### apt「包管理」命令

```shell
安装软件
$ apt-get install softname1 softname2 softname3……
卸载软件
$ apt-get remove softname1 softname2 softname3……
卸载并清除配置
$ apt-get remove --purge softname1
更新软件信息数据库
$ apt-get update
进行系统升级
$ apt-get upgrade
搜索软件包
$ apt-cache search softname1 softname2 softname3……
```

### apt与apt-get之间的区别

> Ubuntu 16.04 发布时，引入了apt命令，是为了解决命令过于分散的问题，它包括了 apt-get 命令出现以来使用最广泛的功能选项，以及 apt-cache 和 apt-config 命令中很少用到的功能。
> 简单来说就是：apt = apt-get、apt-cache 和 apt-config 中最常用命令选项的集合。
> 仍有一些更细化的操作需要用到apt-get

![fe97ebf1698b911dcae00d1ecc74b943.jpg](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603198836436-fa422fe2-5362-4d81-9641-3197fd52bf43.jpeg)
**apt 还有一些自己的命令：**

![a7190a9328946bc1ecd1a3d286363ef4.jpg](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603198887601-9fc3bd5d-7a46-41a8-a953-2a32c7431da5.jpeg)

**安装时出现缺少依赖**
首先 apt-get update
然后apt-get-f install

### 单个Deb软件包的管理

```shell
安装deb软件包
$ dpkg -i xxx.deb
卸载软件
dpkg -e xxx.deb
删除软件包
$ dpkg -r xxx.deb
连同配置文件一起删除
$ dpkg -r --purge xxx.deb
查看软件包信息
$ dpkg -info xxx.deb
查看文件拷贝详情
$ dpkg -L xxx.deb
查看系统中已安装软件包信息
$ dpkg -l
重新配置软件包
$ dpkg-reconfigure（软件名）
```

[https://www.cnblogs.com/TankXiao/p/3332457.html](https://www.cnblogs.com/TankXiao/p/3332457.html)

## RedHat系yum、rpm

> CentOS、Fedora 和其它 Red Hat 家族成员使用 rpm文件。rpm软件包形式的管理虽然方便但仍需要自己解决依赖关系。YUM是rpm的前端程序，yum仓库用来存放所有的现有的.rpm包，当使用yum安装一个rpm包时，需要依赖关系，会自动在仓库中查找依赖软件并安装


### CentOS的yum镜像源

/etc/yum.repos.d/CentOS-Base.repo
更换源：

> 到各大开源镜像站找对应的版本，有使用说明！
> 常用源站：阿里云、中科大、清华、163……

![482a0ad11c1132b2831349c5eeea156a.jpg](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603199380932-ee8e171d-cc3e-4e85-8b87-4406cb4561e7.jpeg)

### 常用的YUM命令

```shell
1.安装yum包：
$ yum install PACKAGE_NAME
2.取出yum包装：
$ yum remove PACKAGE_NAME
3.重新安装一个yum包：
$ yum reinstall PACKAGE_NAME
4.搜索yum包：
$ yum search PACKAGE_NAME
5.显示yum包的信息：
$ yum info PACKAGE_NAME
6.更新安装的yum包：
$ yum update
7.更新具体的yum包：
$ yum update PACKAGE_NAME
8.显示yum历史：
$ yum history
9.显示已启用的yum存储库的列表：
$ yum repolist
10.找出哪个yum包提供了一个特定的文件（例如：/usr/bin/nc)）：
$ yum whatprovides "*bin/nc"
11.清除yum缓存：
$ yum clean all
```

### 常用的rpm命令

```shell
安装软件包。
[root@localhost  ~]# rpm-ivh PACKAGE_NAME-VERSION.rpm 
测试安装软件包，不做真实的安装。
[root@localhost  ~]# rpm-ivh--test PACKAGE_NAME-VERSION.rpm 
安装软件包，并重新定义安装路径。
[root@localhost  ~]# rpm-ivh--relocate /=/usr/local/PACKAGE_NAME PACKAGE_NAME-VERSION.rpm 
强行安装软件包，忽略依赖关系。
[root@localhost  ~]# rpm-ivh PACKAGE_NAME-VERSION.rpm--force--nodeps 
升级软件包。
[root@localhost  ~]# rpm-Uvh PACKAGE_NAME-VERSION.rpm 
强行升级软件包，忽略依赖关系。
[root@localhost  ~]# rpm-Uvh PACKAGE_NAME-VERSION.rpm--force--nodeps 
删除软件包，并忽略依赖关系。
[root@localhost  ~]# rpm-e PACKAGE_NAME--nodeps #只是包名，不需要跟版本号 
导入签名。
[root@localhost  ~]# rpm--import RPM-GPG-KEY 
查询某个包是否已经安装。
[root@localhost  ~]# rpm-q PACKAGE_NAME 
查询系统中所有已安装的包。
[root@localhost  ~]# rpm-qa 
查询某个文件属于哪个包。
[root@localhost  ~]# rpm-qf /etc/auto.misc 
查询某个已安装软件所包含的所有文件。
[root@localhost  ~]# rpm-ql PACKAGE_NAME 
查询某个包的依赖关系。
[root@localhost  ~]# rpm-qpR PACKAGE_NAME-VERSION.rpm 
查询某个包的信息。
[root@localhost  ~]# rpm-qpi PACKAGE_NAME-VERSION.rpm 
删除软件包。
[root@localhost  ~]# rpm-e PACKAGE_NAME
```



## Alpine的apk命令

**包管理**

add	添加指定包并确认所有依赖满足要求

```shell
apk add 二进制文件.apk
下载至本地apk安装文件，然后使用安装文件进行安装
apk add --no-network 包名
使用本地cache而不直接联网进行安装
apk add --no-cache 包名
不使用本地cache进行安装，比如在Dockerfile中为了避免生成cache产生无用的缓存安装文件
apk add gcc=8.3.0-r0
安装某包的指定版本（此示例为使用apk安装gcc的8.3.0-r0版本）
```

del	删除指定包

**系统维护**

fix	在不改动主要的依赖的情况下进行包的修复或者升级

update	从远程仓库获取信息更新本地仓库索引

upgrade	对已安装了的包进行更新

cache	对缓存进行操作，比如对缺失的包进行缓存或者对于不需要的包进行缓存删除

**信息查询**

info	对于指定的包进行包或者仓库的详细信息进行显示

list	按照指定条件进行包的列表信息显示

search	查询相关的包的详细信息

dot	生成依赖之间的关联关系图（使用箭头描述）

policy	显示包的仓库策略信息

stats	显示仓库和包的安装相关的统计信息

**仓库管理**

ndex	使用文件生成仓库索引文件

fetch	从全局仓库下载包到本地目录

verify	验证包的完整性和签名信息

manifest	显示package各组成部分的checksum

## 用ppa源安装应用

### 查找应用包

[https://launchpad.net](https://launchpad.net)



![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603200000177.png)

### 添加应用的ppa源

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603200045180.png)

### 安装应用

```shell
$ apt install php7.2
```

