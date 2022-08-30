---
title: Shell变量
---



## 变量说明

shell  变量：变量和值之间不得有空格

bash变量是弱类型，无需事先声明类型，是将声明和赋值同时进行。

bash默认把所有变量的认为是字符串。

不能引用保留关键字。

只能包含数字 字母 下划线。

不能以数字开头。

严格区分大小写。

### 变量的引用
```shell
$var 和 ${var} #取出变量结果
$() #括号中执行命令，且拿到命令的执行结果
`` #反引号中执行命令，且拿到命令的执行结果
```
#### 命令替换
shell脚本中最有用的特性之一就是可以从命令输出中提取信息，并将其赋给变量。

通过$()和反引号``的方式执行命令来获取执行结果，属于命令替换。

警告：

> 命令替换会创建一个子shell来运行对应的命令。
>
> 子shell（subshell）是由运行该脚本的shell所创建出来的一个独立的子shell（child shell）。
>
> 正因如此，由该子shell所执行命令是无法使用脚本中所创建的变量的。 
>
> ——《Linux命令行与shell脚本编程大全-第3版》


#### 单引号和双引号的区别
单引号属于强引用，不识别特殊符号，会原封不动地引用``里面的内容，不能引用自己。

双引号属于弱引用，能识别特殊符号。如

```
$
${}
$()
``
```


当需要使用字符 $  `  "  \ 时必须进行转义（在前面加\）

### 变量的作用域

变量被引用的时候，会赋予其值，脚本中的变量，在shell执行完毕后就会消失，根据执行的方式决定

> source和**.** 是在当前的shell环境中加载变量，执行脚本，脚本执行完后变量不会消失；
>
> bash和sh执行脚本的时候，是开启子shell运行的，变量也是在子shell环境中加载，子shell退出后，变量也就消失了。



本地变量，只针对当前的shell进程。

> pstree 可以检查进程树

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1652158890434-5595340e-2867-4da5-980b-88814359c20c.png)

环境变量，也称为全局变量(分内置、自定义两种)，针对当前shell以及任意子进程。

局部变量，针对shell函数或是shell脚本中定义。

位置参数变量：用于shell脚本中传递的参数。

特殊变量：shell内质的特殊功效变量。

> - echo $?
>
> 判断上一个执行的命令是否成功。
>
> 0：成功
>
> 1-255：错误码


## 环境变量设置
环境变量一般指的是用export内置命令导出的变量，用于定义shell的运行环境、保证shell命令的正确执行。

shell通过环境变量确定登录的用户名、PATH路径、文件系统等各种应用。

环境变量可以在命令行中临时创建，但是用户退出shell终端，变量即丢失，如要永久生效，需要修改`环境变量配置文件`

- 用户个人配置文件~/.bash_profile、~/.bashrc 远程登录用户特有文件.
- 全局配置文件/etc/profile、/etc/bashrc，且系统建议最好创建在/etc/profile.d/，而非直接修改主文件，修改全局配置文件，影响所有登录系统的用户

用户重新登陆即加载生效

**summary**

- 每个用户都有自己的环境变量配置文件， ~/.bash_profile~/.bashrc， 且以个人配置文件， 优先加载变量，读取，以个人的优先生效
- 当你需要给所有用户都使用某个变量，写入全局即可/etc/profile

### 检查系统环境变量的命令

- **set**，输出所有变量，包括全局变量、局部变量
- env，只显示全局变量
- declare，输出所有的变量，如同set 
- export，显示和设置环境变量值

### 撤销环境变量

- unset变量名， 删除变量或函数。
### 设置只读变量
readonly，shell结束， 只读变量就失效

- 直接readonly显示当前系统只读变量
- `$ readonly name="value"` 定义只读变量name 

###  环境变量初始化与加载顺序
环境变量文件加载顺序

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1652166131654-acbe6fce-1a33-4041-863f-bfa1eb58f202.png)

## 特殊变量
shell的特殊变量，用在如脚本，函数传递参数使用，有如下
### 特殊参数变量
```shell
$0	获取shell脚本文件名，以及脚本路径
$n 	获取shell脚本的第n个参数，n在1~9之间，如$1，$2，$9，大于9则需要写，${10}，参数空格隔开
$#	获取执行的shell本后面的参数总个数
$*	获取shell所有参数，不加引号等同$@的作用，加上引号"$*"作用是接收所有参数为单个字符串，"$1$2.."
$@	不加引号，效果同上，加引号，是接收所有参数为独立字符串，如"$1" "$2" "$3" ... ，空格保留
```
**$* 和 $@ 区别 **

> `$*` 和`$@`的区别你了解吗?
>
> `$*`和`$@`都表示传递给函数或脚本的所有参数，当`$*`和`$@`不被双引号""包围时，它们之间没有任何区别，都是将接收到的每个参数看做一份数据，彼此之间以空格来分隔。
>
> 但是当它们被双引号""包含时，就会有区别了：
>
> `"$*"`会将所有的参数从整体上看做一份数据，而不是把每个参数都看做一份数据。
>
> `"$@"`仍然将每个参数都看作一份数据，彼此之间是独立的。
>
> 比如传递了5个参数，那么对于`"$*"`来说，这5个参数会合并到一起形成一份数据，它们之间是无法分割的；而对于`"$@"`来说，这5个参数是相互独立的，它们是5份数据。
>
> 如果使用echo 直接输出`"$*"`和`"$@"`做对比， 是看不出区别的； 但如果使用for 循环来逐个输出数据，立即就能看出区别来。



```shell
[15:25:23 root@VM-8-17-centos study]#cat different.sh 
#!/bin/bash
echo "print each param from \"\$*\""
for var in "$*"
do
    echo "$var"
