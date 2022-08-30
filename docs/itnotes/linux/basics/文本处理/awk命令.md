---
title: awk命令
---

## awk命令

数据分析过程：收集 > 筛选 > 运算、整理 > 输出显示

我们可通过grep、tr、cut、unip、sort、tee、paste、xargs等命令对文本数据进行检索和处理，但这样的命令组合很复杂，用起来很困难。`awk命令`可以解决这样的痛苦。

grep、tr、cut 命令可以简单筛选和提取某些字段，但不具备数据处理的能力，而`awk`除了提取数据，还自带运算的能力，格式化输出。

**awk的工作特点**：

每一行是一条记录，每条记录中分若干字段。记录与记录之间的分隔符是换行符。

每一列是一个字段，字段与字段之间的分隔符是一个或多个空格，或制表符。

### awk语法

`awk [options] '[BEGIN{}]{program}[END{}]' [filename] `

> 常见options：
>
> -F fs    指定字段分隔符   默认是空格
>
> -f file    指定读取的程序文件
>
> -v var=value    定义awk程序中使用的变量环境和默认值
>
> {program}：程序脚本，必须放置在大括号内，且包含在单引号内

脚本运行优先级：

​	（1）BEGIN{}：开始处理数据流之前执行，可选，不需要数据源

​	（2）{program}：如何处理数据流，必选，需要数据源

​	（3）END{}：处理完数据后执行，可选，不需要数据源



## awk基本应用

### 字段（列）提取

提取文本中的一列数据打印输出

**内置变量：$n 第n个字段（列），$NF 最后一个字段（列），$0 所有文本**

```shell
[leo@CentOS7 ~]$awk '{print $0}' targetfile
The first round of enemies is coming, fire!fire!
The second round of    enemies is coming, fire!fire!
The third round of enemies is coming, fire!fire!
The fourth round of enemies is   	coming, fire!fire!
[leo@CentOS7 ~]$awk '{print $5}' targetfile
enemies
enemies
enemies
enemies
# 变量之间可以指定输出字段的分隔符。默认是以空格分隔
[leo@CentOS7 ~]$awk '{print $5 " are " $7,$NF}' targetfile
enemies are coming, fire!fire!
enemies are coming, fire!fire!
enemies are coming, fire!fire!
enemies are coming, fire!fire!
```

**指定分隔符**

```shell
[leo@CentOS7 ~]$egrep '/bin/bash' /etc/passwd|awk -F ":" '{print $1,$NF}'
root /bin/bash
lighthouse /bin/bash
leo /bin/bash
# 还可以指定输出内容的分隔符。默认是以空格分隔
[leo@CentOS7 ~]$egrep '/bin/bash' /etc/passwd|awk -F ":" '{print $1 ":" $NF}'
root:/bin/bash
lighthouse:/bin/bash
leo:/bin/bash
```



### 记录（行）提取

提取方法：a.行号 b. 正则匹配

NR：指定行号

```shell
##指定行号
# 第3行
[leo@CentOS7 ~]$awk 'NR==3{print $0}' targetfile
The third round of enemies is coming, fire!fire!

##正则匹配
# 第2个字段匹配到"third"的行
[leo@CentOS7 ~]$awk '$2=="third"{print $0}' targetfile
The third 
round of enemies is coming, fire!fire!
# 第1个字段匹配到"leo"的行的第1、6个字段
[leo@CentOS7 ~]$awk -F: '$1=="leo"{print $1,$6}' /etc/passwd
leo /home/leo
#第6个字段以"/home"开头的行
[leo@CentOS7 ~]$awk -F: '$6 ~ "^/home"{print $1,$6}' /etc/passwd
syslog /home/syslog
lighthouse /home/lighthouse
leo /home/leo
# 匹配运算符：==  !=  ~  !~
```

## awk高级应用

变量、数组、运算、流程控制

多个变量之间“;”隔开

**定义变量**

```shell
[leo@CentOS7 ~]$awk -v name='leo' 'BEGIN{print name}'
leo
[leo@CentOS7 ~]$awk 'BEGIN{name="leo"; print name}'
leo
```

**定义数组：**数组名[索引]=值

```shell
[leo@CentOS7 ~]$awk 'BEGIN{array[0]=100;array[1]=200;print array[0],array[1]}'
100 200
```

**awk运算**

- 赋值运算 =
- 比较运算 >  >=  ==  <  <=  != 
- 数学运算 +  -  *  /  %  **  ++  --
- 逻辑运算 &&   ||   ！
- 匹配运算 ==  !=  ~  !~

### awk内置变量

作用：指定字段宽度、字段分隔符、行分隔符

| 变量                            | 描述                                                |
| ------------------------------- | --------------------------------------------------- |
| FIELDWIDTHS（Field Widths）     | 定义每个字段的精确宽度，单位/字节                   |
| FS（Field Separation）          | 输入字段分隔符，同 -F，默认是一个或多个空格或制表符 |
| OFS（Output Field Separation）  | 输出字段分隔符，默认是一个空格                      |
| RS（Record Separation）         | 输入记录(行)分隔符，默认是回车"\n"                  |
| ORS（Output Record Separation） | 输出记录(行)分隔符，默认是回车"\n"                  |

```shell
[leo@CentOS7 ~]$awk 'BEGIN{FIELDWIDTHS="5 2 8"}NR==1{print $1,$2,$3}' /etc/passwd
root: x: 0:0:root
```

```shell
[leo@CentOS7 ~]$awk 'BEGIN{FS=":";ORS=", "}{print $1}' /etc/passwd
root, bin, daemon, adm, lp, sync, shutdown, halt, mail, operator, games, ftp, nobody, systemd-network, dbus, polkitd, libstoragemgmt, rpc, ntp, abrt, sshd, postfix, chrony, tcpdump, syslog, lighthouse, tss, vnstat, leo, [leo@CentOS7 ~]$
```

```shell
[leo@CentOS7 ~]$awk '{print $0}' test
a b c
d e
123

f g h i
j 456

k l
n m
789
[leo@CentOS7 ~]$awk 'BEGIN{RS=""}{print $1,$NF}' test
a 123
f 456
k 789
```

### awk流程控制

把流程控制语句加入到'{}'代码块中

- if
- for
- while
- do...while
- 循环控制

语句连着写注意要加分号';'

```shell
$ awk '{语句;if()语句;else 语句}' file
$ awk '{语句;if(){语句;语句...}else{语句;语句...}语句 }' file
$ awk '{for(){}}' file
$ awk '{while(){}}' file
$ awk '{do{}while()}' file
```

