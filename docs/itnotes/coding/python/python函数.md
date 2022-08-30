---
title: python函数

---



## 函数基础



**函数定义**

格式：

```
def  函数名(参数列表):
	语句
	return 表达式
```

说明：

| 部位     | 解释说明                                                     |
| -------- | ------------------------------------------------------------ |
| def      | 函数代码块以 def 关键词开头                                  |
| 函数名   | 遵循标识符的规则                                             |
| ()       | 参数列表的开始和结束                                         |
| 参数列表 | 任何传入参数和自变量必须放在圆括号中间，圆括号之间可以用于定义参数。函数从函数的调用者获得的信息，可以没有参数 |
| :        | 函数内容以冒号起始，并且缩进                                 |
| 语句     | 函数封装的功能                                               |
| return   | 一般用于结束函数，并返回给函数的调用者一些信息，"表达式"即为要返回的数据。不带表达式的return相当于返回 None |

允许没有参数和返回值。

**函数调用**

格式：函数名(参数列表)

注意：调用函数必须在定义之后

本质：实参给形参赋值的过程

说明：

| 部位     | 解释说明                 |
| -------- | ------------------------ |
| 函数名   | 要使用某个功能函数的名字 |
| ()       | 参数列表的开始和结束     |
| 参数列表 | 调用者给函数的信息(实参) |



**函数嵌套**

```python
def func1():
    def func2():
       语句
    func2()
func1()
```

每个函数里的变量是互相独立的，变量的查找顺序也是从当前层依次往上层找。

## 函数参数

形式参数(形参)：变量

实际参数(实参)：值

### 传递参数

- 值传递：传递不可变数据类型

  形参初始内存地址和实参一样，形参变量值更改后会开辟新的内存空间，但不影响实参变量。

  ```python
  def func1(num):
      print("num1----",id(num))
      num = 402
      print("num2----", id(num))
      print("1------------", num)
  
  a = 401
  print("a----", id(a))
  func1(a)
  print("2------------", a)
  ```

  

- 引用传递：传递可变数据类型

  本质还是值传递，传递的是地址。也就是说，形参变量不会开辟新的内存空间，一直与实参变量共用内存空间。

  ```python
  def func2(arr):
      print("arr1------",id(arr))
      print("---------", arr)
      arr.pop()
  
  li = [1,2,3,4,5]
  func2(li)
  print("li-------", id(li))
  print(li)
  ```

### 关键字参数

目前为止对参数的要求：调用时参数的顺序要与定义时一致

关键字参数：允许函数调用时参数的顺序与定义时不一致

```python
def func(name, age):
    print("%s is a good man!He is %d years old!He like"%(name, age))

#使用关键字参数
func(age=18, name="zutuanxue_com")
```

### 默认参数

定义函数时可以给参数默认值。在调用函数时，如果没有传递参数，就使用默认参数的值。

注意：在定义函数时尽量将默认参数写在最后

```python
def func(name, age=18):
    ...
func("leo")
func("leo", 16)
```

### 不定长参数

能处理比当初定义时更多的参数

- 使用列表传递多个参数

  ```python
  def func1(name, age, hobbys):
      print("%s is a good man!He is %d years old!He like" %(name, age), hobbys[1])
  
  func1("zutuanxue_com", 18, ["power", "money"])
  
  >>> Result: leo is a good man!He is 18 years old!He like money
  ```

- 在形参变量前加了个星号，变量会存放所有未命名的变量的参数，如果在函数调用时没有指定参数，它就是个空元组

  ```python
  # 不定长参数默认放在参数后面
  def func2(name, age, *args):
      print("%s is a good man!He is %d years old!He like %s" % (name, age, args[2]))
      print(args, type(args))
  func2("kaige", 18, "power", "money", "girl", "boy")
  
  >>> Result: 
  kaige is a good man!He is 18 years old!He like girl
  ('power', 'money', 'girl', 'boy') <class 'tuple'>
  ```

- kwargs

  代表着键值对字典，和*差不多

  ```python
  def func3(name, age, **kwargs):
      print("%s is a good man!He is %d years old!He like" % (name, age), kwargs['z'])
      print(kwargs, type(kwargs))
  func3("kaige", 18, x='power', y='money', z='girl')
  
  >>> Result: 
  kaige is a good man!He is 18 years old!He like girl
  {'x': 'power', 'y': 'money', 'z': 'girl'} <class 'dict'>
  ```

