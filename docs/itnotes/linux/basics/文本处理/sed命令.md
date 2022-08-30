---
title: sed命令
---



## sed命令

作用：非交互式对文本内容进行编辑

编辑对象：行

**命令格式**

`sed [options] '{command}[flags]' [filename]`

options 命令选项:

- -e`<script>`或--expression=`<script>` 以选项中指定的script来处理输入的文本文件。
- -f<script文件>或--file=<script文件> 以选项中指定的script文件来处理输入的文本文件。
- -h或--help 显示帮助。
- -n或--quiet或--silent 仅显示script处理后的结果。
- -r 使用正则表达式
- -V或--version 显示版本信息。

command 内部命令:

- a 在指定行的下一行插入新行
- i  在指定行的下一行插入新行
- d 删除指定行
- s 对指定行查找替换字符串
- c 取代指定行
- p 直接打印指定行

flags 标志：（搭配`s`查找替换）

g: 替换所有匹配到的字符串

number: 如果有多个匹配到的字符串，可选择要替换哪一个

w filename: 保存处理后的内容到一个新文件(会覆盖该文件)，原文件不会改变

p: 打印处理后的结果

## 使用方式

**指定行的方式**

'a' ：所有行

'3a'：第三行

'2,4a'：第2到4行

'/string/a'：匹配到指定字符串'string'的行

| 向后插入    | 向前插入    | 删除        | 字符串查找替换 | 行替换             | 打印        |                      |
| ----------- | ----------- | ----------- | -------------- | ------------------ | ----------- | -------------------- |
| 'a'         | 'i'         | 'd'         | 's//'          | 'c'                | 'p'         | 所有行               |
| '3a'        | '3i'        | '3d'        | '3s//'         | '3c'               | '3p'        | 第3行                |
| '2,4a'      | '2,4i'      | '2,4d'      | '2,4s//'       | '2,4c'(只保留一行) | '2,4p'      | 第2到4行             |
| '/string/a' | '/string/i' | '/string/d' | '/string/s//'  | '/string/c'        | '/string/p' | 匹配到指定字符串的行 |

**插入**

- **a** 向后插入新行

  ```shell
  #加"\"是为了易于区分，可以不加：sed '2anewline' targetfile
  [leo@VM-8-17-centos ~]$sed '2a\newline' targetfile
  The first round of enemies is coming, ready fight!
  The second round of enemies is coming, ready fight!
  newline
  The third round of enemies is coming, ready fight!
  The fourth round of enemies is coming, ready fight!
  ```

- **i** 向前插入新行

  ```shell
  [leo@VM-8-17-centos ~]$sed '2i\newline' targetfile
  The first round of enemies is coming, ready fight!
  newline
  The second round of enemies is coming, ready fight!
  The third round of enemies is coming, ready fight!
  The fourth round of enemies is coming, ready fight!
  ```

**删除 d**

```shell
[leo@VM-8-17-centos ~]$sed '2,3d' targetfile
The first round of enemies is coming, ready fight!
The fourth round of enemies is coming, ready fight!
```

**替换**

