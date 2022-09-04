---
title: top命令详解
sidebar_position: 2
---



## top视图各个字段含义

`top` 

![image-20220626152507548](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220626152507548.png)

**第一行：**

1. 当前系统时间；

2. 系统已连续运行时间；

3. 当前登陆系统的用户个数；

4. 负载情况（后面的三个数分别是 过去1 分钟、过去5 分钟、过去15 分钟的负载情况）

   load average 数据是每隔 5 秒钟检查一次活跃的进程数，然后按特定算法计算出的数值。如果这个数除以逻辑 CPU 的数量，结果高于 5 的时候就表明系统在超负荷运转了。

**第二行：进程数量（单位/个）**

Tasks任务（进程）总数；running(运行中)进程数量；sleeping(休眠中)；stoped(停止状态)；zombie（僵死状态）

**第三行：cpu 状态（单位/%）**

1. us — 用户空间（user）占用 CPU 的百分比
2. sy — 内核空间（system）占用 CPU 的百分比
3. ni — 改变过优先级（nice）的进程占用 CPU 的百分比
4. id — 闲置（idle） CPU 百分比
5. wa — IO 等待（waiting）占用 CPU 的百分比
6. hi — 硬中断（Hardware IRQ）占用 CPU 的百分比
7. si — 软中断（Software Interrupts）占用 CPU 的百分比

| 监控项名称         | 监控项含义                | 单位 | 说明                                                         |
| ------------------ | ------------------------- | ---- | ------------------------------------------------------------ |
| Host.cpu.idle      | 当前空闲CPU百分比         | %    | 当前CPU处于空闲状态的百分比                                  |
| Host.cpu.system    | 当前内核空间占用CPU百分比 | %    | 指系统上下文切换的消耗,该监控项数值比较高，说明服务器开了太多的进程或者线程 |
| Host.cpu.user      | 当前用户空间占用CPU百分比 | %    | 用户进程对CPU的消耗                                          |
| Host.cpu.iowait    | 当前等待IO操作的CPU百分比 | %    | 该项数值比较高说明有很频繁的IO操作                           |
| Host.cpu.other     | 其他占用CPU百分比         | %    | 其他消耗，计算方式为（Nice + SoftIrq + Irq + Stolen）的消耗  |
| Host.cpu.totalUsed | 当前消耗的总CPU百分比     | %    | 指以上各项CPU消耗的总和，通常用于报警                        |

**第四行：内存状态（单位/k）**

1. total — 物理内存总量（4GB）
2. used — 使用中的内存总量（3.6GB）
3. free — 空闲内存总量（148M）
4. buff/cache — 缓存的内存量 （359M）

**第五行：swap 交换分区（单位/k）**

1. total — 交换区总量（4G）
2. used — 使用的交换区总量（0M）
3. free — 空闲交换区总量（4G）
4. cached — 缓冲的交换区总量（2483M）

第四行中使用中的内存总量（used）指的是现在系统内核控制的内存数，空闲内存总量（free）是内核还未纳入其

管控范围的数量。纳入内核管理的内存不见得都在使用中，还包括过去使用过的现在可以被重复利用的内存，内核

并不把这些可被重新使用的内存交还到 free 中去，因此在 linux 上 free 内存会越来越少，但不用为此担心。

如果出于习惯去计算可用内存数，这里有个近似的计算公式：第四行的 free + 第四行的 buffers + 第五行的 cached

对于内存监控，在 top 里我们要时刻监控第五行 swap 交换分区的 used，如果这个数值在不断的变化，说明内核

在不断进行内存和 swap 的数据交换，这是真正的内存不够用了。

**第六行：**是空行

**第七行以下：各进程（任务）的状态监控**

    PID — 进程 id

    USER — 进程所有者

    PR — 进程优先级

    NI — nice 值。负值表示高优先级，正值表示低优先级

    VIRT — 进程使用的虚拟内存总量，单位 kb。VIRT=SWAP+RES

    RES — 进程使用的、未被换出的物理内存大小，单位 kb。RES=CODE+DATA

    SHR — 共享内存大小，单位 kb

    S — 进程状态。D = 不可中断的睡眠状态 R = 运行 S = 睡眠 T = 跟踪 / 停止 Z = 僵尸进程

    %CPU — 上次更新到现在的 CPU 时间占用百分比

    %MEM — 进程使用的物理内存百分比

    TIME+ — 进程使用的 CPU 时间总计，单位 1/100 秒

    COMMAND — 进程名称（命令名 / 命令行）

## 参数解释

```shell
$ top -h
  procps-ng version 3.3.10
Usage:
  top -hv | -bcHiOSs -d secs -n max -u|U user -p pid(s) -o field -w [cols]
```

-b：每刷新一次换行输出，而不是覆盖上一次的输出结果。要将内容输出到文件中，必须使用-b

-c：command字段显示整个命令行，而不只是命令名

-S：累计模式

-s：使top命令在安全模式中运行，可避免交互命令带来的潜在危险

-d 秒数：刷新时间间隔

