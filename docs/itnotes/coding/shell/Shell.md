---
title: Shell
---



> shell脚本语言很适合处理纯文本类型数据,且Linux的哲学思想就是一切皆文件，如日志、配置文件、文本、网页文件，大多数都是纯文本类型的，因此shell可以方便的进行文本处理，好比强大的Linux三剑客(grep, sed, awk)

shell脚本语言属于一种弱类型语言，无需声明变量类型， 直接定义使用。shell语言定义的变量，数据类型默认都是字符串类型。

弱类型语言，在定义变量的时候，不用主动声明改类型。

虽然有诸多脚本编程语言，但是对于Linux操作系统内部应用而言，shell是最好的工具，Linux底层命令都支持shell语句，以及结合三剑客(grep,sed、awk)进行高级用法。

擅长系统管理脚本开发,如软件启停脚本、监控报警脚本、日志分析脚本

每个语言都有自己擅长的地方,扬长避短,达到高效运维的目的是最合适的。

## 系统的合法shell
```shell
[leo@localhost ~]$ cat /etc/shells
/bin/sh
/bin/bash
/sbin/nologin
/usr/bin/sh
/usr/bin/bash
/usr/sbin/nologin
/bin/tcsh
/bin/csh
```

- /bin/sh (已经被 /bin/bash 所取代)
- /bin/bash (就是 Linux 预设的 shell)
- /bin/tcsh (整合 C Shell ，提供更多的功能)
- /bin/csh (已经被 /bin/tcsh 所取代)

## Bash shell
/bin/bash，Linux下默认的shell

bash是一个命令处理器，运行在文本窗口中，并能执行用户直接输入的命令

bash还能从文件中读取linxu命令，称之为脚本

bash支持通配符、管道、命令替换、条件判断等逻辑控制语句

### 历史命令
~/.bash_history 记录的是前一次登入以前所执行过的指令， 而至于这一次登入所执行的指令都被暂
存在内存中
```shell
# 存放历史命令的文件，用户退出登录后，持久化命令个数
[root@VM-8-17-centos ~]#echo $HISTFILE
/root/.bash_history
# shell进程可保留的命令历史的条数
[root@VM-8-17-centos ~]#echo $HISTSIZE
3000
```
调用历史命令
```shell
!n	#执行历史记录中的某n条命令
!! 	#执行上一次的命令,或者向上箭头
!string	#执行名字以string开头的最近一次的命令
```
`history` 命令
```shell
#呼出命令
[leo@localhost ~]$ history [n]
[leo@localhost ~]$ history [-c]
[leo@localhost ~]$ history [-raw] histfiles
```
选项和参数：

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1609224194232-3ea7c7ff-4767-4a70-a2db-a39298ec9fd7.png)

### 命令别名设定：(alias)
例：
`alias lm='ls -al'` 

取消别名：`unalias lm` 

### 命令补全
 [Tab] 接在一串指令的第一个字的后面，则为命令补全；

[Tab] 接在一串指令的第二个字以后时，则为『文件补齐』！

若安装 bash-completion 软件，则在某些指令后面使用 [tab] 按键时，可以进行『选项/参数的补齐』功能！

### 查询指令是否为 Bash shell 的内建命令： type
`type [-tpa] name` 
```shell
[dmtsai@study ~]$ type [-tpa] name
选项与参数：
：不加任何选项与参数时， type 会显示出 name 是外部指令还是 bash 内建指令
-t ： 当加入 -t 参数时， type 会将 name 以底下这些字眼显示出他的意义：
file ：表示为外部指令；
alias ：表示该指令为命令别名所设定的名称；
builtin ：表示该指令为 bash 内建的指令功能；
-p ：如果后面接的 name 为外部指令时，才会显示完整文件名；
-a ： 会由 PATH 变量定义的路径中， 将所有含 name 的指令都列出来，包含 alias
```

### 指令换行
\：跳脱字符

\[Enter]

### 快速删除错误指令

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1609209704194-6020ffec-256b-47e5-bcab-5d88a350ee5e.png)

## 执行脚本的方式
指定解释器

> #! /bin/bash
> #! /bin/perl
> #! /bin/python
> ...


- `bash script.sh`或 `sh script.sh`，文件本身没权限执行，没x权限，则使用该方法，或脚本未指定解释器，重点推荐的方式
- 使用 绝对/相对 路径执行脚本，需要文件含有x权限，需要指定解释器
- `source script.sh` 或者`. script.sh`，代表 执行的含义，可以不指定解释器。source等于点 .
- 少见的用法，sh＜script.sh


