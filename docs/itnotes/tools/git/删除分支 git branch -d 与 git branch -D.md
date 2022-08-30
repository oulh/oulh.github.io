## 删除分支 git branch -d 与 git branch -D

### **区别**

git branch -d 会在删除前检查merge状态（其与上游分支或者与head）。
git branch -D 是git branch --delete --force的简写，它会直接删除。

### **共同点**

都是删除本地分支的方法（与删除远程分支命令相独立，要想本地和远程都删除，必须得运行两个命令）。

删除远程分支以及追踪分支：

```
git push --origin -delete branch
```