-n：刷新的次数，完成后退出top

-u或-U userUID：只显示属于某user的进程

-p PID：只显示指定的进程号

-o field：设置排序字段，field要写完整的"%CPU"，不能只填"CPU"



例：将top前五行的信息写入一个临时的文件

```shell
top -b -n 8 |grep -A 5 'top -' > /tmp/top_tmp.txt
# -n是获取8次top的信息，-A是获取搜索到'top -'开始的后五行
```

## 实用交互命令

> h 或者? 显示帮助画面，给出一些简短的命令总结说明。 
>
> Ecs 退出命令交互，也有手动刷新监控结果的作用。
>
> q 退出程序。 
>
> 1 展开多核cpu显示
>
> k 终止一个进程。系统将提示用户输入需要终止的进程PID，以及需要发送给该进程什么样的信号。一般的终止进程可以使用15信号；如果不能正常结束那就使用信号9强制结束该进程。默认值是信号15。在安全模式中此命令被屏蔽。 
>
> i 不显示任何闲置 (idle) 或无用 (zombie) 的进程
>
> r 重新安排一个进程的优先级别。系统提示用户输入需要改变的进程PID以及需要设置的进程优先级值。输入一个正值将使优先级降低，反之则可以使该进程拥有更高的优先权。默认值是10。 
>
> S 切换到累计模式。 
>
> s 改变两次刷新之间的延迟时间。系统将提示用户输入新的时间，单位为s，可填小数。输入0值则将不断刷新。需要注意的是如果设置太小的时间，很可能会引起不断刷新，从而根本来不及看清显示的情况，而且系统负载也会大大增加。 
>
> f或F 从当前显示中添加或者删除项目。 
>
> o或者O 改变显示项目的顺序。
>
> l 切换显示平均负载和启动时间信息。 
>
> m 切换显示内存信息。 
>
> t 切换显示进程和CPU状态信息。 
>
> c 切换显示命令名称和完整命令行。 
>
> M 根据驻留内存大小进行排序。 
>
> P 根据CPU使用百分比大小进行排序。 
>
> T 根据时间/累计时间进行排序。 
>
> w 将当前设置写入~/.toprc文件中。这是写top配置文件的推荐方法。

## 一些top实用操作详说

### 多 U 多核 CPU 监控

在 top 基本视图中，**按键盘数字 “1”，可监控每个逻辑 CPU 的状况：**

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/16027-20160520170601998-947560755.png)

观察上图，服务器有 4 个逻辑 CPU，实际上是 1 个物理 CPU。

如果不按 1，则在 top 视图里面显示的是所有 cpu 的平均值。

### 进程字段排序和高亮

默认进入 top 时，各进程是按照 CPU 的占用量来排序的。可以通过”**shift + >**” 或”**shift + <**” 可以向右或左改变排序列，可结合字段高亮效果，使视图更有可观性，可以这样操作：

1. 敲击键盘 “**y**”（打开 / 关闭**运行态(R)进程**高亮效果）

2. 敲击键盘 “**x**”（打开 / 关闭**排序列**的高亮效果）
3. 敲击键盘”**b**“（打开/关闭**荧光**效果）

![image-20220626161447246](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220626161447246.png)

4. 通过”shift + >” 改成按%MEM排列

   ![image-20220626162953950](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220626162953950.png)

#### 快速排序

快速按%CPU、%MEM、TIME+列排序

%CPU：按下大写字母”P“键

%MEM：按下大写字母”M“键

TIME+：按下大写字母”T“键

TOP默认排序为倒序，如果确实需要升序排序，可以使用大写字母按键：R

### 改变进程显示字段

1. 敲击 “f” 键，top 进入另一个视图，在这里可以编排基本视图中的显示字段：只对当前top视窗生效，重新运行top则恢复默认视图

![image-20220626165026486](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220626165026486.png)

带”*“的是显示字段，按”d“或空格键设置显示或隐藏某字段；

按右箭头方向键，再通过上下方向键可改变字段位置，然后按Enter或再按一次左方向键确认；

按”s“设置成默认的排序字段；

按”q“或Ecs保存退出；







## top命令一些补充

top 命令是 Linux 上进行系统监控的首选命令，top 命令的监控最小单位是进程。更多细节可以结合其他命令来实现。

### 线程相关

例如， 查看java 线程数和客户连接数

```shell
#监控 java 线程数
ps -eLf | grep java | wc -l
#监控网络客户连接数
netstat -n | grep tcp | grep 侦听端口 | wc -l
```

上面两个命令，可改动 grep 的参数，来达到更细致的监控要求。



在 Linux 系统 “一切都是文件” 的思想贯彻指导下，所有进程的运行状态都可以用文件来获取。系统根目录 / proc 

中，每一个数字子目录的名字都是运行中的进程的 PID，进入任一个进程目录，可通过其中文件或目录来观察进程

的各项运行指标，例如 task 目录就是用来描述进程中线程的，因此也可以通过下面的方法获取某进程中运行中的

线程数量（PID 指的是进程 ID）：

