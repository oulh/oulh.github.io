---
title: shell数组
sidebar_position: 6
---





普通数组：只能使用整数作为数组索引(元素的索引)

关联数组：可以使用字符串作为数组索引(元素的索引)



## 定义

```shell
数组名称=(元素1 元素2 元素3 ...)
```

## 赋值

```
变量名=变量值
array[0]=v1
array[1]=v2
array[3]=v3
```

一次附多个值：

```shell
array=(var1 var2 var3 var4)
# 输出的每一行赋值给array1数组
array1=(`cat /etc/passwd`)
array2=(`ls /root`)
# 单引号或双引号里的内容为一个元素
array3=(harry amy jack "Miss zhang")
# [10]=linux, 把=后内容赋值给索引为10的元素
array4=(1 2 3 4 "hello world" [10]=linux)
```

## 取值

` ${数组名称[索引]}` 



```shell
${array[i]}  i表示元素的索引
使用@ 或 * 可以获取数组中的所有元素：
获取第一个元素
echo ${array[0]}
echo ${array[*]}			# 获取数组里的所有元素，同 ${array[@]}
echo ${#array[*]}			# 获取数组里所有元素个数，同 ${#array[@]}
echo ${!array[*]}    		# 获取数组元素的所有索引号，同 ${!array[@]}
echo ${array[@]:1:2}    # 访问指定的元素；1代表从索引为1的元素开始获取；2代表获取后面几个元素
```



## 关联数组

关联数组使用，首先需要申明该数组为关联数组，申明方式： `declare -A 数组名称` 

### 声明

```shell
首先声明关联数组
declare -A asso_array1
declare -A asso_array2
```

### 关联数组赋值

- 一次赋一个值

```shell
数组名[索引]=变量值
[root@study ~]# asso_array1[linux]=one
[root@study ~]# asso_array1[java]=two
[root@study ~]# asso_array1[php]=three
```

- 一次附多个值

```shell
[root@study ~]# asso_array2=([name1]=harry [name2]=jack [name3]=amy [name4]="Miss zhang")
```



### 关联数组取值

\* 可用@替代

```shell
[root@study ~]# echo ${asso_array1[linux]}
one
[root@study ~]# echo ${asso_array1[php]}
three
[root@study ~]# echo ${asso_array1[*]}
three two one
[root@study ~]# echo ${!asso_array1[*]}
php java linux
[root@study ~]# echo ${#asso_array1[*]}
3
[root@study ~]# echo ${#asso_array2[*]}
4
[root@study ~]# echo ${!asso_array2[*]}
name3 name2 name1 name4
```



```shell
#!/bin/bash
# Description: 打印cpu 1min 5min 15min的负载值
cpu_load=(`uptime |tr -s " " |cut -d " " -f11-13|tr "," " "`)
echo "CPU 1 min平均负载为: ${cpu_load[0]}"
echo "CPU 5 min平均负载为: ${cpu_load[1]}"
echo "CPU 15 min平均负载为: ${cpu_load[2]}"
```



