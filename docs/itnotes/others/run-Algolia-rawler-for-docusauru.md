---
slug: run-Algolia-rawler-for-docusauru
title: 为docusauru网站运行 Algolia DocSearch 爬虫
---

 [Algolia](https://www.algolia.com/)  提供精确到正文每一个字的内容搜索服务，申请 Algolia 的免费托管无果，故自己运行 Algolia 的爬虫来爬取我的网站。

<!--truncate-->

Algolia 提供 docker 镜像来实现这件事，比较关键的是针对 docusaurus 的 `config.json` 配置。

- 注册 [Algolia](https://www.algolia.com/) 
- Algolia 的 [爬虫程序](https://docsearch.algolia.com/docs/legacy/run-your-own)
- config.json [配置建议](https://docsearch.algolia.com/docs/templates#docusaurus-v2-template) 
- config.json [样例](https://github.com/algolia/docsearch-configs/blob/master/configs/docusaurus-2.json)

## docusaurus json 配置

如果`config.json` 配置不对，即使爬虫程序有命中记录，在前端也无法正常显示搜索结果。

正确可行的配置（参考[样例](https://github.com/algolia/docsearch-configs/blob/master/configs/docusaurus-2.json)）：

```json title="config.json"
{
  "index_name": "oulh",
  "start_urls": [
    "https://www.oulh.ml"
  ],
  "sitemap_urls": [
    "https://www.oulh.ml/sitemap.xml"
  ],
  "sitemap_alternate_links": true,
  "stop_urls": [
    "/tests"
  ],
  "selectors": {
    "lvl0": {
      "selector": "(//ul[contains(@class,'menu__list')]//a[contains(@class, 'menu__link menu__link--sublist menu__link--active')]/text() | //nav[contains(@class, 'navbar')]//a[contains(@class, 'navbar__link--active')]/text())[last()]",
      "type": "xpath",
      "global": true,
      "default_value": "Documentation"
    },
    "lvl1": "header h1",
    "lvl2": "article h2",
    "lvl3": "article h3",
    "lvl4": "article h4",
    "lvl5": "article h5, article td:first-child",
    "lvl6": "article h6",
    "text": "article p, article li, article td:last-child"
  },
  "strip_chars": " .,;:#",
  "custom_settings": {
    "separatorsToIndex": "_",
    "attributesForFaceting": [
      "language",
      "version",
      "type",
      "docusaurus_tag"
    ],
    "attributesToRetrieve": [
      "hierarchy",
      "content",
      "anchor",
      "url",
      "url_without_anchor",
      "type"
    ]
  }
}
```

### 格式化`config.json`为字符串

**方法一：**jq 在线工具 ：[https://jqplay.org](https://jqplay.org/)

务必勾选 ”Raw Output“

![image-20220904175051495](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220904175051495.png)



**方法二：** 用容器运行 `jq`工具

**1、Dockerfile**

``` dockerfile title="Dockerfile"
FROM alpine:latest
ARG JQ_VERSION='1.5'
RUN wget --no-check-certificate https://raw.githubusercontent.com/stedolan/jq/master/sig/jq-release.key -O /tmp/jq-release.key && \
    wget --no-check-certificate https://raw.githubusercontent.com/stedolan/jq/master/sig/v${JQ_VERSION}/jq-linux64.asc -O /tmp/jq-linux64.asc && \
    wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64 && \
    apk add gpg gpg-agent && \
    gpg --import /tmp/jq-release.key && \
    gpg --verify /tmp/jq-linux64.asc /tmp/jq-linux64 && \
    cp /tmp/jq-linux64 /usr/bin/jq && \
    chmod +x /usr/bin/jq && \
    rm -f /tmp/jq-release.key && \
    rm -f /tmp/jq-linux64.asc && \
    rm -f /tmp/jq-linux64
CMD ["/bin/sh","-c","echo $CONFIG_JSON |jq -r tostring"]
```

**2、构建镜像**

```shell
$ docker build -t oulh/jqtool --no-cache --force-rm .
```

注：大陆访问 github 很不稳定，可能导致 jq 安装不成功，构建镜像之前添加最新的 github hosts 有所帮助

更新 github hosts：

``` shell title="updateHostsForGithub.sh"
#!/bin/bash
set -e
if ! test -f /etc/hosts.bak
  then
     cp /etc/hosts /etc/hosts.bak
else
   echo "hosts.bak is existed"
fi
if [ $(command -v curl) ]; then
  curl  -o githubhosts https://raw.hellogithub.com/hosts
  else
  wget -O githubhosts https://raw.hellogithub.com/hosts
  fi

cat /etc/hosts.bak > /etc/hosts
cat githubhosts >> /etc/hosts
echo "/etc/hosts replaced"
```

**3、运行容器处理 json**

通过 -e 把变量传给

```shell
[leo@CentOS7 algolia]$docker run --rm -e "CONFIG_JSON=$(cat /path/to/config.json)" oulh/jqtool
{"index_name":"oulh","start_urls":["https://www.oulh.ml"],"sitemap_urls":["https://www.oulh.ml/sitemap.xml"],"sitemap_alternate_links":true,"stop_urls":["/tests"],"selectors":{"lvl0":{"selector":"(//ul[contains(@class,'menu__list')]//a[contains(@class, 'menu__link menu__link--sublist menu__link--active')]/text() | //nav[contains(@class, 'navbar')]//a[contains(@class, 'navbar__link--active')]/text())[last()]","type":"xpath","global":true,"default_value":"Documentation"},"lvl1":"header h1","lvl2":"article h2","lvl3":"article h3","lvl4":"article h4","lvl5":"article h5, article td:first-child","lvl6":"article h6","text":"article p, article li, article td:last-child"},"strip_chars":" .,;:#","custom_settings":{"separatorsToIndex":"_","attributesForFaceting":["language","version","type","docusaurus_tag"],"attributesToRetrieve":["hierarchy","content","anchor","url","url_without_anchor","type"]}}
```



> jq tool wiki：[Installation · stedolan/jq Wiki (github.com)](https://github.com/stedolan/jq/wiki/Installation#with-docker)

## 通过 docker image 运行爬虫

`.env` 文件：

Algolia的应用 ID 和 API 密钥 ，以及上一步处理后的 config.json 内容。PS：API密钥必须是admin密钥。

```shell title=".env"
APPLICATION_ID=RCZTB3YFR0
API_KEY=af63446b8a0e08122332eb8085a05595
CONFIG={"index_name":"oulh","start_urls":["https://www.oulh.ml"],"sitemap_urls":["https://www.oulh.ml/sitemap.xml"],"sitemap_alternate_links":true,"stop_urls":["/tests"],"selectors":{"lvl0":{"selector":"(//ul[contains(@class,'menu__list')]//a[contains(@class, 'menu__link menu__link--sublist menu__link--active')]/text() | //nav[contains(@class, 'navbar')]//a[contains(@class, 'navbar__link--active')]/text())[last()]","type":"xpath","global":true,"default_value":"Documentation"},"lvl1":"header h1","lvl2":"article h2","lvl3":"article h3","lvl4":"article h4","lvl5":"article h5, article td:first-child","lvl6":"article h6","text":"article p, article li, article td:last-child"},"strip_chars":" .,;:#","custom_settings":{"separatorsToIndex":"_","attributesForFaceting":["language","version","type","docusaurus_tag"],"attributesToRetrieve":["hierarchy","content","anchor","url","url_without_anchor","type"]}}
```

万事俱备，跑起来

```shell
[leo@CentOS7 algolia]$docker run --rm -it  --env-file=.env algolia/docsearch-scraper
> DocSearch: https://www.oulh.ml 1 records)
> DocSearch: https://www.oulh.ml/docs/example/tutorial-extras/translate-your-site 19 records)
> DocSearch: https://www.oulh.ml/docs/example/tutorial-basics/congratulations 12 records)
> DocSearch: https://www.oulh.ml/docs/intro 17 records)
> DocSearch: https://www.oulh.ml/docs/category/%E9%98%BF%E9%87%8C%E4%BA%91-ecs 13 records)
...
> DocSearch: https://www.oulh.ml/blog 8 records)
> DocSearch: https://www.oulh.ml/bak/ 1 records)

Nb hits: 4702
```



最后在站点前端配置 Algolia 的 API 信息就可以了

参考 [Search | Docusaurus](https://docusaurus.io/docs/next/search)

```json
algolia: {
// Algolia 提供的应用 ID
appId: 'YourAppId',
//  公开 API 密钥
apiKey: 'YourSearchApiKey',
indexName: 'oulh',
```



![image-20220904192811990](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/image-20220904192811990.png)