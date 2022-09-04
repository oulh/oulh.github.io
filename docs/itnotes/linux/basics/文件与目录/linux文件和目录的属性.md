---
sidebar_position: 2
title: linux文件和目录属性
---

## 基本属性

属性图解

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1654159500427-40735d9a-b0e4-4ba8-80f9-670d751898d7.jpeg)



### 文件类型

- d ：目录
- -：文件；
- l ：链接文档(link file)；
- b ：表示为装置文件里面的可供储存的接口设备(可随机存取装置)；
- c ：表示为装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)。

### 文件权限
![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1654159682773-68952f35-11f4-419a-bd8f-a392c5968db6.png)

各权限的分数对照表如下：

- r：4
- w：2
- x：1
#### chmod 更改权限
方式一：
`chmod [-R] xyz 文件或目录`

x、y、z分别表示user、group、others的权限分数

-R 表示递归

方式二：

| chmod | u<br/>g<br/>o<br/>a | +(加入)<br/>-(除去)<br/>=(设定) | r<br/>w<br/>x | 文件或目录 |
| ----- | ------------------- | ------------------------------- | ------------- | ---------- |

如果我们需要将文件权限设置为 -rwxr-xr-- ，可以使用 `chmod u=rwx,g=rx,o=r 文件名` 来设定
a 表示all

### 文件属主和属组
属性图解中user (owner) name 表示属主，group name表示属组
#### 更改文件属主和属组
```shell:no-line-numbers
chgrp [-R] 属组名 文件名
chown [–R] 属主名 文件名
chown [-R] 属主名:属组名 文件名
```

## 权限掩码
### **umask的作用**

umask确定了文件创建时的初始权限。

(文件或目录权限为文件目录默认权限减去umask得到初始文件权限，文件初始默认权限为0666，目录为0777,若用户umask为0022，则新创建的文件或目录在没有指定的情况下默认权限分别为0644,0755)

```shell
# 查看当前的权限掩码
[root@VM-8-17-centos ~]#umask
0022
```
```shell
[root@VM-8-17-centos]#mkdir umask-dir
[root@VM-8-17-centos]#ls -d -l umask-dir/
drwxr-xr-x 2 root root 4096 Jun  2 17:34 umask-dir/
```
"drwxr-xr-x"="777-022=755"

### **设置权限掩码**

`umask [-S][权限掩码]`

仅对当前shell生效

```
umask [-S][权限掩码]
```

要永久生效则需要修改环境变量

```shell
#全局生效
echo 'umask 0022' >> /etc/profile
echo 'umask 0022' >> /etc/bashrc
source /etc/profile
source /etc/bashrc
```

```shell
#对指定用户生效
echo 'umask 0022' >> /root/.bashrc
echo 'umask 0022' >> /root/.bash_profile
source /root/.bashrc
source /root/.bash_profile
```

### 关于环境变量文件bashrc和profile

环境变量文件说明

```shell
/etc/profile
- 作用范围：全局变量，作用于任何用户
- 生效时间：系统启动后就会自动运行
/etc/bashrc（有的系统上是'/etc/bash.bashrc'）
- 作用范围：全局变量，作用于任何用户
- 生效时间：用户登录后运行
~/.bash_profile （有的系统上是'~/.profile'）
- 作用范围：用户家目录下的私有环境变量
- 生效时间：系统启动后就会自动运行
~/.bashrc
- 作用范围：用户家目录下的私有环境变量
- 生效时间：用户登录后运行
# 手动更新配置文件,例：
source /etc/profile
```

参考：
[Linux bashrc和profile的用途和区别](https://www.linuxprobe.com/linux-bashrc-profile-different.html)

[Linux下环境变量（.bash_profile和.bashrc的区别）](https://www.cnblogs.com/triple-y/p/11107133.html)

引用某网友对环境变量文件的总结：

> /etc/profile，/etc/bashrc 是系统全局环境变量设定
>
> ~/.profile，~/.bashrc用户家目录下的私有环境变量设定
>
> 当登入系统时候获得一个shell进程时，其读取环境设定档有三步
>
> 1 首先读入的是全局环境变量设定档/etc/profile，然后根据其内容读取额外的设定的文档，如/etc/profile.d和/etc/inputrc
>
> 2 然后根据不同使用者帐号，去其家目录读取~/.bash_profile，如果这读取不了就读取~/.bash_login，这个也读取不了才会读取~/.profile，这三个文档设定基本上是一样的，读取有优先关系
>
> 3 然后在根据用户帐号读取~/.bashrc
>
> 至于~/.profile与~/.bashrc的区别
>
> 都具有个性化定制功能
>
> ~/.profile可以设定本用户专有的路径，环境变量，等，它只能登入的时候执行一次~/.bashrc也是某用户专有设定文档，可以设定路径，命令别名，每次shell script的执行都会使用它一次

## 隐藏属性

### chattr 配置文件隐藏属性
> chattr 指令只能在Ext2/Ext3/Ext4 的 Linux 传统文件系统上面完整生效

```shell
chattr [-RV][-v<版本编号>][+/-/=<属性>][文件或目录...]

```
参数：
-R 递归处理，将指定目录下的所有文件及子目录一并处理。

-v<版本编号> 设置文件或目录版本。

-V 显示指令执行过程。

+<属性> 开启文件或目录的该项属性。

-<属性> 关闭文件或目录的该项属性。

=<属性> 指定文件或目录的该项属性。

属性：

1. a：让文件或目录仅供附加用途。
1. b：不更新文件或目录的最后存取时间。
1. c：将文件或目录压缩后存放。
1. d：将文件或目录排除在倾倒操作之外。
1. i：不得任意更动文件或目录。
1. s：保密性删除文件或目录。
1. S：即时更新文件或目录。
1. u：预防意外删除。
### lsattr 显示文件隐藏属性
```shell
lsattr -[a,d,R] 文件或目录
```
参数

- -a 显示所有文件和目录，包括以"."为名称开头字符的额外内建，现行目录"."与上层目录".."。
- -d 显示，目录名称，而非其内容。
- -l 此参数目前没有任何作用。
- -R 递归处理，将指定目录下的所有文件及子目录一并处理。
- -v 显示文件或目录版本。
- -V 显示版本信息。
### 实例
用chattr命令防止系统中某个关键文件被修改：

`chattr +i /etc/resolv.conf`

`lsattr /etc/resolv.conf`
会显示如下属性

----i-------- /etc/resolv.conf

让某个文件只能往里面追加数据，但不能删除，适用于各种日志文件：

`chattr +a /var/log/messages`

## 目录与路径
如果是在写程序 (**shell** scripts) 来管理系统的条件下，**务必使用绝对路径的写法**。 因为绝对路径的写法虽然比较麻烦，但是可以肯定这个写法绝对不会有问题。 如果使用相对路径在程序当中，则可能由于你执行的工作环境不同，导致一些问题的发生。
