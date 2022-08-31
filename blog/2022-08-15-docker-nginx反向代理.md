---
slug: docker-nginx-proxy
title: docker容器间用nginx反向代理
authors: Leo
tags: [proxy, docker]
---

现在有 docker 容器运行的两个 web 应用，两个域名，我希望只用80端口访问这两个web站点，其中一个要部署SSL。下面将通过 nginx 反向代理来实现。

<!--truncate-->

操作环境：

- 主机：单台主机，一个公网ip

- 相关容器

  - nginxproxy   用作nginx反向代理 （版本：nginx/1.23.1）（镜像：nginx:alpine）

  - jenkins   站点1

  - nginx-oulh   站点2

## docker network 设定

给各个容器分配同一个网络，并且设置别名分别为nginxproxy、jenkins、nginx-oulh，可以直接使用别名来互相通信，也避免ip地址变动带来的麻烦

```shell
[leo@CentOS7 ~]$docker network create webservice
b099067fea347f8f710e0c4cc10ad1e63fc65694e46b714557f8cd0336453fef
[leo@CentOS7 ~]$
[leo@CentOS7 ~]$docker network connect --alias nginxproxy webservice nginxproxy
[leo@CentOS7 ~]$docker network connect --alias jenkins webservice jenkins
[leo@CentOS7 ~]$docker network connect --alias nginx-oulh webservice nginx-oulh
```

各容器ip端口映射：

```shell
[leo@CentOS7 ~]$docker ps -f network=webservice 
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS              PORTS                                      NAMES
c3f0f9a0086f        oulh/nginxproxy:alpine   "/docker-entrypoint.…"   21 hours ago        Up 17 minutes       0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   nginxproxy
734a00cb48a0        nginx:alpine             "/docker-entrypoint.…"   26 hours ago        Up 26 hours         0.0.0.0:7788->80/tcp                       nginx-oulh
cac54b64a4cf        jenkinsci/blueocean      "/sbin/tini -- /usr/…"   2 days ago          Up 40 hours         0.0.0.0:8080->8080/tcp, 50000/tcp          jenkins
```

## nginx 代理配置

被代理站点的配置不用改动，只需在 **nginxproxy** 容器中对两个站点进行代理设置就行了。

创建两个conf文件

```shell
[leo@CentOS7 ~]$docker exec -it nginxproxy sh
/ # cp /etc/nginx/conf.d/default.conf jenkins.conf
/ # cp /etc/nginx/conf.d/default.conf nginx-oulh.conf
```

**jenkins.conf**

注意，这里因为 jenkins 服务监听的是8080端口，所以要加上8080端口

```nginx
# jenkins.conf 
server {
    listen       80;
    listen  [::]:80;
    server_name  jks.oulh.ml;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        proxy_pass   http://jenkins:8080;
      # proxy_pass   http://172.17.0.3:8080;
    }

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

**nginx-oulh.conf** （不带SSL）

```nginx
# nginx-oulh.conf
server {
    listen       80;
    listen  [::]:80;
    server_name  www.oulh.ml;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        proxy_pass   http://nginx-oulh;
      # proxy_pass   http://172.17.0.4;
    }

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```



配置文件更改完后记得重载 nginx 服务 ： `nginx -s reload`

## 反向代理部署 SSL

在代理服务器上部署就行了，因为浏览器不知道、更不用理会代理服务器和站点服务器之间的通信。

要么在代理服务器（nginxproxy 容器）上部署，要么两台服务器都部署，不能只在站点服务器（nginx-oulh 容器）上部署。

把 oulh.ml 站点的SSL证书相关文件下载到代理服务器上，主要是 .crt 和 .key 两个文件。

```nginx
# nginx-oulh.conf
server {
    listen       443 ssl;
    listen       80;
    # 绑定证书的域名
    server_name  www.oulh.ml;
    # 证书文件的相对路径或绝对路径
    ssl_certificate conf.d/sslcrt/oulh.ml_bundle.crt;
    # 私钥文件的相对路径或绝对路径
    ssl_certificate_key conf.d/sslcrt/oulh.ml.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        proxy_pass   http://nginx-oulh;
     #  proxy_pass   http://172.17.0.4;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```

小坑：我把ssl文件放在了 /etc/nginx/conf.d/sslcrt 目录下，nginx-oulh.conf 文件位于/etc/nginx/conf.d/ ，但它似乎以 /etc/nginx 为根目录，当我填写相对路径 sslcrt/oulh.ml_bundle.crt 的时候会报错

```shell
/etc/nginx/conf.d # nginx -t
2022/08/26 11:33:34 [emerg] 79#79: cannot load certificate "/etc/nginx/sslcrt/oulh.ml_bundle.crt": BIO_new_file() failed (SSL: error:02001002:system library:fopen:No such file or directory:fopen('/etc/nginx/sslcrt/oulh.ml_bundle.crt','r') error:2006D080:BIO routines:BIO_new_file:no such file)
nginx: [emerg] cannot load certificate "/etc/nginx/sslcrt/oulh.ml_bundle.crt": BIO_new_file() failed (SSL: error:02001002:system library:fopen:No such file or directory:fopen('/etc/nginx/sslcrt/oulh.ml_bundle.crt','r') error:2006D080:BIO routines:BIO_new_file:no such file)
nginx: configuration file /etc/nginx/nginx.conf test faile
```



### HTTP 自动跳转 HTTPS



> 将 HTTP 请求自动重定向到 HTTPS，可以通过以下操作设置：
>
> - 在页面中添加 JS 脚本。
> - 在后端程序中添加重定向。
> - 通过 Web 服务器实现跳转。
> - Nginx 支持 rewrite 功能。若您在编译时没有去掉 pcre，您可在 HTTP 的 server 中增加 `return 301 https://$host$request_uri;`，即可将默认80端口的请求重定向为 HTTPS



```shell
# nginx-oulh.conf
server {
    listen 80;
    server_name  www.oulh.ml;
    return 301 https://$host$request_uri;
}
server {
    listen       443 ssl;
    # listen       80;
    # 绑定证书的域名
    server_name  www.oulh.ml;
    # 证书文件的相对路径或绝对路径
    ssl_certificate conf.d/sslcrt/oulh.ml_bundle.crt;
    # 私钥文件的相对路径或绝对路径
    ssl_certificate_key conf.d/sslcrt/oulh.ml.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass   http://nginx-oulh;
     #  proxy_pass   http://172.17.0.4;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```



参考：

[SSL 证书 国际标准 SSL 证书安装-证书安装-文档中心-腾讯云 (tencent.com)](https://cloud.tencent.com/document/product/400/47413)

nginx 官方文档：

[proxy 模块说明](http://nginx.org/en/docs/http/ngx_http_proxy_module.html)

[ssl 模块说明](http://nginx.org/en/docs/http/ngx_http_ssl_module.html)