---
title: shell流程控制
sidebar_position: 7
---



## if判断语句

格式

```shell
if [ condition ]
	then
		commands
fi
```

if...else

```shell
if [ condition ]     
     then
          commands1
else
          commands2
fi 
```

if...elif...else

```shell
if [ condition 1 ]
     then
            command1
elif [ condition 2 ]
     then
             commands2
  .......
else
            commandsX
fi
```



比较运算、逻辑运算、文件运算皆可用于if条件。

### if的高级特性

**双圆括号** 

`if (( expression-condition ))`

可以在条件中植入数学表达式

```shell
if (( (5+5-5)*5/5 > 10 ))
    then
        echo "yes"
else
        echo "no"
fi
```



**双方括号** 

可以在条件中使用通配符。

```shell
for var in  ab ac rx bx rvv vt
   do
       if [[ "$var" == r* ]]
	  then
		echo "$var"
       fi
done
```

### 简写if

条件为真采用&&符号链接命令块，条件为假采用||链接命令块。

```shell
if [ ! -d /tmp/baism ]
    then
        mkdir /tmp/baism
fi

可以简写为

[ ！ -d /tmp/baism ] && mkdir /tmp/baism
```

```shell
if [ $USER == 'root' ]
	  then
	      echo "hello root"
else
			  echo "hello guest"
fi

可以简写
[ $USER == 'root' ]&&echo "hello root" || echo "hello guest"
```



## for循环语句

**基本格式**

```shell
for variable_name in {list}
     do
          command 
          command
          …
     done
```

or

```shell
for variable in a b c
     do
         command
         command
     done
```



**for条件的赋值方式**

范围

```shell
for var in {1..10}
	do 
			echo $var
done
```

命令

```shell
for var in `seq  10`
	do 
			echo $var
done
```

 直接赋值

```shell
for var in 1 2 3 4 5
	do 
			echo $var
done
```



其他花式赋值

```shell
[21:45:30 root@VM-8-17-centos ~]#for var in $(seq 5);do echo $var;done
1
2
3
4
5
[21:45:40 root@VM-8-17-centos ~]#for var in {5..1};do echo $var;done
5
4
3
2
1
[21:46:06 root@VM-8-17-centos ~]#for var in {0..10..2};do echo $var;done
0
2
4
6
8
10
[21:46:36 root@VM-8-17-centos ~]#for var in {10..1..-2};do echo $var;done
10
8
6
4
2
[21:47:19 root@VM-8-17-centos ~]#for var in `seq 10 -2 1`;do echo $var;done
10
8
6
4
2
```

还能从shell的参数获取

```shell
#!/bin/bash
#
for i in $@;do
  echo $i
  sum=$((sum+$i))
done
echo "平均数为"$[$sum/$#]
echo "总和为"$sum
```

```shell
[22:28:18 root@study]#bash sum.sh 22 55 74
22
55
74
平均数为50
总和为151
```



### 不带列表的循环

不带列表的for循环执行时由**用户指定参数和参数的个数**

```shell
#!/bin/bash
# nonelist-for.sh
for var
do
echo $var
done

echo "脚本后面有$#个参数"
```

执行以上脚本

```shell
[22:13:07 root@study]#bash nonelist-for.sh A
A
脚本后面有1个参数
[22:13:19 root@study]#bash nonelist-for.sh A 3 33
A
3
33
脚本后面有3个参数
```

### for嵌套

**嵌套for**

```shell
#!/bin/bash
# 
#Author: 
#Created Time: 
#Release: 
#Description: 打印99乘法表
for ((A=1;A<=9;A++))
  do
     for ((B=1;B<=$A;B++))
        do
           echo -n -e "$B*$A=$((A*B)) \t"
     done
     #换行
     echo 
done
```

**嵌套if**

```shell
#!/bin/bash
#Description:输出1-9，当输出5时停止输出

for ((num=1;num<10;num++))
   do
     echo $num
     [ $num -eq 5 ]&& break
done
```

### **for循环与数组**

使用for循环遍历读出数组

```shell
name=('tom' 'jarry' 'harry' 'barry')
for i in 0 1 2 3
  do
      echo ${name[$i]}
 done
```

使用for循环进行数组存值

```shell
for i in `seq 0 9`
  do
     read -p "name: " name[$i]
 done
```



## while循环语句

应用在未知循环次数的环境。条件为真就进入循环；条件为假就退出循环。

**语法：**

```shell
while [ 表达式 ]
	do
		command...
	done
	
while  [ 1 -eq 1 ]    或者 (( 1 > 2 ))
  do
     command
     command
     ...
 done
```



**特殊条件**

while语句中可以使用特殊条件来进行循环：

- 符号":" 条件代表真，适用与无限循环
- 字符串 “true” 条件代表真，适用与无限循环
- 字符串 "false"条件代表假

### while嵌套

while可以嵌套if、for、while

```shell
#!/bin/bash
#Description: 99乘法表
A=1
while [ $A -lt 10 ]
  do
      #定义B
      B=1
      while [ $B -le $A ]
        do
          echo -n -e "$B*$A=$((A*B)) \t"
          let B++
      done

   echo 
   let A++
done
```



## 循环控制

### sleep语句

作用：控制循环几秒一次

```shell
#!/bin/bash 
#Description: 倒计时游戏

#1.定义初始值
time=9

#2.循环输出，1秒一次
while [ $time -ge 0 ]
  do
     echo -n -e  "\b$time"
     let time--
     #控制循环 1秒一次	
     sleep 1
done
```

### break语句

作用: 终止循环，执行循环体后面的代码

```shell
#!/bin/bash
#Description: 输出数字1-9，当输出5时停止
num=1
while [ $num -lt 10 ]
  do
     echo $num

     #判断当前num的值，如果等于5就跳出循环
     if [ $num -eq 5 ]
        then
		break
     fi
     let num++
done
```

