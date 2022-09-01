---
title: 查看宿主机与容器的cpu使用率
---



## 模拟测试

1. 运行一个容器，限制它只使用"cpu0"
```shell
$ docker run -itd --cpuset-cpus="0"  --name xq centos:7  /bin/bas
```

2. 在容器中用stress工具模拟cpu负载

![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603963955776-2fae4b13-fc43-44fe-ad12-cf586e94b0b8.png)




3. top 在top界面按“1”，可以查看各逻辑cpu的使用情况
```shell
$ top
```
![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603964049250-406f282f-643f-421d-95b3-9bdd20bf7560.png)



4. docker stats 查看容器资源使用情况
```shell
$ dockers stats [容器名 容器名 ...]
```
![image.png](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/1603964105203-5b752588-53ad-4c26-8e2f-b6a96195f1e1.png)



