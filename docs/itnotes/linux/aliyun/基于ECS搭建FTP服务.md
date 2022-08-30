---
title: 基于ECS搭建FTP服务
date: 2020-10-21
---

## 安装vsftpd

1. 安装vsftpd

```shell
yum install -y vsftpd
```

2. 设置FTP服务开机自启动。

```
systemctl enable vsftpd.service
```

3. 启动FTP服务。

```shell
systemctl start vsftpd.service
```

4. 查看FTP服务监听的端口。

```shell
 netstat -antup | grep ftp
```

![img](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200923210831132.png)

## **配置vsftpd**

> **匿名用户模式和本地用户模式只可同时配置一种。**


### **匿名用户模式**

1. 将匿名上传权限 anon_upload_enable=YES 的注释解开。

```
$ vim /etc/vsftpd/vsftpd.conf
```
（debian系统：/etc/vsftpd.conf）

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603088191011-ed548413-d3bc-43fa-9935-8a82258bd199.png)

2. 更改/var/ftp/pub目录的权限，为FTP用户添加写权限。

```shell
chmod o+w /var/ftp/pub/
```

3. 重启FTP服务。

```shell
systemctl restart vsftpd.service
```

### **本地用户模式**

1. 为FTP服务创建一个Linux用户。

```shell
 adduser ftptest
 #为用户设置密码
 passwd ftptest
```

![img](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/pxa-829-172.jpeg)

2. 创建一个供FTP服务使用的文件目录。

```shell
mkdir /var/ftp/test
```

3. 更改/var/ftp/test目录的拥有者为ftptest。

```shell
chown -R ftptest:ftptest /var/ftp/test
```

4. 修改vsftpd.conf配置文件。

配置FTP为主动模式请执行如下命令:

```shell
sed -i 's/anonymous_enable=YES/anonymous_enable=NO/' /etc/vsftpd/vsftpd.conf #禁止匿名登录FTP服务器  
sed -i 's/listen=NO/listen=YES/' /etc/vsftpd/vsftpd.conf #监听IPv4 sockets  
sed -i 's/listen_ipv6=YES/#listen_ipv6=YES/' /etc/vsftpd/vsftpd.conf #关闭监听IPv6 sockets 
sed -i 's/#chroot_local_user=YES/chroot_local_user=YES/' /etc/vsftpd/vsftpd.conf #全部用户被限制在主目录  
sed -i 's/#chroot_list_enable=YES/chroot_list_enable=YES/' /etc/vsftpd/vsftpd.conf #启用例外用户名单  
sed -i 's/#chroot_list_file=/chroot_list_file=/' /etc/vsftpd/vsftpd.conf #指定例外用户列表文件，列表中的用户不被锁定在主目录  
echo "allow_writeable_chroot=YES" >> /etc/vsftpd/vsftpd.conf  
echo "local_root=/var/ftp/test" >> /etc/vsftpd/vsftpd.conf #设置本地用户登录后所在的目录
```

配置FTP为被动模式请执行如下命令：

```shell
 sed -i 's/anonymous_enable=YES/anonymous_enable=NO/' /etc/vsftpd/vsftpd.conf #禁止匿名登录FTP服务器  
 sed -i 's/listen=NO/listen=YES/' /etc/vsftpd/vsftpd.conf #监听IPv4 sockets 
 sed -i 's/listen_ipv6=YES/#listen_ipv6=YES/' /etc/vsftpd/vsftpd.conf #关闭监听IPv6 sockets 
 sed -i 's/#chroot_local_user=YES/chroot_local_user=YES/' /etc/vsftpd/vsftpd.conf #全部用户被限制在主目录  
 sed -i 's/#chroot_list_enable=YES/chroot_list_enable=YES/' /etc/vsftpd/vsftpd.conf #启用例外用户名单  
 sed -i 's/#chroot_list_file=/chroot_list_file=/' /etc/vsftpd/vsftpd.conf #指定例外用户列表文件，列表中的用户不被锁定在主目录  
 echo "allow_writeable_chroot=YES" >> /etc/vsftpd/vsftpd.conf  
 echo "local_root=/var/ftp/test" >> /etc/vsftpd/vsftpd.conf #设置本地用户登录后所在的目录  
 echo "pasv_enable=YES" >> /etc/vsftpd/vsftpd.conf #开启被动模式  
 echo "pasv_address=<FTP服务器公网IP地址>" >> /etc/vsftpd/vsftpd.conf #本教程中为ECS服务器弹性IP 
 echo "pasv_min_port=20" >> /etc/vsftpd/vsftpd.conf #设置被动模式下，建立数据传输可使用的端口范围的最小值  
 echo "pasv_max_port=21" >> /etc/vsftpd/vsftpd.conf #设置被动模式下，建立数据传输可使用的端口范围的最大值
```

5. 在/etc/vsftpd目录下创建chroot_list文件，并在文件中写入例外用户名单。

> #使用vim命令编辑chroot_list文件，添加例外用户名单。此名单中的用户不会被锁定在主目录，可以访问其他目录。


```shell
vim /etc/vsftpd/chroot_list
```

说明: 没有例外用户时，也必须创建chroot_list文件，内容可为空。

6. 重启FTP服务。

```shell
systemctl restart vsftpd.service
```

## **连接FTP**

```
 ftp://<FTP服务器公网IP地址>:FTP端口
```


## vsftpd.conf 配置详解
```shell
anonymous_enable=NO                    #不允许匿名用户登陆 
local_enable=YES                      #vsftpd所在系统的用户可以登录vsftpd 
write_enable=YES                      #允许使用任何可以修改文件系统的FTP的指令 
local_umask=002                        #匿名用户新增文件的umask数值 
anon_upload_enable=NO                  #匿名用户不可以上传文件 
anon_mkdir_write_enable=NO            #匿名用户不可以修改文件 
xferlog_enable=YES                    #启用一个日志文件，用于详细记录上传和下载。                
use_localtime=YES                      #使用本地时间而不是GMT 
vsftpd_log_file=/var/log/vsftpd.log    #vsftpd日志存放位置 
dual_log_enable=YES                    #用户登陆日志 
connect_from_port_20=YES              #开启20端口      
xferlog_file=/var/log/xferlog          #记录上传下载文件的日志 
xferlog_std_format=YES                #记录日志使用标准格式 
idle_session_timeout=600              #登陆之后超时时间60秒，登陆之后，一分钟不操作，就会断开连接。 
chroot_local_user=YES                  #用于指定用户列表文件中的用户,是否允许切换到上级目录      
listen=YES                            #开启监听 
pam_service_name=vsftpd.vu            #验证文件的名字 
userlist_enable=YES                    #允许由userlist_file指定文件中的用户登录FTP服务器                    
tcp_wrappers=YES                      #支持tcp_wrappers,限制访问(/etc/hosts.allow,/etc/hosts.deny) 
guest_enable=YES                      #起用虚拟用户 
guest_username=taokey                  #虚拟用户名 

#user_config_dir=/etc/vsftpd/vsftpuser  #虚拟用户配置文件路径 
local_root=/usr/local/ftpFiles #自定义ftp上传路径（注意文件夹权限）
pasv_min_port=35000  
pasv_max_port=45000 
pasv_enable=YES 
pasv_promiscuous=YES 
anon_other_write_enable=YES
```
