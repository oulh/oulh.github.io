---
title: 父子Shell
sidebar_position: 4.1
---



## 脚本执行方式与父子shell的联系

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1656301235961-25ac010c-7427-4363-b830-27686c9759a1.png)

1. 通过source和点(.)执行脚本，只在当期shell环境中执行生效
1. 指定bash、sh 解释器运行脚本，是开启子shell运行脚本命令
1. ./script，也会通过#!（读作'shebang'）指定解释器，也是开启subshell运行脚本命令

补充：会开启子shell运行的情况

1. 进程列表

(commands)

2. 命令替换

- $(comands)
- 反引号：\`comands\`

## 父子shell

下面是由虚拟终端远程连接服务器的交互环境下的操作
```shell
$ pstree
─sshd─┬─sshd───bash───pstree
```
```shell
$ ps -ef --forest
# uid 当前进程号 父进程号 
root      1277     1  0 Feb14 ?        00:00:35 /usr/sbin/sshd -D
root     13906  1277  0 11:52 ?        00:00:00  \_ sshd: root@pts/6
root     13913 13906  0 11:52 pts/6    00:00:00      \_ -bash
root     14054 13913  0 11:53 pts/6    00:00:00          \_ ps -ef --forest
```
```shell
[12:04:09 root@VM-8-17-centos ~]$ bash
[12:04:09 root@VM-8-17-centos ~]$ sh
sh-4.2$ bash
[12:04:23 root@VM-8-17-centos ~]$ ps --forest
  PID TTY          TIME CMD
13913 pts/6    00:00:00 bash
16228 pts/6    00:00:00  \_ bash
16284 pts/6    00:00:00      \_ sh
16317 pts/6    00:00:00          \_ bash
16360 pts/6    00:00:00              \_ ps
20661 pts/6    00:00:00 bash
```
根据上面输出结果所示，pid为13913的进程是当前虚拟终端登陆时取得的一个shell，并产生一个进程。以上都是它的父shell / 父进程，以下都是它的子shell / 子进程。

pts/xx表示一个虚拟终端(包括远程和本地的)，pts/6是当前虚拟终端。`who`命令可查看当前已登陆的远程虚拟终端。

## 子shell的运用
有些需要一直占用shell或者需要运行很长时间的进程，开启子shell去执行它们，可以不耽误做其他事情。
### 检测是否在子shell环境中
一个系统默认的有关shell的变量

BASH_SUBSHELL

该变量的值如果是0，则是在当前shell环境中执行的，否则是开辟子shell去执行的

```shell
$ cd ~;pwd;cd /tmp/;pwd;echo $BASH_SUBSHELL
/root
/tmp
0
```
### 进程列表
加上()小括号的命令，将开启子shell去运行

```shell
$ (cd ~;pwd;cd /tmp/;pwd;echo $BASH_SUBSHELL)
/root
/tmp
1
```
### 子shell嵌套
在shell脚本开发中，经常会用子shell进行多进程的处理，提高进程并发执行效率。

```shell
$ (cd ~;pwd;cd /tmp/;(pwd;echo $BASH_SUBSHELL))
/root
/tmp
2
$ (cd ~;pwd;(cd /tmp/;(pwd;echo $BASH_SUBSHELL)))
/root
/tmp
3
```
## 进程 pid 0, pid 1, pid 2
> 参考：[解析 linux 进程 pid 0, pid 1, pid 2 关系及启动过程](https://blog.csdn.net/m0_47696151/article/details/121947320)

在 Linux 系统中，系统运行的应用程序几乎都是从 init（pid为 1 的进程）进程派生而来的，所有这些应用程序都可以视为 init 进程的子进程，而 init 则为它们的父进程。

在CentOS7后systemd代替了init

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1656342275733-26bec07a-c4ce-496f-97ca-b72c9002595a.png)

Linux 中有pid 0, pid 1 和 pid 2 三个特殊的进程。

pid 0，即 “swapper” 进程，是 pid 1 和 pid 2 的父进程。

pid 1，即 “init” 进程，所有用户空间的进程均派生自该进程。

pid 2，即 “kthreadd” 进程，是内核空间所有进程的父进程。

除了pid 0为静态生成外，其他进程实际都是调用 do_fork 生成。

```shell
# CentOS7
$ ps -ef | head -n 5
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 Feb14 ?        00:14:21 /usr/lib/systemd/systemd --switched-root --system --deserialize 22
root         2     0  0 Feb14 ?        00:00:00 [kthreadd]
```
要注意，编号1，2 不是特地为这两个进程保留，而是按照生成进程的顺序分配得来。

调用链：

```
INIT_TASK		/* pid 0 */

start_kernel
	rest_init
		kernel_thread		
			kernel_init			/* pid 1 */
				init_post
					run_init_process
		kernel_thread	
			kthreadd			/* pid 2 */
```