- 配合使用

  ```python
  def func(*args, **kwargs):
      print(args)
      print(kwargs)
  func(1,2,3,4,x=5,y=6,z=7)
  ```

## 函数返回值

### 函数返回多个返回值

可以一次性返回多个值，多个值用逗号分隔

```python
# 游戏中的人物坐标
def func():
    return 1, 2

x, y = func()
print(x, y) # 1,2
print(type(x)) # <class 'int'>
```

### 函数也是一种数据

函数也是一种数据，那么就可以用变量来保存(函数名也是一个特殊的变量)

应用：将函数作为参数传递（回调函数）

```python
def func(x, y):
    return x + y

f = func #函数名也是一个特殊的变量
print(f(1,2))
```

## 匿名函数

不需使用def语句这样标准的形式定义函数，而是使用lambda来创建匿名函数

格式：`lambda [arg1[, arg2[, args,……]]]: exception`

作用：作为参数传递，实现回调，简化代码

特点：

1. lambda只是一个表达式，函数体比def简单的多
2. lamdba主体是一个表达式，而不是代码块，仅能在lamdba表达式中封装有限的逻辑
3. lamdba函数拥有自己的命名空间，且不能访问自有参数列表之外的或全局命名空间里的参数
4. 虽然lamdba函数体看起来只有一行，却不同于C和C++的内联函数，后者的目的是调用小函数时不占用栈内存而增加效率

```python
#这段代码
def calc(x,y):
    return x**y
print(calc(2,5))
#换成匿名函数
calc = lambda x,y:x**y
print(calc(2,5))
```

**匿名函数主要是和其它函数搭配使用**

```py
res = map(lambda x:x**2,[1,5,7,4,8])
for i in res:
    print(i)
```

输出

```py
1
25
49
16
64
```



## 高阶函数

变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

```py
def get_abs(n):
    if n < 0 :
        n = int(str(n).strip("-"))
    return n
def add(x,y,f):
    return f(x) + f(y)
res = add(3,-6,get_abs)
print(res)
```

只需满足以下任意一个条件，即是高阶函数

- 接受一个或多个函数作为输入
- return 返回另外一个函数



### map()函数

原型：`map(function, iterable, ...)`

参数：

- function -- 函数
- iterable -- 一个或多个序列

功能：将传输的函数function依次作用到iterable集合中的每个元素，并把结果作为一个Iterator返回，并可以转换为list、tuple、set类型。

传递自定义函数：

```python
myList = [1,2,3,4,5]
def my_func(arg):
   return arg**2
res = map(my_func,myList)
print(list(res))
#print(tuple(res))
#print(set(res))
print(type(res))

# 结果：
[1, 4, 9, 16, 25]
<class 'map'>
```

传递匿名函数lambda表达式：

```python
res = map(lambda x:x**2,myList)
print(list(res))
```

传递内置数据类型转换函数：

```python
res = map(int,['1','2','3','4','5'])
res = map(bool,[0,'1','2','3','','4',(),{},'5'])
print(list(res))
```



### reduce()函数

原型：`reduce(function, iterable)`

参数：

- function：一个函数
- iterable：集合

功能：传入的function函数作用在iterable集合中，这个fn函数必须接收两个参数，reduce把每次返回的值继续和序列中的下一个元素作为参数传递

```python
from functools import reduce
# 进行值的累加
def add(x,y):
    print(x,y)
    return x+y
"""
1 2		第一次传参
3 3		第二次传参
6 4		第三次传参
10 5	第四次传参
15
"""
my_list = [1,2,3,4,5]
res = reduce(add,my_list)
# 使用lambda表达式实现
# res = reduce(lambda x,y:x+y,my_list)
print(res)
```

### filter()函数

语法：`filter(function, iterable)`

参数：

- function：函数
- iterable：可迭代对象


功能：**用于过滤列表**，把传入的function函数依次作用在iterable集合中的每个元素上，返回True则保留当前元素

