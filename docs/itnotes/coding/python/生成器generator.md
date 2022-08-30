---
title: 生成器generator

---



## 生成器

### 列表生成式

循环生成别表

```python
li = []
for i in range(1, 11):
    li.append(pow(i, 2))
print(li)
```

使用**列表生成式**：

```python
>>> li = [x * x for x in range(1,11)]
>>> li
[1, 4, 9, 16, 25, 36, 49, 64, 81,100]

```

更多形式

- 添加判断

  ```python
  li = [x * x for x in range(1, 11) if x % 2 == 0]
  print(li)
  ##拆分
  li = []
  for x in range(1,11):
      if x % 2 == 0:
      	li.append(pow(x,2))
  ```

- 多层循环

  ```python
  >>> li = [x + y for x in "ABC" for y in "123"]
  >>> li
  ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3']
  
  ##拆分
  for x in "ABC":
      for y in "123":
          ret = x + y
  ```

### 生成器

```python
>>> g = (x * x for x in range(10))
>>> g
<generator object <genexpr> at 0x01569EB0>
>>> type(g)
<class 'generator'>
```

(x*x for x in range(10)）生成的就是一个生成器（generator）。

generator保存的是算法。

可以通过`next()`函数依次获得generator的返回值，但要不断调用，最后还会抛出StopIteration的错误：

```python
>>> g = (x * x for x in range(10))
>>> next(g)
0
>>> next(g)
1
>>> next(g)
4
>>> next(g)
9
...
>>> next(g)
81
>>> next(g)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

可以通过`list()`或 for循环（generator也是可迭代(遍历)对象）：

```python
>>> g = (x * x for x in range(5))
>>> list(g)
[0, 1, 4, 9, 16]
```

```python
>>> g = (x * x for x in range(5))
>>> for n in g:
...     print(n)
...
0
1
4
9
16
```

## 函数生成器

上面说了，generator可以保存算法，然后不断调用。如果推算的算法比较复杂，用类似列表生成式的for循环无法实现的时候，还可以用函数来实现。

如果一个函数定义中包含`yield`关键字，那么这个函数就不再是一个普通函数，而是一个generator

函数是顺序执行，遇到return语句或者最后一行函数语句就返回。**而变成generator的函数，在每次调用next()的时候执行，遇到yield语句暂停并返回数据到函数外，再次被next()调用时从上次返回的yield语句处继续执行**。



1. 例，把下面函数改为generator

```python
# 实现50以内的斐波那契数
def fib():
	a,b = 0,1
    n = 0
    while n < max
    	n = a + b
    	a = b
    	b = n
        print(n)
 fib(50)
```

只需要把`print(n)`改为`yield n`

```python
def fib():
	a,b = 0,1
    n = 0
    while n < max
    	n = a + b
    	a = b
    	b = n
        yield n	#程序走到这，就会暂停下来，返回n到函数外面，直到被next方法调用时唤醒
f = fib(50)	#这句调用时，函数并不会执行，只有下一次调用next时，函数才会真正执行
print(f) # f: <generator object fib at 0x00B4A4F0>
print(f.__next__())
print(f.__next__())
print(f.__next__())
print(f.__next__())
```

循环过程中不断调用`yield`，函数就会不断的中断(暂停)。当然要给循环设置一个条件来退出循环，不然就会产生一个无限数列出来。同样的，把函数改成generator后，我们基本上从来不会用`next()`来获取下一个返回值，而是直接使用`for`循环来迭代：

```python
...
f = fib(50)
for i in f:
	print(i)
```

![debbuggeneratorfib220806](http://overseasfile.oulh.ml/debbuggeneratorfib220806.gif)

2. 例，通过yield实现并发

```python
import time
def fight(name):
    print("%s到达战场！"%name)
    while True:
        num=yield   # yield可以接收到外部send传过来的数据并赋值给num
        print("%s：你骚x%s"%(name,num))
c = fight('三姑')
c2 = fight('六婆')
c.__next__()    # 执行一下next可以使上面的函数走到yield那句。 这样后面的send语法才能生效
c2.__next__()
for i in range(1,6):
    #time.sleep(1)
    print("第%d轮："%i)
    c.send(i)   # send的作用=next, 同时还把数据传给了上面函数里的yield
    c2.send(i)
```

**注意：调用send(x)给生成器传值时，必须确保生成器已经执行过一次next**()调用, 这样会让程序走到yield位置等待外部第2次调用。

输出结果：

![rungenerator220806](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/rungenerator220806.gif)

运行过程：

![debbuggenerator220806](https://leo-1258140835.cos.ap-guangzhou.myqcloud.com/blogimages/debbuggenerator220806.gif)
