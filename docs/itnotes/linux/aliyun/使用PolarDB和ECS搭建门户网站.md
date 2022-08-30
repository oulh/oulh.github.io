---
title: 使用PolarDB和ECS搭建门户网站
date: 2020-10-21
---

### 创建PolarDB数据库账号

1. 在 阿里云控制台首页 左侧导航栏，依次单击 产品与服务 > 云数据库PolarDB ，进入 云数据库PolarDB管理控制台 。
1. 在 **集群列表** 页面，单击 **集群ID** ，进入 **集群详情界面** 。

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200925221504.png)
![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200925221851.png)

3. 单击左侧导航栏 **配置与管理** > **账号管理** 。
3. 单击左上方 **创建账号** 。

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200925222418.png)

5. 配置账号信息，然后单击 **确定** 。

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200925222600.png)
### 创建数据库

1. 在实例详情页，单击左侧导航栏的 **数据库管理** ，然后单击 **创建数据库** 。

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200925223349.png)

2. 配置数据库信息，然后单击 **创建** 。

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200925223536.png)

- 数据库（DB）名称：输入数据库名称，例如：pbootcms 。
- 支持字符集：默认设为utf8mb4。
- 授权账号：选择上一步创建的数据库账号test2020。
- 账号类型：默认设置为读写。
- 备注说明：非必填。用于备注该数据库的相关信息，便于后续数据库管理，最多支持256个字符。
##### 设置数据库白名单

1. 连接数据库需要设置数据库白名单，点击 **[集群白名单]**，然后点击 **[设置]** 设置数据库集群白名单。

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200925224122.png)

2. 在白名单界面将默认的白名单地址127.0.0.1更改为 **0.0.0.0/0**，然后点击 **[确定]** 使白名单地址生效。

  **_注意，是0.0.0.0/0，不是0.0.0.0_**

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200926114001.png)
### 安装LAMP环境
LAMP是指运行在Linux下的Apache、MySQL和PHP的环境。参考以下操作在云服务器上安装开发环境。

1. 在ECS服务器上，执行以下命令安装Apache服务及其扩展包。
```
yum -y install httpd httpd-manual mod_ssl mod_perl mod_auth_mysql
```

2. PbootCMS是使用PHP语言开发的CMS系统。参考以下操作安装PHP环境。

执行以下命令，安装PHP。
```
yum -y install php php-mysql gd php-gd gd-devel php-xml php-common php-mbstring php-ldap php-pear php-xmlrpc php-imap
```

3. 执行以下命令下载并安装MySQL。
```
wget http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql-community-server
```

4. 执行以下命令启动MySQL数据库。
```
systemctl start mysqld
```
### 搭建门户网站
在完成环境部署后，参考以下操作搭建门户网站。

1. 在ECS服务器上，执行以下命令，安装Git。
```
yum -y install git
```

2. 在ECS服务器上，执行以下命令下载PbootCMS源码文件。
```
cd ~ && git clone https://gitee.com/hnaoyun/PbootCMS.git
```

3. 执行以下命令将安装包拷贝到Apache的wwwroot目录下。
```
cp -r PbootCMS/* /var/www/html/
```

4. 执行以下命令修改站点根目录文件权限。
```
chmod -R a+w /var/www/html
```

5. 向数据库中导入CMS的初始数据。

执行以下命令初始化数据库pbootcms的表结构和数据。

**参数说明:**

- -h: 数据库连接地址(参见集群详情页面下方链接地址板块)

  ![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200926120516.png)

- -u: 数据库账号

- -p: 数据库密码

- -D: 数据库名称
```
sql_file="/var/www/html/static/backup/sql/"$(ls /var/www/html/static/backup/sql/) &&
mysql -h数据库连接地址 -utest2020 -ptest0926+ -Ddb2020 < $sql_file
```
![20200926114218](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200926114218-16560684994052.png)

6. 执行以下命令，修改CMS系统数据库配置。

**说明:** 在执行命令前，请根据参数说明替换您的数据库配置。

**_不要写错，不然连不上数据库_**

```
cat > /var/www/html/config/database.php << EOF
<?php
return array(
    'database' => array(
        'type' => 'mysqli', // 数据库连接驱动类型: mysqli,sqlite,pdo_mysql,pdo_sqlite
        'host' => '数据库连接地址', // PolarDB数据库链接地址
        'user' => 'test_user', // PolarDB数据库的用户名
        'passwd' => 'Password1213', // PolarDB数据库的密码
        'port' => '3306', // 数据库端口
        'dbname' => 'pbootcms' //数据库名称
    )
);
EOF
```

7. 返回ECS控制台，配置本实例安全组，开放80端口。
7. 重启 Apache服务。
```
systemctl restart httpd
```

9. 在浏览器地址栏输入云服务器的公网IP地址，进入**门户网站首页**。

系统后台默认访问路径为`http://<ECS公网IP地址>/admin.php`。默认账号为**admin**，密码为**123456**。

- 管理员页面

  ![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200926122030.png)

- 网站主页

![](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/20200926122142.png)