### continue语句

作用: 跳过某次循环，继续执行下一次循环；表示循环体内下面的代码不执行，重新开始下一次循环

```shell
#!/bin/bash
#Description: 输出数字1-9,当等于5时跳过本次循环，输出1、2、3、4、6、7、8、9
num=0
while [ $num -lt 9 ]
  do
     let num++
     #判断当前num的值，如果等于5就跳过本次循环
     if [ $num -eq 5 ]
        then
		continue
     fi
     echo $num
done
```



### 参数控制命令shift

作用: 外部传参到循环时，参数管理命令

使位置参数向左移动，默认移动1位，可以使用shift n。传参个数要是n的整数倍，否则最后会一直剩下一个参数

```shell
#!/bin/bash

[ $# -lt 3 ]&&echo '请输入至少三个参数:'$0' $1 $2 $3 ...'&&exit 1
count=$#

#通过shift左移参数输出
#使位置参数向左移动，默认移动1位，可以使用shift 2,传参要是2的整数倍
for ((i=1;i<=$count;i++))
  do
    echo '目前参数数量: '$#''
    echo '当前$1的数值是: '$1''
    shift 1
    sleep 1
done
echo "执行完毕"
```

```shell
[root@study]#bash shift.sh 3 5 7 2 
目前参数数量: 4
当前$1的数值是: 3
目前参数数量: 3
当前$1的数值是: 5
目前参数数量: 2
当前$1的数值是: 7
目前参数数量: 1
当前$1的数值是: 2
执行完毕
```

### 脚本退出命令exit

作用: 退出程序并释放占用的系统资源

```shell
for i in `seq 1 9`
  do
      echo $i
      if [ $i -eq 5 ]
 	then
	   exit 0  # 退出脚本，返回状态码0
	fi
done
echo "执行完毕"
```



## 流程控制 until语句

一个类似while的循环语句，不同于while的是，当条件为假时开始until循环。

**条件为假就进入循环；条件为真就退出循环。**

```shell
until expression
	do
		command
		command
		...
	done
```

例

```shell
i=1
while [ $i -le 5 ]
do
	echo $i
	let i++
	until [ $i -le 5 ]
		do
		    echo $i
	            let i++
	            [ $i -eq 10 ]&&break
	done
done
```



## case语句

特点：根据给予的不同条件执行不同的代码块

语法：

```shell
case $var in            # 定义变量;var代表是变量名
pattern 1)
    command1            # 需要执行的语句
    ;;                  # 两个分号代表命令结束
pattern 2)
    command2
    ;;
pattern 3)
    command3
    ;;
		*)              # default，不满足以上模式，默认执行*)下面的语句
    command4
    ;;
esac  # esac表示case语句结束
```



例：nginx启动管理脚本 nginx.sh

bash nginx.sh start|stop|restart|reload|status

```shell
#!/bin/bash
#Description: 
#Author: www.zutuanxue.com
#Created Time: 
#nginx service manage script

#variables
nginx_install_doc=/usr/local/nginx
proc=nginx
nginxd=$nginx_install_doc/sbin/nginx
pid_file=$nginx_install_doc/logs/nginx.pid

# Source function library.
if [ -f /etc/init.d/functions ];then
   . /etc/init.d/functions
else
   echo "not found file /etc/init.d/functions"
   exit
fi

#假如pid文件存在，那么统计一下nginx进程数量
if [ -f $pid_file ];then
   nginx_process_id=`cat $pid_file` 
   nginx_process_num=`ps aux |grep $nginx_process_id|grep -v "grep"|wc -l`
fi


#function
start () {
#如果nginx 没有启动直接启动，否则报错 已经启动
if [ -f $pid_file ]&&[ $nginx_process_num -ge 1 ];then
   echo "nginx running..."
else
   #如果pid文件存在，但是没有进程，说明上一次非法关闭了nginx,造成pid文件没有自动删除,所以启动nginx之前先删除旧的pid文件
   if [ -f $pid_file ] && [ $nginx_process_num -lt 1 ];then
        rm -f $pig_file
	#可以使用两个函数，两种方法来执行命令，并返回执行结果
        #1)daemon
        #2)action   建议这个，简单易用
        
	#echo " nginx start `daemon $nginxd` "
        action "nginx start" $nginxd
  fi
  #echo " nginx start `daemon $nginxd` "
  action "nginx start" $nginxd
fi

}

stop () {
#判断nginx启动的情况下才会执行关闭，如果没启动直接报错，或者提示用户服务没启动,这里我直接报错的原因是为了给大家演示失败的输出
if [ -f $pid_file ]&&[ $nginx_process_num -ge 1 ];then
     action "nginx stop" killall -s QUIT $proc
     rm -f $pid_file
else
     action "nginx stop" killall -s QUIT $proc 2>/dev/null
fi
}

restart () {
  stop
  sleep 1
  start
}

reload () {
#重载的目的是让主进程重新加载配置文件,但是前提是服务必须开启
#这里先判断服务是否开启，开启就执行加载，没有开启直接报加载错误
if [ -f $pid_file ]&&[ $nginx_process_num -ge 1 ];then
    action "nginx reload" killall -s HUP $proc
else
    action "nginx reload" killall -s HUP $proc 2>/dev/null
fi
}

status () {
if [ -f $pid_file ]&&[ $nginx_process_num -ge 1 ];then
 echo "nginx running..."
else
 echo "nginx stop"
fi 
}

#callable
case $1 in 
start) start;;
stop) stop;;
restart) restart;;
reload) reload;;
status) status;;
*) echo "USAGE: $0 start|stop|restart|reload|status";;

esac
```

