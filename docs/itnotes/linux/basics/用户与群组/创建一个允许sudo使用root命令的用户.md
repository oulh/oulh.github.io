---
title: 创建一个允许sudo使用root命令的用户
---

## 新建用户

1. 切换到root用户
```shell
$ su root
```

2. 新建一个用户"xq"
```shell
$ useradd xq
# 会指定默认的用户目录/home/xq，默认的命令解释器/bin/bash
```

3. 为用户xq设置密码
```shell
$ passwd xq
```

4. 为用户xq指定用户目录
```shell
$ usermod -d /home/xq
```

5. 为用户xq指定命令解释程序（通常为/bin/bash）
```shell
$ usermod -s /bin/bash xq
```

6. 在passwd文件中查看新用户的属性

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603013419232-71d9fdd2-fa2f-4d4c-8916-23f730d9f764.png)

/etc/passwd中一行记录对应着一个用户，每行记录又被冒号(:)分隔为7个字段，其格式和具体含义如下：

> 用户名:口令:用户标识号:组标识号:注释性描述:用户主目录:命令解释程序

## 允许该用户以管理员身份执行指令

新用户使用sudo执行指令时，会出现以下错误：

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603012644091-11ef9dd3-cc16-4253-be9c-3b53fdb44b99.png)

切换到root用户，在 /etc/sudoers文件中，在`root ALL=(ALL:ALL) ALL` 这一行下面加入一行：

`xq ALL=(ALL:ALL) ALL`（有的系统中是ALL=(ALL) ALL）。

免输密码则`ALL=(ALL) NOPASSWD: ALL`

```shell
# 在以root开头的一行下面添加一行
$ sed -i '/^root/a\xq    ALL=(ALL:ALL) ALL' /etc/sudoers
```
![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603012471060-a7a21413-589d-4213-b5b3-77d757d806d8.png)

直接最后一行添加也行。注意/etc/sudoers是只读文件。
