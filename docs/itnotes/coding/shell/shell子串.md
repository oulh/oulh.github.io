---
title: Shell子串
sidebar_position: 3
---




## bash一些基础的内置命令
echo
```shell
-n 不换行输出
-e 解析字符串中的特殊符号
   echo -e "解析换行\n符号"
\n 换行
\r 回车
\t 制表符 四个空格
\b 退格
```
 eval 执行多个命令
```shell
eval [command 1;command 2;....]
$ eval ls; cd /root
```
exec  不创建子进程，执行后续命令，且执行完毕后自动exit
```shell
[17:59:13 root@VM-8-17-centos study]#date
Tue May 10 17:59:15 CST 2022
[17:59:15 root@VM-8-17-centos study]#exec date
Tue May 10 17:59:21 CST 2022

Connection closed.

Disconnected from remote host(175.178.27.151) at 17:59:21.

Type `help' to learn how to use Xshell prompt.
[C:\~]$ 
```
## shell子串的花式用法
```shell
${变量}	返回变量值
${#变量}	返回变量长度,字符长度
${变量:start}	返回变量start数值之后的字符
${变量:start:length}	提取start之后的length限制的字符
${变量#word}	从变量开头删除最短匹配的word子串
${变量##word}	从变量开头,删除最长匹配的word 
${变量%word}	从变量结尾删除最短的word 
${变量%%word}	从变量结尾开始删除最长匹配的word
${变量/pattern/string}	用string替换第一个匹配的pattern 
${变量//pattern/string} 用string替换所有的pattern
```
```shell
[17:20:48 root@VM-8-17-centos ~]#name="AB 1212 AB"
[17:21:53 root@VM-8-17-centos ~]#echo ${name};echo ${#name};
AB 1212 AB
10
[17:22:00 root@VM-8-17-centos ~]#echo ${name:4};echo ${name:4:5}
212 AB
212 A
[17:24:06 root@VM-8-17-centos ~]#echo ${name#A*1};echo ${name##A*1}
212 AB
2 AB
[17:25:10 root@VM-8-17-centos ~]#echo ${name%1*B};echo ${name%%1*B}
AB 12
AB
[17:25:52 root@VM-8-17-centos ~]#echo ${name/AB/CD};echo ${name//AB/CD}
CD 1212 AB
CD 1212 CD
```

### 统计变量子串的长度
#### 多种统计长度的命令

- echo ${#变量}	**效率最高**
- 使用wc  -L 命令统计时间
- expr命令的length函数统计
- awk加工处理
#### 统计的执行速度？

验证方式：time 命令

```shell
[19:54:39 root@VM-8-17-centos ~]#for n in {1..3};do char=`seq -s ":" 8`;echo ${char};done
1:2:3:4:5:6:7:8
1:2:3:4:5:6:7:8
1:2:3:4:5:6:7:8
[19:54:50 root@VM-8-17-centos ~]#time for n in {1..3};do char=`seq -s ":" 8`;echo ${#char};done
15
15
15

real	0m0.005s	#实际运行的时间
user	0m0.001s	#用户态执行的时间
sys	0m0.004s	#内核态执行的时间
```
验证：

```shell
#time for n in {1..10000};do char=`seq -s ":" 100`;echo ${#char} &>/dev/null;done 

real	0m14.253s
user	0m6.461s
sys	0m7.422s
#time for n in {1..10000};do char=`seq -s ":" 100`;expr length "${#char}" &>/dev/null;done 

real	0m27.239s
user	0m12.426s
sys	0m14.173s

#time for n in {1..10000};do char=`seq -s ":" 100`;echo ${char}|awk '{print length($0)}' &>/dev/null;done 

real	0m40.712s
user	0m19.115s
sys	0m20.562s
#time for n in {1..10000};do char=`seq -s ":" 100`;echo ${char}|wc -L &>/dev/null;done 

real	0m39.648s
user	0m18.944s
sys	0m19.729
```
shell编程，尽量使用linux内置的命令，内置的操作，和内置的函数，效率最高 C语言开发，效率最高

尽可能的减少管道符的操作

### 批量修改文件名
```shell
#for i in {1..5};do touch test${i}_finished.jpg;done
#ls
different.sh  masktest  retuan.sh  test1_finished.jpg  test2_finished.jpg  test3_finished.jpg  test4_finished.jpg  test5_finished.jpg
#修改文件名
#for file_name in `ls *.jpg`;do mv $file_name `echo ${file_name//_finished/}`;done
#ls
different.sh  masktest  retuan.sh  test1.jpg  test2.jpg  test3.jpg  test4.jpg  test5.jpg

```

