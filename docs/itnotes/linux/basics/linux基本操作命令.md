---
title: 简易命令

---
> 参考书本：《快乐的 Linux 命令行》
> 中英双译

[tlcl-en-cn.pdf](https://www.yuque.com/attachments/yuque/0/2020/pdf/2648572/1603201561114-430e3951-2212-47b5-bf2e-84a84d7df655.pdf)
linux命令在线手册：[https://www.linux-man.cn/](https://www.linux-man.cn/)

linux命令查询：https://www.linuxcool.com/

## 进程
ps ： 查询进程

pidof 服务名称 ： 查询对应pid

kill pid ： 终止该pid对应的进程

killall 服务名称 ： 终止该服务的所有进程

## 系统信息

uname -a ：查看系统内核与系统版本等信息

系统版本详细信息：cat /etc/redhat-release

uptime ：查看系统负载信息

free -h ：内存使用量

top：实时显示运行中的程序的内存资源使用

du：查看文件或目录占磁盘空间大小

- -h：以人类可读方式显示
- -s：显示目录占用的磁盘空间大小，不要显示其下子目录和文件占用的磁盘空间大小
- -a：显示目录占用的磁盘空间大小，还要显示其下目录和文件占用磁盘空间的大小
- -c：显示几个目录或文件占用的磁盘空间大小，还要统计它们的总和
- --apparent-size：显示文件或目录自身大小，而不是它们占用的磁盘空间大小

df -h：查看系统磁盘总量和使用量

who ：当前登入主机的用户终端信息

last：所有登陆记录

history ：显示历史执行过的命令。history -c 清除历史

sosreport ：收集诊断信息

sar -nh DEV 1：查看实时流量（需安装sysstat）


## 文本文件查看
pwd ：当前目录

ls | -a：显示包括隐藏文件 | -l 文件属性、大小（简写ll）
ls 路径：可列出其他目录的内容

cd - ：上一个目录 | cd ~ ：用户home目录

cat | -n：显示行号

more ：查看内容较多的纯文本，空格、回车翻页。

head -n 数字 ：查看纯文本的前n行

tail -n 数字 ：后n行 | tail -f 持续刷新文件内容，可实时查看日志文件

wc 查看文本的 | -l 行数 | -w 单词数 | -c 字节数

stat 查看文件的具体存储信息和时间等信息

cut 按“列”提取文本字符
例：cut -d：-1 文件 ：提取以冒号（：）为间隔符号的第一列内容

diff 比较多个文本文件的差异

```bash
（先使用 cat 命令分别查看 diff_A.txt 和 diff_B.txt 文件的内容，然后进行比较）
cat diff_A.txt
cat diff_B.txt
diff --brief diff_A.txt diff_B.txt 判断是否相同
diff -c diff_A.txt diff_B.txt 描述不同的内容
```

## 文本目录管理
touch 创建空白文件或设置文件的时间

touch filename 创建空白文件

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603201164148-b35bc715-086e-4d2c-9d25-b5cc80f7c786.png)

例：

```bash
[root@linuxprobe ~]# touch -d "2017-05-04 15:44" anaconda-ks.cfg
[root@linuxprobe ~]# ls -l anaconda-ks.cfg
-rw-------. 1 root root 1260 **May 4 15:44 **anaconda-ks.cfg
```

mkdir 创建目录

mkdir -p 递归创建目录 eg:# mkdir -p a/b/c/d/e

cp 复制文件或目录，格式为“cp [选项] 源文件 目标文件”

➢ 如果目标文件是目录，则会把源文件复制到该目录中；

➢ 如果目标文件也是普通文件，则会询问是否要覆盖它；

➢ 如果目标文件不存在，则执行正常的复制操作。
![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603201164678-140302f9-9f1f-4a76-a2e4-90d0b0dbe024.png)
mv 命令用于剪切文件或将文件重命名

格式:“mv [选项] 源文件 [目标路径|目标文件名]”

rm 命令用于删除文件或目录

rm -f 不询问，强制删除

rm -r 删除目录要加r，r表示递归

file 文件名：查看文件的类型

有个dd命令，不知有什么实际用处


## 打包压缩与搜索

tar 压缩或解压

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603201165211-3adbe489-bbd1-4026-b455-b9b2096880ca.png)

注：f参数一定要放在最后

grep 在文本中执行关键词搜索，并显示匹配的结果

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603201165746-9be3363c-8937-40b9-a254-49292b345948.png)

例：grep /sbin/nologin /etc/passwd

（/etc/passwd 文件是保存着所有的用户信息，而一旦用户的登录终端被

设置成/sbin/nologin，则不再允许登录系统)

find 按照指定条件来查找文件

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603201166267-ada1b516-4246-4b76-afa8-4a108f13f81c.png)
![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603201166692-9a3469f8-8cb1-40e5-8192-06617df14357.png)

find /etc -name "host*" -print //获取到该目录中所有以 host 开头的文件列表

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603201167116-c1f0507c-2fde-4404-9a62-212635e9edbb.png)