- **s** 字符串查找替换

  ```shell
  # 字符串查找替换
  [leo@VM-8-17-centos ~]$sed '2,3s/enemies/devil/' targetfile
  The first round of enemies is coming, ready fight!
  The second round of devil is coming, ready fight!
  The third round of devil is coming, ready fight!
  The fourth round of enemies is coming, ready fight!
  [leo@VM-8-17-centos ~]$sed '/third/s/enemies/devil/' targetfile
  The first round of enemies is coming, ready fight!
  The second round of enemies is coming, ready fight!
  The third round of devil is coming, ready fight!
  The fourth round of enemies is coming, ready fight!
  ```

  - 可选flags：number，g，w，p

  
  ```shell
  # w: 保存改动后的内容到一个新文件(会覆盖该文件)，原文件不会改变
  [leo@VM-8-17-centos ~]$sudo sed 's/ready fight/fire! fire!/w newtargetfile' targetfile
  The first round of enemies is coming, fire! fire!!
  The second round of enemies is coming, fire! fire!!
  The third round of enemies is coming, fire! fire!!
  The fourth round of enemies is coming, fire! fire!!
  [leo@VM-8-17-centos ~]$cat newtargetfile 
  The first round of enemies is coming, fire! fire!!
  The second round of enemies is coming, fire! fire!!
  The third round of enemies is coming, fire! fire!!
  The fourth round of enemies is coming, fire! fire!!
  # number: 如果匹配到的字符串有多个，可选择要替换哪一个
  [leo@VM-8-17-centos ~]$sed 's/fire/leave/2' newtargetfile
  The first round of enemies is coming, fire! leave!!
  The second round of enemies is coming, fire! leave!!
  The third round of enemies is coming, fire! leave!!
  The fourth round of enemies is coming, fire! leave!!
  # g: 替换所有匹配到的字符串
  [leo@VM-8-17-centos ~]$sed 's/fire/leave/g' newtargetfile
  The first round of enemies is coming, leave! leave!!
  The second round of enemies is coming, leave! leave!!
  The third round of enemies is coming, leave! leave!!
  The fourth round of enemies is coming, leave! leave!!
  # p: 打印被处理的行
  [leo@VM-8-17-centos ~]$sed -n '/second/s/fire/run/gp' newtargetfile
  The second round of enemies is coming, run!run!
  ```



- **c** 行替换

  如果选取了n到m行，最后只会保留一行

  ```shell
  # 行替换
  [leo@VM-8-17-centos ~]$sed '3c\newline' targetfile 
  The first round of enemies is coming, ready fight!
  The second round of enemies is coming, ready fight!
  newline
  The fourth round of enemies is coming, ready fight!
  [leo@VM-8-17-centos ~]$sed '2,4c\newline' targetfile 
  The first round of enemies is coming, ready fight!
  newline
  ```



**打印**

sed本来就会打印，加p命令会多打印一次

```shell
[leo@VM-8-17-centos ~]$sed '1p' targetfile 
The first round of enemies is coming, ready fight!
The first round of enemies is coming, ready fight!
The second round of enemies is coming, ready fight!
The third round of enemies is coming, ready fight!
The fourth round of enemies is coming, ready fight!
```



## 命令选项

-e : 使用多个命令

```shell
[leo@VM-8-17-centos ~]$sed -e 's/enemies/devils/;s/ready fight/run/' targetfile 
The first round of devils is coming, run!
The second round of devils is coming, run!
The third round of devils is coming, run!
The fourth round of devils is coming, run!
```

-f : 从文件读取编辑器命令。适用于日常重复执行的场景

```shell
# 先写好一个命令文件
[leo@VM-8-17-centos ~]$sudo vim cmd
1i\Hey, guys!
s/enemies/devils/
s/fight/run/
# 使用-f 调用命令文件
[leo@VM-8-17-centos ~]$sed -f cmd targetfile 
Hey, guys!
The first round of devils is coming, ready run!
The second round of devils is coming, ready run!
The third round of devils is coming, ready run!
The fourth round of devils is coming, ready run!
```

-n : 抑制内存输出，这样p就不会多输出一遍所有文本

```shell
[leo@VM-8-17-centos ~]$sed -n '3p' targetfile
The third round of enemies is coming, ready fight
```

-r : 支持正则表达式

```shell
[leo@VM-8-17-centos ~]$sed -n '/^(The first)/p' targetfile
[leo@VM-8-17-centos ~]$sed -nr '/^(The first)/p' targetfile
The first round of enemies is coming, ready fight!
```

**-i** : 修改文件内容。 如果不带`-i` , 只是在缓存中处理文件，不会改动原文件。

注意`-i`是不可逆操作，重要文件记得先备份。可以直接用`-i.bak`选项，会自动备份。

```shell
[leo@VM-8-17-centos ~]$sed -i.bak '2a\newline' targetfile
[leo@VM-8-17-centos ~]$ls |grep tar
newtargetfile
targetfile
targetfile.bak
[leo@VM-8-17-centos ~]$cat targetfile
The first round of enemies is coming, ready fight!
The second round of enemies is coming, ready fight!
newline
The third round of enemies is coming, ready fight!
The fourth round of enemies is coming, ready fight!
```



[83_sed命令选项及标志_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Tf4y1v7E2?p=83&vd_source=8946b673988ae09d60a531f22eb29f1e)
