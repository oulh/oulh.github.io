---
title: shell函数
sidebar_position: 8
---

### 函数介绍

shell中允许将**一组命令集合**或**语句**形成一段**可用代码**，这些代码块称为shell函数。给这段代码起个名字称为函数名，后续可以直接调用该段代码的功能。

将完成一个功能的一段代码进行命名、封装

函数的优点：

1. 代码模块化，调用方便，节省内存
2. 代码模块化，代码量少，排错简单
3. 代码模块化，可以改变代码的执行顺序

### 函数定义

```shell
语法一:

函数名 () {
    代码块
    return N
    }


语法二：
function 函数名 {
      代码块
      return N
      }
      
      
函数中return说明：
1.return可以结束一个函数，类似于前面讲的循环控制语句break(结束当前循环，执行循环体后面的代码)
2.return默认返回函数中最后一个命令的退出状态，也可以给定参数值，该参数值的范围是0-256之间。
3.如果没有return命令，函数将返回最后一个Shell的退出值。
```

### 函数调用

- 当前命令行调用

```shell
[root@zutuanxue shell04]# cat fun1.sh 
#!/bin/bash
hello(){
echo "hello zutuanxue $1"
hostname
}
menu(){
cat <<-EOF
1. mysql
2. web
3. app
4. exit
EOF
}

[root@zutuanxue shell04]# source fun1.sh 
[root@zutuanxue shell04]# . fun1.sh 

[root@zutuanxue shell04]# hello 888
hello zutuanxue 888
MissHou.zutuanxue.cc
[root@zutuanxue shell04]# menu
1. mysql
2. web
3. app
4. exit
```

- 定义到用户的环境变量中

```shell
/etc/profile	/etc/bashrc		~/.bash_profile	~/.bashrc

[root@zutuanxue shell04]# cat ~/.bashrc 
# .bashrc

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

hello(){
echo "hello zutuanxue $1"
hostname
}
menu(){
cat <<-EOF
1. mysql
2. web
3. app
4. exit
EOF
}

注意：
当用户打开bash的时候会读取该文件
```

- 脚本中调用

```shell
#!/bin/bash
#打印菜单
source ./fun1.sh
menu(){
cat <<-END
	h	显示命令帮助
	f	显示磁盘分区
	d	显示磁盘挂载
	m	查看内存使用
	u	查看系统负载
	q	退出程序
	END
}
menu		//调用函数
```