> Perl语言， 擅长支持强大的正则表达式， 以及运维工具的开发
>
> Python语言， 不仅适用于脚本程序开发， 也擅长Web页面开发， 如(系统后台， 资产管理平台) ， 爬虫程序开发， 大量Linux运维工具也由python开发， 甚至于游戏开发也使用


## 退出脚本及状态码
**退出状态码**

   Linux提供了一个专门的变量$?来保存上个已执行命令的退出状态码。范围0-255

   一个成功结束的命令的退出状态码是0

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1606043665279-adb5b33e-48a7-48df-96f9-0b272656409f.png)

**exit命令**

exit命令允许你在脚本结束时指定一个退出状态码

exit 5

exit $var3

## Shell变量

### 变量取用

```shell
[ou@leo ~]$ echo $HOME
/home/ou
[ou@leo ~]$ echo $SHELL
/bin/bash
[ou@leo ~]$ echo $HOME
/home/ou
[ou@leo ~]$ echo $SHELL
/bin/bash
[ou@leo ~]$ echo $MAIL
/var/spool/mail/ou
[ou@leo ~]$ myname=leo
[ou@leo ~]$ echo $myname
leo
```

### 变量设定
```shell
1. 变量与变量内容以一个等号『=』来连结，如下所示：
『myname=VBird』
2. 等号两边不能直接接空格符，如下所示为错误：
『myname = VBird』或『myname=VBird Tsai』
3. 变量名称只能是英文字母与数字，但是开头字符不能是数字，如下为错误：
『2myname=VBird』
4. 变量内容若有空格符可使用双引号『"』或单引号『'』将变量内容结合起来，但
 	o 双引号内的特殊字符如 $ 等，可以保有原本的特性，如下所示：
	『var="lang is $LANG"』则『echo $var』可得『lang is zh_TW.UTF-8』
	o 单引号内的特殊字符则仅为一般字符 (纯文本)，如下所示：
	『var='lang is $LANG'』则『echo $var』可得『lang is $LANG』

5. 可用跳脱字符『\ 』 将特殊符号(如 [Enter], $, \, 空格符, '等)变成一般字符，如：
『myname=VBird\ Tsai』
6. 在一串指令的执行中，还需要藉由其他额外的指令所提供的信息时，可以使用反单引号『`指令`』或 『$(指
令)』。特别注意，那个 ` 是键盘上方的数字键 1 左边那个按键，而不是单引号！ 例如想要取得核心版本
的设定：
『version=$(uname -r)』再『echo $version』可得『3.10.0-229.el7.x86_64』
7. 若该变量为扩增变量内容时，则可用 "$变量名称" 或 ${变量} 累加内容，如下所示：
『PATH="$PATH":/home/bin』或『PATH=${PATH}:/home/bin』
8. 若该变量需要在其他子程序执行，则需要以 export 来使变量变成环境变量：
『export PATH』
9. 通常大写字符为系统默认变量，自行设定变量可以使用小写字符，方便判断 (纯粹依照使用者兴趣与嗜好) ；
10. 取消变量的方法为使用 unset ：『unset 变量名称』例如取消 myname 的设定：
『unset myname』
```

在变量的设定当中，单引号与双引号的用途有何不同？

答：单引号与双引号的最大不同在于**双引号仍然可以保有变量的内容，但单引号内仅能是一般字符 ，而不会有特殊符号。  **

引用额外命令输出的内容，可以使用反单引号『\`指令\`』或 『$(指令)』

取消变量：`unset 变量名`


### 环境变量
#### env 观察环境变量
```shell
范例一：列出目前的 shell 环境下的所有环境变量与其内容。
[dmtsai@study ~]$ env
HOSTNAME=study.centos.vbird <== 这部主机的主机名
TERM=xterm <== 这个终端机使用的环境是什么类型
SHELL=/bin/bash <== 目前这个环境下，使用的 Shell 是哪一个程序？
HISTSIZE=1000 <== 『记录指令的笔数』在 CentOS 默认可记录 1000 笔
OLDPWD=/home/dmtsai <== 上一个工作目录的所在
LC_ALL=en_US.utf8 <== 由于语系的关系， 鸟哥偷偷丢上来的一个设定
USER=dmtsai <== 使用者的名称啊！
LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:
or=40;31;01:mi=01;05;37;41:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:
*.tar=01... <== 一些颜色显示
MAIL=/var/spool/mail/dmtsai <== 这个用户所取用的 mailbox 位置
PATH=/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/dmtsai/.local/bin:/home/dmtsai/bin
PWD=/home/dmtsai <== 目前用户所在的工作目录 (利用 pwd 取出！ )
LANG=zh_TW.UTF-8 <== 这个与语系有关，底下会再介绍！
HOME=/home/dmtsai <== 这个用户的家目录啊！
LOGNAME=dmtsai <== 登入者用来登入的账号名称
_=/usr/bin/env <== 上一次使用的指令的最后一个参数(或指令本身)
```

#### export： 自定义变量转成环境变量
环境变量与自定义变量的差异在于该变量是否会被子程序所继续引用
```shell
[dmtsai@study ~]$ export #显示当前环境变量
[dmtsai@study ~]$ export 变量名称 #自定义变量转成环境变量
```

### 语系变量 (locale)
影响显示结果

`/etc/locale.conf  `

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1609213436984-3de2920b-fe79-4784-8ded-c2ebbc18b52e.png)

### 变量键盘读取、数组与宣告： read, array, declare
![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1609222722285-ac069983-9b30-42ea-8cab-fa161369fac1.png)

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1609222783222-9abeef2e-173c-4601-85f3-80a7f038536a.png)

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1609223091319-bc16f5d0-209b-480a-b467-c7bb9df7ab25.png)

## 通配符与特殊符号
![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1609224985388-21605b65-8c4a-4a21-9b23-fba5947a4e2c.png)



![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1609225146668-90efd0cb-1c72-4281-a869-997097287a75.png)



## 数据流重导向

### 数据流导向
1. 标准输入 (stdin) ：代码为 0 ，使用 < 或 << ；

2. 标准输出 (stdout)：代码为 1 ，使用 > 或 >> ；
3. 标准错误输出(stderr)：代码为 2 ，使用 2> 或 2>> ；


> 1> ：以覆盖的方法将『正确的数据』输出到指定的文件或装置上；
1>>：以累加的方法将『正确的数据』输出到指定的文件或装置上；
2> ：以覆盖的方法将『错误的数据』输出到指定的文件或装置上；
2>>：以累加的方法将『错误的数据』输出到指定的文件或装置上；

### 判断
cmd ; cmd (不考虑指令相关性的连续指令下达)

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1609226071458-4fa7cb0c-5e66-4b4d-b84c-2a52a62d8d19.png)

## 管道命令（pipe）
```shell
[dmtsai@study ~]$ grep [-acinv] [--color=auto] '搜寻字符串' filename
选项与参数：
-a ： 将 binary 文件以 text 文件的方式搜寻数据
-c ： 计算找到 '搜寻字符串' 的次数
-i ：忽略大小写的不同，所以大小写视为相同
-n ： 顺便输出行号
-v ：反向选择，亦即显示出没有 '搜寻字符串' 内容的那一行！
--color=auto ：可以将找到的关键词部分加上颜色的显示喔！
范例一： 将 last 当中，有出现 root 的那一行就取出来；
[dmtsai@study ~]$ last | grep 'root'
范例二：与范例一相反，只要没有 root 的就取出！
[dmtsai@study ~]$ last | grep -v 'root'
范例三：在 last 的输出讯息中，只要有 root 就取出，并且仅取第一栏
[dmtsai@study ~]$ last | grep 'root' |cut -d ' ' -f1
# 在取出 root 之后，利用上个指令 cut 的处理，就能够仅取得第一栏啰！
范例四：取出 /etc/man_db.conf 内含 MANPATH 的那几行
[dmtsai@study ~]$ grep --color=auto 'MANPATH' /etc/man_db.conf
....(前面省略)....
MANPATH_MAP /usr/games /usr/share/man
MANPATH_MAP /opt/bin /opt/man
MANPATH_MAP /opt/sbin /opt/man
# 神奇的是，如果加上 --color=auto 的选项，找到的关键词部分会用特殊颜色显示喔！
```
CentOS 7 当中，预设的 grep已经主动加上 --color=auto 在 alias 内

## 用户交互与格式化输出
### 键盘输入 - read命令
功能：默认接受键盘的输入，回车符代表输入结束
> -p打印信息 
> -t限定时间 
> -s不回显 
> -n输入字符个数

例：
```shell
#!/bin/bash
# 
#Author: 
#Release: 
#Description: 仿真登陆