done

echo "print each param from \"\$@\""
for var in "$@"
do
    echo "$var"
done
[15:25:09 root@VM-8-17-centos study]#bash different.sh Bei Jing Tian An Men
print each param from "$*"
Bei Jing Tian An Men
print each param from "$@"
Bei
Jing
Tian
An
Men
```

### 特殊状态变量
```shell
$?	上一次命令执行状态返回值，0正确，非0失败
$$	当前she11脚本的进程号
$!	上一次后台进程的PID 
$_	再次之前执行的命令，最后一个参数

查找方式 `man bash`，搜索Special Parameters
```
#### 脚本控制返回值 $?
脚本控制返回值的玩法，脚本返回值，学习shell函数编程之后，才能彻底理解

这个脚本执行完毕了，会返回一个数字id，称之为返回值

```shell
#!/bin/bash 
# $#获取参数个数 -ne不等于的情况 &&并且
[ $# -ne 2 ] && { #满足条件就执行
  echo "must be two args"
  exit 119 #终止程序运行，且返回119状态码，提供给当前shell的$?变量，若是在函数里可以return 119用法
}
echo ok 
```
```shell
[16:33:25 root@VM-8-17-centos study]#bash return.sh one two
ok
[16:35:02 root@VM-8-17-centos study]#echo $?
0
[16:35:05 root@VM-8-17-centos study]#bash return.sh one two three
must be two args
[16:35:09 root@VM-8-17-centos study]#echo $?
119
```

#### 获取上一次后台执行的程序的pid，$!
**怎样后台执行程序？**

`nohub xxx(命令) & 1> /dev/null`


## 特殊shell扩展变量
写复杂脚本的时候用得上它

```shell
如果parameter变量值为空，返回word字符串，赋值给result变量
result=${parameter:-word}

如果parameter变量值为空，则word替代变量值，且返其值
result=${parameter:=word}

如果parameter变量值为空，什么都不做，否则返回word值
${parameter:+word}

如果parameter变量值为空，word当作stderr(standardError)输出，否则输出变量值，
用于设置变量为空导致错误时，返回的错误信息
${parameter:?word}
```
tips：

**:-** 和 **:=** 的区别：para值为空时，**:-** 是返回word字符串，不会赋值给parameter；**:=** 是使word成为parameter的值

```shell
$ unset para res
$ res=${para:-hello}
$ echo $res;echo $para
hello

$ unset para res
$ res=${para:=hello}
$ echo $res;echo $para
hello
hello
$
```
**:+** para值不为空时，返回word字符串，para保留原值

```shell
$ unset para res
$ para=Goodbye
$ res=${para:+hello}
$ echo $res;echo $para
hello
Goodbye
```
**:?** para值为空时，word当作标准错误输出

```shell
$ unset para res
$ echo ${para:?值为空}
-bash: para: 值为空
```

应用例子：数据备份，删除过期数据

```shell
# 删除7天以上的过期数据
find 需要搜索的目录 -name 需要搜索的文件名字 -type <文件类型> -mtime +7 |xargs rm -f

dir_path="/data/mysql_back_data"
#如果有bug歧义，就会在当前目录搜索删除
find ${dir_path} -name '*.tar.gz' -type f -mtime +7 |xargs rm -f
#改进
find ${dir_path:=/data/mysql_back_data} -name '*.tar.gz' -type f -mtime +7 |xargs rm -f
```

