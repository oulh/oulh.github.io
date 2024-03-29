# 忽略规则 - .gitignore 

通过在项目的某个文件夹下定义.gitignore文件，在该文件中定义相应的忽略规则，来管理当前文件夹下的文件的Git提交行为。这个文件的作用就是告诉Git哪些文件不需要添加到版本管理中。.gitignore 文件是可以提交到公有仓库中的。

每一行指定一个忽略规则。如：

```
/mtk/ 过滤整个文件夹
*.zip 过滤所有.zip文件
/mtk/do.c 过滤某个具体文件
```

还可以指定要将哪些文件添加到版本管理中：

```
!src/   不过滤该文件夹
!*.zip   不过滤所有.zip文件
!/mtk/do.c 不过滤该文件
```

**1、配置语法：**
 以斜杠`/`开头表示目录；
 以星号`*`通配多个字符；
 以问号`?`通配单个字符
 以方括号`[]`包含单个字符的匹配列表；
 以叹号`!`表示不忽略(跟踪)匹配到的文件或目录；

此外，git 对于 .ignore 配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效；

**2、示例说明**
 **a、规则：fd1/***
 说明：忽略目录 fd1 下的全部内容；注意，不管是根目录下的 /fd1/ 目录，还是某个子目录 /child/fd1/ 目录，都会被忽略；
 **b、规则：/fd1/***
 说明：忽略根目录下的 /fd1/ 目录的全部内容；
 **c、规则：**
 /*
 !.gitignore
 !/fw/bin/
 !/fw/sf/
 说明：忽略全部内容，但是不忽略 .gitignore 文件、根目录下的 /fw/bin/ 和 /fw/sf/ 目录；