`ls /proc/'PID'/task | wc -l` 

在 linux 中还有一个命令 pmap，来输出进程内存的状况，可以用来分析线程堆栈：

`pmap 'PID'` 

### 进程相关

`ps -ef | grep '进程名' `

```shell
$ ps -ef |grep mongod
UID        PID  PPID  C STIME TTY          TIME CMD
root     23612 26346  0 17:39 pts/0    00:00:00 grep --color=auto mongod
polkitd  27329 27315  0 May21 pts/0    03:33:13 mongod --bind_ip_all
```

-e 显示所有进程。

-f 全格式。

UID：进程拥有者，指的是用户ID

PID：该进程的 ID

PPID ：PID的上级父进程的ID

C ：CPU使用的资源百分比

STIME ：系统启动时间

TTY： 登入者的终端机位置

TIME ：使用掉的 CPU时间

CMD：所下达的指令



`cat /proc/your_PID/status`

显示很多进程相关信息。

### 系统平均负载监控

`watch -n 10 cat /proc/loadavg`

output: 

0.16 0.06 0.06 8/457 5288

除了前3组数字分别表示一分钟、五分钟、十五分钟的平均进程数量；第四组数字，分母表示系统进程总数，分子表示正在运行的进程数；最后一个数字表示最近运行的进程ID。

| 监控项名称  | 监控项含义               | 单位 |
| ----------- | ------------------------ | ---- |
| Host.load1  | 过去1分钟的系统平均负载  | 无   |
| Host.load5  | 过去5分钟的系统平均负载  | 无   |
| Host.load15 | 过去15分钟的系统平均负载 | 无   |

### 查看内存信息

`vmstat -s -S M ` 

该命令可以查看包含内存每个项目的报告，通过 - S M 或 - S k 可以指定查看的单位，默认为 kb。结合 watch 命令就可

以看到动态变化的报告了。

也可用  `cat /proc/meminfo` ，使用watch实时查看： `watch cat /proc/meminfo`

### 查看cpu信息

总核数 = 物理 CPU 个数 X 每颗物理 CPU 的核数

总逻辑 CPU 数 = 物理 CPU 个数 X 每颗物理 CPU 的核数 X 超线程数

```shell
#查看 cpu 的配置信息
cat /proc/cpuinfo #它能显示诸如 CPU 核心数，时钟频率、CPU 型号等信息。
#查看物理 CPU 个数
cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l
#查看每个物理 CPU 中 core 的个数 (即核数)
cat /proc/cpuinfo| grep "cpu cores"| uniq
#查看逻辑 CPU 的个数
cat /proc/cpuinfo| grep "processor"| wc -l
#查看 CPU 信息（型号）
cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c
```



要查看 cpu 波动情况的，尤其是多核机器上，可使用

`mpstat -P ALL 10`

该命令可间隔 10 秒钟采样一次 CPU 的使用情况，每个核的情况都会显示出来，例如，每个核的 idle 情况等。

还有一个： `sar -P ALL`。



只需查看均值的，可用

`iostat -c` 

### 查看内核版本

uname -a

或 cat /proc/version

### 查看系统发行版本

cat /etc/issue

rehat系：cat /etc/redhat-release

### 查看机器型号

dmidecode | grep "Product Name"

### IO 相关

`iostat -P ALL`

该命令可查看所有设备使用率、读写字节数等信息。

### watch命令

在Linux下，watch是周期性的执行一个程序，并全屏显示执行结果。

watch可以帮你监测一个命令的运行结果，省得你一遍遍的手动运行。多用于周期性执行命令/定时执行命令

你可以拿他来监测你想要的一切命令的结果变化，比如 tail 一个 log 文件，ls 监测某个文件的大小变化，看你的想象力了！

命令格式：

` watch[参数][命令]`	

参数：

 -n或–interval watch 指定间隔的时间，缺省每2秒运行一下程序

 -d或–differences 高亮显示变化的区域。 而-d=cumulative选项会把变动过的地方(不管最近的那次有没有变动)都高亮显示出来。

 -t 或-no-title 会关闭watch命令在顶部的时间间隔,命令，当前时间的输出。

 -h, --help 查看帮助文档

交互：

切换终端： Ctrl+x

退出watch：Ctrl+g



> 参考 
>
> [https://www.cnblogs.com/dragonsuc/p/5512797.html](https://www.cnblogs.com/dragonsuc/p/5512797.html)
>
> [top命令查看CPU状态信息](https://www.cnblogs.com/xuanbjut/p/13391578.html)



## htop

与Linux传统的[top](http://lnmp.ailinux.net/top)相比，htop更加人性化。还能用鼠标操作！

[htop命令_Linux htop 命令用法详解：htop 是Linux系统中的一个互动的进程查看器 (ailinux.net)](http://lnmp.ailinux.net/htop)

## iotop



[iotop命令_Linux iotop 命令用法详解：用来监视磁盘I/O使用状况的工具 (ailinux.net)](http://lnmp.ailinux.net/iotop)
