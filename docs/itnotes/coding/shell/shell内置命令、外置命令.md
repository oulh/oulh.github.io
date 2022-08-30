---
title: shell内置命令、外置命令
---



## shell内置命令、外置命令

内置命令：在系统启动的时候就加载入内存，常驻内存，执行效率更高，但占用资源。

外置命令：系统需要从硬盘中读取程序文件，再读入内存加载

可通过`type`命令辨别命令属于内置还是外置

```shell
# 内置命令
$ type cd
cd is a shell builtin
# 外置命令
$ type top
top is /usr/bin/top
```


### 内、外置命令与shell的联系
**外置命令一定会开启子进程执行。**
例：
![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1656400761000-55265eff-eea2-4a6e-83de-9e75c8d93226.png)



```shell
[15:45:01 root@VM-8-17-centos tmp]#ps -f --forest
UID        PID  PPID  C STIME TTY          TIME CMD
root      3162  3154  0 14:54 pts/0    00:00:00 -bash
root     13183  3162  0 15:46 pts/0    00:00:00  \_ ps -f --forest
```

**内置命令不会产生子进程去执行。**

内置命令和shell是为一体的， 是shell的一部分， 不需要单独去读取某个文件， 系统启动后， 就执行在内存中了。

`compgen -b`可查看有哪些内置命令

```shell
$ compgen -b
.
:
[
alias
bg
bind
break
builtin
caller
cd
command
compgen
complete
compopt
continue
declare
dirs
disown
echo
enable
eval
exec
exit
export
false
fc
fg
getopts
hash
help
history
jobs
kill
let
local
logout
mapfile
popd
printf
pushd
pwd
read
readarray
readonly
return
set
shift
shopt
source
suspend
test
times
trap
true
type
typeset
ulimit
umask
unalias
unset
wait
```
