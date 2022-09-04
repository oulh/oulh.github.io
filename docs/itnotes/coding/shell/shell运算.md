---
title: Shell运算
sidebar_position: 5
---



# shell运算

## 一、赋值运算
赋值运算符 =

a=10 

name='baism'    

重点：字符串必须用引号引起来 

## 二、算术运算（四则运算）
### 2.1 运算符与命令

**四则运算符：** + - * \ 【加减乘除】

**扩展：** % ** 【取余 开方】

**运算命令:**

- 整形运算
– expr
– let
– $(())
– bc
- 浮点运算
– bc
### 2.2 整形运算
**expr 命令**：只能做整数运算，格式比较古板，注意空格
```shell
$ expr 1 + 1 2 
$ expr 5 - 2 3 
$ expr 5 \* 2  #注意*出现应该转义，否则认为是通配符 10 
$ expr 5 / 2 2 [root@zutuanxue ~]# expr 5 % 2 1 
```

expr的特殊用法：可判断字符串长度，延伸(判断文件名长度)

`expr 字符串 ":" ".*字符"`

```shell
$ expr 123456.jpg : .*j
8
$ expr 123456.jpg : .*jpg
10
```

**let命令**:只能做整数运算，且运算元素必须是变量，无法直接对整数做运算

```shell
$ let a=100+3;echo $a 103 root@zutuanxue ~]# let a=100-3;echo $a 97 
$ let a=100/3;echo $a 33 
$ let a=100*3;echo $a 300 
$ let a=100%3;echo $a 1
$ let a=100**3;echo $a 1000000
$ a=100
$ let a++;echo $a 101
$ let a--;echo $a 100
$ let a-=3;echo $a 97 
$ let a+=5;echo $a 102 
```

**双小圆括号运算**，在shell中(( ))也可以用来做数学运算。

```shell
$ echo $(( 100+3)) 103 
$ echo $(( 100-3))  97 
$ echo $(( 100%3)) 1 
$ echo $(( 100*3)) 300 
$ echo $(( 100/3)) 33 
$ echo $(( 100**3))     #开方运算 1000000 
```
### 2.3 浮点运算
浮点运算是采用的命令组合的方式来实现的 echo “scale=N;表达式”|bc
scale设置为希望在计算结果中保留的小数位数
```shell
$ echo "scale=2;3+100"|bc 103 
$ echo "scale=2;100-3"|bc 97 
$ echo "scale=2;100/3"|bc 33.33 
$ echo "scale=2;100*3"|bc 300
```

## 三、比较运算
### 整形比较运算
运算符解释

```shell
-eq	等于 equal
-gt 大于 greater than
-lt 小于 less than

-ge 大于或等于
-le 小于或等于
-ne 不等于 not equal
```
注意，linux命令test中使用该表达式只能比较两个整数的关系，不会返回结果，需要通过$?才能看到结果；
```shell
$ test 100 -gt 200;echo $?
1
$ test 100 -le 200;echo $?
0
```
shell中如何比较浮点数？
```shell
解决思路如下：
1）两个数据同时放大到整数倍
2）处理掉小数点位，保留整数位
3）进行整形判断
# 1、交互或者外传参的方式获得两个整数
#$1 $2
[ $# -lt 2 ]&&echo "need two args"&&exit 1

#采用外传参的方式接收数据并放大100倍,并处理为整数
num1=`echo "scale=2;$1*100"|bc|cut -d "." -f1`
num2=`echo "scale=2;$2*100"|bc|cut -d "." -f1`

# 2、比较num1与num2
```
### 字符串比较运算
运算符解释
```shell
==		等于
!=		不等于
-n		检查字符串的长度是否大于0 (非空字符串)
-z		检查字符串的长度是否为0 (空字符串)

# test -n "$name";echo $?
1
# test -z "$name";echo $?
0
```
## 逻辑运算

-  逻辑与运算 &&
-  逻辑或运算 ||
-  逻辑非运算 ！
## 文件判断
命令功能： 文件类型、权限、新旧判断

命令用法

`test [命令选项] 表达式 `

命令选项

```shell
-d  检查文件是否存在且为目录
-e  检查文件是否存在
-f  检查文件是否存在且为文件
-s  检查文件是否存在且不为空
-r  检查文件是否存在且可读
-w  检查文件是否存在且可写
-x  检查文件是否存在且可执行
-O  检查文件是否存在并且被当前用户拥有
-G  检查文件是否存在并且默认组为当前用户组 
-nt file1 -nt file2  检查file1是否比file2新
-ot file1 -ot file2  检查file1是否比file2旧      
-ef file1 -ef file2  检查file1是否与file2是同一个文件，判定依据的是i节点
以上只列出部分命令选项，详细的可以通过:man test获得。
```
 注意事项

-  用于比较文件路径是相对你运行该脚本的目录而言的。 如果你要检查的文件已经移走， 就会出现问题
-  在你尝试使用-nt或-ot比较文件之前，必须先确认文件是存在的。

例：
```shell

文件类型
$ test -f /etc/passwd;echo $?
0
$ test -f /etc;echo $?
1
$ test -d /etc;echo $?
0

权限判断
$ test -x /root/anaconda-ks.cfg ;echo $?
1
$ ll /root/anaconda-ks.cfg 
-rw-------. 1 root root 1216 6月  26 09:06 /root/anaconda-ks.cfg
$ test -r /root/anaconda-ks.cfg ;echo $?
0
$ test -w /root/anaconda-ks.cfg ;echo $?
0
```
## 条件测试
### test命令
```shell
if test condition
then
  commands;
fi
```
 如果test命令中列出的条件成立，test命令就会退出并返回退出状态码0

 如果条件不成立，test命令就会退出并返回非零的退出状态码，这使得if-then语句不会再被执行。

test命令可以判断三种条件：

- 数值比较
- 字符串比较
- 文件比较
### if [ condition ]
bash shell 提供另一种条件测试方法，无需在if-then语句中声明test命令。

```shell
if [ condition ] 
then
  commands;
fi
```
方括号定义了测试条件。注意，第一个方括号之后，第二个方括号之前，都必须加一个空格。
### 复合条件测试
使用布尔逻辑组合测试

[ condition1 ] && [ condition2 ]

[ condition1 ] || [ condition2 ]

```shell
#!/bin/bash
# testing compound compariscons
if [ -d $HOME ] && [ -w $HOME/testing ] 
then
  echo "文件存在且可写入"
else
  echo "文件不可写入"
fi
```
###  if-then的高级特性
#### 双括号

`((expression))` 

双括号允许在比较过程中使用高级数学表达式。test命令只能在比较中使用简单的算术操作。

expression 可以是任意的数学赋值或比较表达式

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1606043666076-2600e041-7e2b-4369-bd19-007def32bcb6.png)

```shell
#!/bin/bash
# using double parenthesis
#
vall=10
if (( $vall ** 2 > 90 ))
then
  (( val2 = $val1 ** 2 ))
  echo "The square of $vall is $val2"
fi
```
#### 双方括号
`[[ expression ]]` 

双方括号提供了针对字符串比较的高级特性。

它提供了test 命令未提供的另一个特性——模式匹配。在模式匹配中，可以定义一个正则表达式来匹配字符串值。

```shell
#!/bin/bash
# using pattern matching
#
vall=10
if [[ $USER == r* ]]
then
  echo "Hello $USER"
else
  echo "Sorry, I do not know you"
fi
```