IP=`ifconfig ens33|egrep -w "inet"|awk '{print $2}'`

#1、清屏
clear
#2、输出提示信息
echo "CentOS Linux 8 (Core)"
echo -e "Kernel `uname -r` on an `uname -m`\n"

echo -e "Web console: https://localhost:9090/ or https://$IP:9090/ \n"

#3、交互输入登陆名
echo -n "$HOSTNAME login: "
read account

#4、交互输入密码
read -s -t30 -p "Password: " pw
echo
```
### 格式化输出
#### echo命令
将输入的字符串送往标准输出。
```shell
OPTIONS：
-n	不要在最后自动换行
-e	转义字符

转义字符
\a	发出警告声;
\b	删除前一个字符;
\t	插入tab;
\n	换行且光标移至行首;

\c	最后不加上换行符号;
\f	换行但光标仍旧停留在原来的位置;
\r	光标移至行首，但不换行;
\v	与\f相同;
\		插入\字符;
\0nnn	打印nnn(八进制)所代表的ASCII字符;  备注：数字0  不要理解成字母o
\xNN  打印NN(十六进制)所代表的ASCII字符;
```
#### 输出颜色文字
需要使用参数-e

格式：

`echo -e "\033[字背景颜色;文字颜色m**字符串**\033[0m"` 

例：

```shell
$ echo -e "\033[31m红色字\033[0m"
$ echo -e "\033[34m黄色字\033[0m"
$ echo -e "\033[41;33m红底黄字\033[0m"
$ echo -e "\033[41;37m红底白字\033[0m"
```
可用选项：

```shell
字颜色：30—–37
　　echo -e “\033[30m 黑色字 \033[0m”
　　echo -e “\033[31m 红色字 \033[0m”
　　echo -e “\033[32m 绿色字 \033[0m”
　　echo -e “\033[33m 黄色字 \033[0m”
　　echo -e “\033[34m 蓝色字 \033[0m”
　　echo -e “\033[35m 紫色字 \033[0m”
　　echo -e “\033[36m 天蓝字 \033[0m”
　　echo -e “\033[37m 白色字 \033[0m”
　　
字背景颜色范围：40—–47
　　echo -e “\033[40;37m 黑底白字 \033[0m”
　　echo -e “\033[41;37m 红底白字 \033[0m”
　　echo -e “\033[42;37m 绿底白字 \033[0m”
　　echo -e “\033[43;37m 黄底白字 \033[0m”
　　echo -e “\033[44;37m 蓝底白字 \033[0m”
　　echo -e “\033[45;37m 紫底白字 \033[0m”
　　echo -e “\033[46;37m 天蓝底白字 \033[0m”
　　echo -e “\033[47;30m 白底黑字 \033[0m”
　　
最后面控制选项说明
　　\033[0m 关闭所有属性
　　\033[1m 设置高亮度
　　\033[4m 下划线
　　\033[5m 闪烁
　　\033[7m 反显
　　\033[8m 消隐

　　\033[30m — \33[37m 设置前景色
　　\033[40m — \33[47m 设置背景色
　　
　　\033[nA 光标上移n行
　　\033[nB 光标下移n行
　　\033[nC 光标右移n行
　　\033[nD 光标左移n行
　　\033[y;xH设置光标位置
　　\033[2J 清屏
　　\033[K 清除从光标到行尾的内容
　　\33[s 保存光标位置
　　\033[u 恢复光标位置
　　\033[?25l 隐藏光标
　　\033[?25h 显示光标
```

### 终端提示符格式和颜色

范例：

PS1="\[\e[1;32m\][\t \[\e[1;33m\]\u\[\e[35m\]@\h\[\e[1;31m\] \W\[\e[1;32m\]]\[\e[0m\]\$"

![image-20220809221143298](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220809221143298.png)

或者不要包裹`e[xxm`的中括号也行

PS1="\e[1;32m[\t \e[1;33m\u\e[35m@\h\e[1;31m \W\e[1;32m]\e[0m\$"

![img](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1660049747478-239bad68-187c-4675-886c-43ddff8bcc34.png)

提示符格式说明：

- \e 控制符 \033 
- \u 当前用户 
- \h 主机名简称 
- \H 主机名 
- \w 当前工作目录 
- \W 当前工作目录基名 
- \t 24小时时间格式 
- \T 12小时时间格式  
-  ! 命令历史数 
- \# 开机后命令历史数  

**持久保存提示符格式相关变量 PS1  :**

```shell
[leo@CentOS7 home]$sudo vim /etc/profile.d/abc.sh
PS1="\e[32m[\e[34m\u\e[35m@\h\e[31m \W\e[32m]\e[0m\$"
```

退出当前终端，再次打开，更改依然生效