```python
# 取出li列表中不被2整除的数字
li = [1,2,3,4,5,6,7,8,9,10]

# def func1(arr):
#     for x in arr:
#         if x % 2 == 0:
#             arr.remove(x)
# func1(li)

def func2(num):
    if num % 2 == 0:
        return False
    return True
res = filter(func2, li)
print("li: ",li)
print("res: ",res)
print("list(res): ",list(res))
```

结果：

```
li:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
res:  <filter object at 0x01D8E050>
list(res):  [1, 3, 5, 7, 9]
```



删除列表中是空字符串的元素

```python
#删除列表中是空字符串的元素
li2 = ["a", "", "", "c", "    ", "  bsg  "]
def f(item):
    #  如果item.strip()为空，则"item and item.strip()"为False
    return item and item.strip()
res = filter(f, li2)
print(list(res))

# 结果
['a', 'c', '  bsg  ']
```



### sorted()函数

对所有可迭代的对象进行排序操作。

> **sort 与 sorted 区别：**
>
> sort 是应用在 list 上的方法，sorted 可以对所有可迭代的对象进行排序操作。
>
> list 的 sort 方法返回的是对已经存在的列表进行操作，而内建函数 sorted 方法返回的是一个新的 list，而不是在原来的基础上进行的操作。
>
> 如果你不需要原始的 list，list.sort()方法效率会稍微高一些。

另外，list.sort() 方法只为 list 定义。而 sorted() 函数可以接收任何的 iterable。

语法：`sorted(iterable, key=None, reverse=False)  `

参数：

- iterable -- 可迭代对象。
- key -- 主要是用来进行比较的元素，只有一个参数，具体的函数的参数就是取自于可迭代对象中，指定可迭代对象中的一个元素来进行排序。
- reverse -- 排序规则，reverse = True 降序 ， reverse = False 升序（默认）。

功能：将led中的每个元素作用在key函数上，用函数的结果的大小来排序

优点：可以自定义排序规则



默认为升序

```python
# 默认为升序
>>> sorted([5, 2, 3, 1, 4])
[1, 2, 3, 4, 5]                 #按数字大小     
>>> sorted(['Swimming','money','Cat','Apple','car'])
['Apple', 'Cat', 'Swimming', 'car', 'money']     #按首字母ASCII数值
```

要进行反向排序，可通过传入第三个参数 reverse=True：

```python
>>> example_list = [5, 0, 6, 1, 2, 7, 3, 4]
>>> sorted(example_list, reverse=True)
[7, 6, 5, 4, 3, 2, 1, 0]
```

利用key进行倒序排序

```python
>>> example_list = [5, 0, 6, 1, 2, 7, 3, 4]
>>> result_list = sorted(example_list, key=lambda x: x*-1)
>>> print(result_list)
[7, 6, 5, 4, 3, 2, 1, 0]
```



> 更多python内建函数
>
> [Python3 内置函数 | 菜鸟教程 (runoob.com)](https://www.runoob.com/python3/python3-built-in-functions.html)



## 偏函数

偏函数（Partial function）：`functools`模块提供的功能之一。

作用：通过设定参数的默认值，可以降低函数调用的难度。

例：`int()`函数按默认十进制转换字符串，它有额外的base参数（默认值10），传入base参数，可以做N进制的转换。

```python
>>> int('1010',base=2)
10
>>> int('1011',base=2)
11
>>> int('1100',base=2)
12
>>> int('0a',base=16)
10
>>> int('0b',base=16)
11
>>> int('0c',base=16)
12
```

如果要转换大量二进制字符串，每次用`int(x, base=2)`就很繁琐，可以定义一个`int2()`的函数：

```python
def int2(x, base=2):
	return int(x, base)
int2('1000010')
```

更简便的方法，用`functools.partial`创建一个偏函数

语法格式：

`functools.partial(函数对象, *args,**kwargs)`

```python
>>> import functools
>>> int2 = functools.partial(int, base=2)
>>> int2('1000010')
66
```

当传入(int, base=2)，实则固定了int()函数的关键字参数base。

间单总结`functools.partial`的作用就是，把一个函数的某些参数给固定住（也就是设置默认值），返回一个新的函数，调用这个新函数会更简单。

**小结：**

当函数的参数个数太多，需要简化时，使用`functools.partial`可以创建一个新的函数，这个新函数可以固定住原函数的部分参数，从而在调用时更简单。