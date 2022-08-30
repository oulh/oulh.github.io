---
title: 搭建个人Leanote云笔记本
date: 2020-10-21
---

### 安装MongoDB

Leanote云笔记使用MongoDB作为后端数据库，按照以下步骤按照MongoDB数据库。

1. 执行以下命令，安装MongoDB。
```shell
yum -y install mongodb mongodb-server.x86_64 mariadb-devel.i686
```

2. 执行以下命令，启动MongoDB服务。
```shell
systemctl start mongod
```

3. 执行以下命令，查看MongoDB运行状态。
```shell
systemctl status mongod
```
![img](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200926151632.png)

### 安装Leanote

1. 下载Leanote二进制安装包。
```shell
wget https://nchc.dl.sourceforge.net/project/leanote-bin/2.6.1/leanote-linux-amd64-v2.6.1.bin.tar.gz
```

2. 解压安装包。
```shell
tar -zxvf leanote-linux-amd64-v2.6.1.bin.tar.gz
```

3. 编辑文件leanote/conf/app.conf，在文件中找到`app.secret`项，将该项的值改为任意字符串。（如不修改将会有安全风险）。

说明： 根据Leanote官方文档，如不修改app.secret项的值，将会有安全隐患。
```shell
a. vim leanote/conf/app.conf
b. 输入:/app.secret=并按下回车查找app.secret位置。
c. 按下i键进入编辑模式，修改该项的值为任意字符串。
d. 按下esc键退出编辑模式，输入:wq保存并退出vim编辑器。
```
![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20200926152414967.png)

4. 初始化数据库。
```shell
mongorestore -h localhost -d leanote --dir /root/leanote/mongodb_backup/leanote_install_data/
```

5. 启动服务。
```shell
nohup bash /root/leanote/bin/run.sh > /root/leanote/run.log 2>&1 &
```

6. 访问云笔记。

在浏览器中访问`http://<ECS公网地址>:9000`, 此前要先在安全组中开放9000端口。
默认管理用户为`admin`，密码为`abc123`
![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200926153757.png)
