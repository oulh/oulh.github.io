---
title: Git Q&A
---



### error: src refspec master does not match any

可能是因为没提交commit信息

```shell
& git commit -m "commit内容"
```

### 

### hint: not have locally. This is usually caused by another repository pushing

> hint: Updates were rejected because the remote contains work that you do
> hint: not have locally. This is usually caused by another repository pushing
> hint: to the same ref. You may want to first integrate the remote changes
> hint: (e.g., 'git pull ...') before pushing again.
> hint: See the 'Note about fast-forwards' in 'git push --help' for details.

这是因为本地仓库的内容与远程的不一致

方法一：

先pull远程仓库与本地仓库合并，再push

方法二：

```shell
git push -f # -f强制提交
```



### fatal: refusing to merge unrelated histories

git pull 的时候出现该提示

解决方法：加 `--allow-unrelated-histories`

```shell
$ git pull --allow-unrelated-histories

##!! 注意，该操作将把远程分支和当地分支合并
```



### warning: LF will be replaced by CRLF in

> warning: LF will be replaced by CRLF in 'filename'.
>
> The file will have its original line endings in your working directory





