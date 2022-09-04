---
title: systemctl 服务管理
sidebar_position: 3
---



以httpd为例

## 启动、重启、停止、重载服务以及检查服务
```shell
systemctl start httpd.service
systemctl restart httpd.service
systemctl stop httpd.service
systemctl reload httpd.service
systemctl status httpd.service  #检测某服务是否正在运行
```
## 启用或禁用

列出所有服务（包括启用的和禁用的）
```shell
systemctl list-unit-files --type=service
```
激活服务并在启动时启用或禁用服务
```shell
systemctl is-active httpd.service
systemctl enable httpd.service
systemctl disable httpd.service
```
监测某服务是否启用
```shell
systemctl is-enabled httpd.service
enabled
```
杀死服务
```shell
systemctl kill httpd
```

更多systemctl命令：[https://linux.cn/article-5926-1.html](https://linux.cn/article-5926-1.html)
