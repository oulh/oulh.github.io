---
title: python常见数据结构
sidebar_position: 3
---



## str 字符串

字符串是一个有序的字符的集合。

特性

1. 按照从左到右的顺序定义字符集合，可通过从0开始的索引来提取字符串中的字符。

   正向索引和反向索引

2. 可以进行切片操作（取多个字符）

3. 不可变，字符串是不可变的，不能像列表一样修改其中某个元素，所有对字符串的修改操作其实都是相当于生成了一份新数据。



### 内容获取（索引和切片）

```python
>>> str='Hello,world'
# 根据下标(索引)获取字符串中的内容，下标从0开始
>>> print(str[0])  # 正数第一个字符
H
>>> print(str[2])  # 正数第三个字符
l
>>> print(str[-1]) # 倒数第一个字符
d
# 截取字符串中的一部分 字符串[start:stop]   [start, stop)
>>> print(str[0:5])
Hello
>>> print(str[:5])
Hello
>>> print(str[5:])
,world
>>> print(str[6:])
world
```

### 字符串运算

```python
# 字符串运算
str3 = "zutuanxue is a cool man"
str4 = "zutuanxue is a handsome man"
# 字符串加法（字符串拼接）
str5 = str3 + str4
print("str5= %s"%(str5))
# 字符串乘法（重复字符串）
str6 = str3 * 3
print("str6= %s"%(str6))
```

### 成员判断

```python
# 成员判断
str7 = "zutuanxue is a good man"
print("zutuanxue" in str7)
```

### 内置操作方法

注意：字符串本身是不可以改变的

- eval()

  原型：eval(str)
  功能：将字符串当成有效的表达式来求值并返回结果
  返回值：计算后得到的数字

  ```python
  num = eval("123")
  print(num, type(num))
  # print(int("12+3")) #报错
  print(eval("12+3"))
  print(eval("+123"))
  print(eval("-123"))
  print(eval("12-3"))
  print(eval("12*3"))
  
  #注意：字符串中有非数字字符会报错(数学运算符除外)
  # print(eval("12a3")) #报错
  # print(eval("a123")) #报错
  # print(eval("123a")) #报错
  # 表示的是变量是可以的
  a = "124"
  print(eval("a"))
  # print(eval("a+1")) #报错
  ```

- len(string)

  原型：len(str)
  功能：计算字符串的长度(按字符个数计算)
  参数：一个字符串
  返回值：字符串的长度

  ```python
  print(len("zutuanxue is a good man"))
  print(len("zutuanxue is a good man凯"))
  ```

- lower()

  原型：lower()
  功能：将字符串中所有大写英文字母转为小写

  ```python
  str1 = "zutuanxue Is a GoOd MAn!"
  str2 = str1.lower()
  print(str1)
  print(str2)
  ```

- upper()

  原型：upper()
  功能：将字符串中所有小写英文字母转为大写

  ```python
  str3 = "zutuanxue Is a GoOd MAn!"
  str4 = str3.upper()
  print(str3)
  print(str4)
  ```

- swapcase()

  原型：swapcase()
  功能：将字符串中的大写英文字母转为小写，小写英文字母转为大写

  ```python
  str5 = "zutuanxue Is a GoOd MAn!"
  str6 = str5.swapcase()
  print(str5)
  print(str6)
  ```

- capitalize()

  原型：capitalize()
  功能：将字符串中第一个字符转为大写，其余转为小写

  ```python
  str7 = "zutuanxue Is a GoOd MAn!"
  str8 = str7.capitalize()
  print(str7)
  print(str8)
  ```

- title()

  原型：title()
  功能：得到“标题化”的字符串，每个单词的首字符大写，其余小写

  ```python
  str9 = "zutuanxue Is a GoOd MAn!"
  str10 = str9.title()
  print(str10)
  ```

- center(width[, fillchar])

  功能：返回一个指定width宽度的居中字符串，fillchar为填充字符串，默认为空格

  ```python
  print("zutuanxue".center(20, "#"))
  ```

- ljust(width[, fillchar])

  功能：返回一个指定width宽度的左对齐字符串，fillchar为填充字符串，默认为空格

  ```python
  print("zutuanxue".ljust(20, "#"))
  ```

- rjust(width,[, fillchar])

  功能：返回一个指定width宽度的右对齐字符串，fillchar为填充字符串，默认为空格

  ```python
  print("zutuanxue".rjust(20, "#"))
  ```

- zfill (width)

  功能：返回一个指定width宽度的右对齐字符串，默认填充0

  ```python
  print("zutuanxue".zfill(20))
  ```

- count(str[, beg= 0[,end=len(string)]])

  功能：返回str在string中出现的次数，如果beg或者end指定则返回指定范围内的出现次数

  ```python
  str11 = "zutuanxue is a very very good man very"
  print(str11.count("very"))
  print(str11.count("very", 13))
  print(str11.count("very", 13, 25))
  ```

- find(str[, beg=0[, end=len(string)]])

  功能：检测str是否包含在string中，默认从左到右查找，如果存在则返回第一次出现的下标，否则返回-1，如果beg或者end指定则在指定范围内检测

  ```python
  str12 = "zutuanxue is a very very good man"
  print(str12.find("very"))
  # print(str12.find("nice"))
  ```

- index(str[, beg=0[, end=len(string)]])

  功能：检测str是否包含在string中，默认从左到右查找，如果存在则返回第一次出现的下标，否则返回异常(报错)，如果beg或者end指定则在指定范围内检测

  ```python
  str13 = "zutuanxue is a very very good man"
  print(str13.index("very"))
  # print(str13.index("nice"))
  ```

- rfind(str[, beg=0[,end=len(string)]])

  功能：检测str是否包含在string中，默认从右到左查找，如果存在则返回第一次出现的下标，否则返回-1，如果beg或者end指定则在指定范围内检测

- ```python
  str12 = "zutuanxue is a very very good man"
  print(str12.rfind("very"))
  # print(str12.rfind("nice"))
  ```

- rindex(str[, beg=0[, end=len(string)]])

  功能：检测str是否包含在string中，默认从右到左查找，如果存在则返回第一次出现的下标，否则返回异常(报错)，如果beg或者end指定则在指定范围内检测

  ```python
  str13 = "zutuanxue is a very very good man"
  print(str13.rindex("very"))
  # print(str13.rindex("nice"))
  ```

- lstrip([char])

  功能：截掉字符串左侧指定的字符，默认为空格

  ```python
  str14 = "     zutuanxue is a good man"
  str15 = str14.lstrip()
  print(str14)
  print(str15)
  str16 = "######zutuanxue is a good man"
  str17 = str16.lstrip("#")
  print(str16)
  print(str17)
  ```

- rstrip([char])

  功能：截掉字符右左侧指定的字符，默认为空格

  ```python
  str18 = "zutuanxue is a good man      "
  str19 = str18.rstrip()
  print(str18,"*")
  print(str19,"*")
  ```

- strip([chars])

  功能：在字符串上执行lstrip和rstrip

- split(str=" "[, num=string.count(str)])

  功能：按照str(默人空格)切割字符串，得到一个列表，列表是每个单词的集合

  ```python
  str20 = "zutuanxue     is  a good man"
  print(str20.split())
  print(str20.split(" "))
  str21 = "zutuanxue####is##a#good#man"
  print(str21.split("#"))
  ```

- splitlines([keepends])

  功能：按照行(’\r’、’\r\n’、’\n’)切割，如果keepends为False，不包含换行符，否则包含换行符

  ```python
  str22 = """good
  nice
  cool
  handsome
  """
  print(str22.splitlines())
  print(str22.splitlines(False))
  print(str22.splitlines(True))
  ```

- join(seq)

  功能：指定字符拼接列表中的字符串元素

  ```python
  str23 = "zutuanxue is a good man"
  li = str23.split()
  str24 = "##".join(li)
  print(str24)
  ```

- max(str)

  功能：返回字符串中最大的字符

  ```python
  print(max("abcdef"))
  ```

- min(str)

  功能：返回字符串中最小的字符

  ```python
  print(min("abcdef"))
  ```

- replace(old, new[, max])

  功能：将字符串中的old替换为new，如果没有指定max值，则全部替换，如果指定max值，则替换不超过max次

  ```python
  str25 = "zutuanxue is a good good good man"
  str26 = str25.replace("good", "cool")
  print(str26)
  ```

- maketrans()

  功能：创建字符映射的转换表

  ```python
  t = str.maketrans("un", "ab")
  ```

- translate(table, deletechars="")

  功能：根据给出的转换表转换字符

  ```python
  str27 = "zutuanxue is a good man"
  str28 = str27.translate(t)
  print(str28)
  ```

- isalpha()

  功能：如果字符串至少有一个字符并且所有的字符都是英文字母则返回真，否则返回假

  ```python
  print("abc".isalpha())
  print("ab1c".isalpha())
  ```

- isalnum()

  功能：如果字符串至少有一个字符并且所有的字符都是英文字母或数字字符则返回真，否则返回假

  ```python
  print("abc1".isalnum())
  print("abc".isalnum())
  print("1234".isalnum())
  ```

- isupper()

  功能：如果字符串至少有一个字符并且所有的字母都是大写字母则返回真，否则返回假

  ```python
  print("12AB".isupper())
  print("12ABc".isupper())
  ```

- islower()

  功能：如果字符串至少有一个字符并且所有的字母都是小写字母则返回真，否则返回假

- istitle()

  功能：如果字符串是标题化的则返回真，否则返回假

- isdigit()

  功能：如果字符串只包含数字则返回真，否则返回假

  ```python
  print("1234".isdigit())
  print("1234a".isdigit())
  ```

- isnumeric()

  功能：如果字符串只包含数字则返回真，否则返回假

- isdecimal()

  功能：检测字符串是否只包含十进制数字

- isspace()

  功能：如果字符串只包含空白符则返回真，否则返回假

  ```python
  print("".isspace())
  print(" ".isspace())
  print("\t".isspace())
  print("\n".isspace())
  print("\r".isspace())
  print("\r\n".isspace())
  print("   abc".isspace())
  ```

- startswith(str[, beg=0[,end=len(string)]])

  功能：检测字符串是否以str开头，是则返回真，否则返回假，可指定范围

  ```python
  str29 = "zutuanxue is a good man"
  print(str29.startswith("kaige"))
  ```

- endswith(suffix, beg=0, end=len(string))

  功能：检测字符串是否以str结尾，是则返回真，否则返回假，可指定范围

- encode(encoding=‘UTF-8’,errors=‘strict’)
  功能：以encoding指定的编码格式进行编码，如果出错报一个ValueError的异常，除非errors指定的值是ignore或replace

- ```python
  str30 = "zutuanxue是一个好男人"
  str31 = str30.encode()
  print(str31, type(str31))
  ```

- bytes.decode(encoding=“utf-8”, errors=“strict”)

  功能：以encoding指定的格式进行解码，注意解码时使用的格式要与编码时的一致

  ```python
  str32 = str31.decode("GBK", errors="ignore")
  print(str32, type(str32))
  ```

- ord()

  功能：获取字符的整数表示

  ```python
  print(ord("a"))
  ```

- chr()

  功能：把数字编码转为对应的字符

  ```python
  print(chr(97))
  ```

- str()

  功能：转为字符串

  ```python
  num1 = 10
  str33 = str(num1)
  print(str33, type(str33))
  ```



## list 列表

是一个有序集合。符号：[]

### 基本使用

- 创建列表

  格式：`列表名 = [元素1, 元素2, ……, 元素n]`

  ```python
  >>> li1 = []
  >>> print(li1,type(li1))
  [] <class 'list'>
  # 列表中元素的类型可以不同
  >>> li2 = [1, 2, 3, 4, 5, "good", True]
  >>> print(li2)
  [1, 2, 3, 4, 5, 'good', True]
  # 元素可以是变量、列表
  >>> str="test"
  >>> li3 = [li1,li2,str]
  >>> print(li3)
  [[], [1, 2, 3, 4, 5, 'good', True], 'test']
  ```

  不用`print`也能直接打印列表或元素

  ```python
  >>> li2
  [1, 2, 3, 4, 5, 'good', True]
  >>> li2[5]
  good
  ```

- 列表元素的访问（索引）

  ```python
  li3 = [1,2,3,4,5]
  # 获取元素  列表名[下标]
  print(li3[2])
  # 下标可以是负数，-1表示最后一个元素的下标，-2表示倒数第二个，依次类推
  print(li3[-1])
  # 截取列表
  print(li3[1:3])
  print(li3[1:])
  print(li3[:3])
  ```

  往列表末尾添加元素 `listname.append(新元素值)`

  修改元素 `列表名[下标] = 值` 

  ```python
  >>> li3.append(66)
  >>> li3[2]=33
  >>> print(li3)
  [1, 2, 33, 4, 5, 66]
  ```

  索引超出范围（不存在），不能访问以及修改元素

  ```python
  >>> print(li3[6])
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
  IndexError: list index out of range
  >>> li3[6]=7
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
  IndexError: list assignment index out of range
  ```

  

- 列表操作

  ```python
  # 列表相加（列表组合）
  >>> li4 = [1,2,3]
  >>> li5 = [4,5,6]
  >>> li6 = li4 +li5
  >>> print(li6)
  [1, 2, 3, 4, 5, 6]
  ```

  ```python
  # 列表相乘（列表重复）
  >>> li7 = [7,8,9]
  >>> li8 = li7 * 3
  >>> print(li8)
  [7, 8, 9, 7, 8, 9, 7, 8, 9]
  ```

  ```python
  # 成员判断
  >>> li9 = [1,2,3]
  >>> print(1 in li9)
  True
  >>> print(4 in li9)
  False
  ```

  

### 二维列表

概念：列表中的元素是一维列表的列表

本质：一维列表

```python
>>> li10=[li4,li5,li7]
>>> print(li10)
[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
>>> print(li10[1][1])
5
```

### 内置操作方法

- append(obj)

  在列表的末尾添加一个新的元素

  ```python
  >>> li1 = [1,2,3,4,5]
  >>> li1.append(6)
  >>> li1.append([7,8,9])
  >>> print(li1)
  [1, 2, 3, 4, 5, 6, [7, 8, 9]]
  ```

- extend(seq)

  在列表的末尾一次追加多个元素。或合并列表。

  ```python
  >>> li2.extend([6,7,8])
  >>> print(li2)
  [1, 2, 3, 4, 5, 6, 7, 8]
  ```

- insert(index, obj)

  将元素obj按下标插入列表，不会覆盖原数据，原数据会按顺序后移

  ```python
  >>> li3 = [1,2,3,4,5]
  >>> li3.insert(2, 100)
  >>> print(li3)
  [1, 2, 100, 3, 4, 5]
  ```

- pop(index=-1)

  移除列表中指定下标出的元素，默认移除最后一个，返回被删掉的数据

  ```python
  >>> li4 = [1,2,3,4,5]
  >>> data = li4.pop()
  >>> print(data, li4)
  5 [1, 2, 3, 4]
  ```

- remove(obj)

  移除列表中出现的第一个obj元素

  ```python
  li5 = [1,2,3,4,5,2,4,2,5,6,7]
  li5.remove(2)
  print(li5)
  ```

- clear()

  清空列表，列表仍存在，但为空列表。`list.clear()`

- count(obj)

  返回元素obj在列表中出现的次数。`list.count(obj)`

- len(seq)

  返回列表中元素的个数。`len(listname)`

- index(obj)

  在列表中获取元素第一次出现的下标，没有则会抛出ValueError异常。

  `list.index(obj)`

- max(seq)

  返回列表中最大的元素。`max(listname)`

  ```
  print(max([2,3,4,1,4,6,7,3]))
  ```

- min(seq)

  返回列表中最小的元素。`min(listname)`

- reverse()

  列表倒序。`list.reverse()`

- sort()

  根据func函数给定的规则进行列表元素的排序，默认升序

  ```python
  >>> li11 = [2,1,3,5,4]
  >>> li11.sort()
  >>> print(li11)
  [1, 2, 3, 4, 5]
  ```

- list(seq)

  将其他类型的集合转为列表类型

  ```python
  >>> str1 = "Hello World!"
  >>> li12 = list(str1)
  >>> li12,type(li12)
  (['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', '!'], <class 'list'>)
  ```
  
  

## tuple 元组

本质：有序集合

与列表类似，只不过［］改成（）。还有不同的是，元组是只读列表。

### 基本使用

- 创建

  `元组名 = (元素1, 元素2, ……, 元素n)`

  ```python
  # 创建空元祖
  t1 = ()
  print(t1, type(t1))
  # 创建带元素的元组，元组的元素类型可以不同
  t2 = (1,2,3,4,5)
  print(t2)
  # 创建含有一个元素的元组，需要加一个逗号
  t3 = (1,)
  print(t3, type(t3))
  ```

- 元组元素的访问

  ```
  # 取值  元组名[下标]
  t4 = (1,2,3,4,5)
  print(t4[2])
  # print(t4[7]) #下标越界
  print(t4[-1])
  # print(t4[-7]) #下标越界
  # 注意：元素是不能修改的，但是如果元组的元素是列表类型，那么列表中元素是可以修改的
  t5 = (1,2,3,4,5,[6,7,8])
  # t5[3] = 100 # 报错
  # t5[5] = [1,2,3] # 报错
  t5[5][0] = 60
  print(t5)
  ```

- 元组操作

  ```
  t6 = (1,2,3)
  t7 = (4,5,6)
  t8 = t6 + t7
  print(t8, t6, t7)
  print(t6 * 3)
  ```

- 元组截取

  ```
  t9 = (1,2,3,4,5,6,7,8,9,0)
  print(t9[3:7])
  print(t9[3:])
  print(t9[:7])
  print(t9[3:-2])
  ```

- 元组对称赋值

  ```
  # 用于函数返回多个返回值
  num1, num2 = (1, 2)
  # 如果只有一个占位符，可以省略小括号，但是最好不要省略
  print("num1 = %d"%num1)
  print("num2 = %d"%(num2))
  ```

### 内置操作方法

- len(seq) 返回元组长度

- max(seq)

- min(seq)

- tuple(seq) 将其他类型的集合转为元组类型

  

## dict 字典

- 概念

  使用键值对(key-value)的形式存储数据，具有极快的查找速度.

- 特性

  1. 字典中的key必须唯一

  2. 键值对是无序的

  3. key必须是不可变对象

     a：字符串、数字都是不可变的，可以作为key（一般为字符串）

     b：列表是可变的，不能作为key

  符号：{ }

### 基本使用

用例比较：保存一个学生的信息（姓名、学号、性别、年龄、身高、体重）

```python
str1 = "zutuanxue#1#男#18#173.5#80"
li1 = ["zutuanxue", 1, "男", 18, 173.5, 80]
t1 = ("zutuanxue", 1, "男", 18, 173.5, 80)
```

使用字典

格式：`字典名 = {key1:value1, key2:value2,……,keyn:valuen}`

- 创建字典

  ```python
  # 创建一个字典保存一个学生信息
  stu1 = {"name": "zutuanxue", "age": 18, "sex": "男", "height": 173.5, "weight":80, "id": 1}
  stu2 = {"name": "liudh", "age": 57, "sex": "男", "height": 180, "weight":75, "id": 2}
  # 字典作为列表元素
  stus = [stu1, stu2]
  # 可通过stus[0]访问stu1
  ```

- 访问字典的值

  ```python
  #字典名[key]
  >>> stu2["name"]
  'liudh'
  >>> stu2["phone"] # 获取不存在的属性值会报错
  Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
  KeyError: 'phone'
  
  #字典名.get(key)
  >>> stu2.get("name")
  'liudh'
  >>> stu2.get("phone") # 获取不存在的属性会得到None
  
  >>>
  ```

- 添加键值对

  ```python
  # 添加键值对，没有的键会添加，有的会修改
  stu3["nikeName"] = "kaige"
  stu3["age"] = 16
  ```

- 删除

  ```python
  stu3.pop("nikeName")
  print(stu3)
  ```

### 比较list与dict

- list

  优点：占用的内存空间小，浪费的内存很少

  缺点：查找和插入的效率会随着元素的增多而降低

- dict

  优点：查找和插入的速度极快，不会随着key-value的增多而降低效率

  缺点：需要占用大量的内存，内存浪费过多



## set 集合

**概述**

特性：与dict类似，是一组key的集合(不存储value)

本质：无序和无重复的集合

符号：{ }

### 基本使用

- 创建

  需要用一个list或者tuple作为输入集合。

  ```python
  #创建
  s1 = set([1,2,3,4,5])
  print(s1, type(s1))
  s2 = set((1,2,3,4,5))
  print(s2, type(s2))
  s3 = set("zutuanxue")
  print(s3, type(s3))
  ```

- 作用：列表去重

  ```python
  >>> li1 = [1,2,2,3,4,4,5]
  >>> s4 = set(li1)
  >>> li2 = list(s4)
  >>> print(li2)
  [1, 2, 3, 4, 5]
  
  # 
  >>> li1 = ['a','b','b','c','d','d','e']
  >>> s4 = set(li1)
  >>> li2 = list(s4)
  >>> print(li2)
  ['e', 'b', 'd', 'a', 'c']
  ```

  

- 在末尾添加元素

  ```python
  >>> s5 = set([1,2,3,4,5])
  # 不能直接插入一个数字元素
  # s5.update(6) # 报错
  >>> s5.update([6,7,8])
  >>> s5
  {1, 2, 3, 4, 5, 6, 7, 8}
  >>> s5.update((9,10,11))
  >>> s5
  {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}
  >>> s5.update([(12,13,14)])
  >>> s5
  {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, (12, 13, 14)}
  print(s5)
  >>> s5.update("15")
  >>> s5
  {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, '5', (12, 13, 14), '1'}
  ```

- 删除元素

  ```python
  >>> s6 = set([1,2,3,4,5])
  # 从左侧开始删除 s.pop()
  >>> print(s6.pop(),s6)
  1 {2, 3, 4, 5}
  
  # 按元素索引删除，如果元素不存在报KeyError的异常
  #s.remove(index)
  s6.remove(4)
  
  ```

- 遍历

  ```python
  s7 = set([1,2,3,4,5])
  
  for key in s7:
      print("--------", key)
      
  for index, key in enumerate(s7):
      print(index, key)
  ```

### 交集与并集

```python
s8 = set([1,2,3,4,5])
s9 = set([3,4,5,6,7])
#交集
print(s8 & s9)
#并集
print(s8 | s9)
```



## 更多说明

### 空值 None

None不能理解为0，因为0是有意义的，而None是没有任何实际意义的。

作用：

1、定义变量时，不知道初始值要赋值成什么，可以写赋值为None。当你有确定的值时再进行赋值

2、在字典中查找数据时，如果没有找到会返回一个None

### 类型转换

list、tuble、string、set类型转换：set()、list()、tuple()

**list/tuple/string->set**

`s = set([list]/(tuple)/"string")`



**tuple/set/string ->list**

`li = list((tuple)/{set}/"string)`



**list/set/string->tuple**

`t =  tuple([list]/{set}/"string")`



### 可更改(mutable)与不可更改(immutable)对象

**1、说明**

可更改：数据可更改且内存空间不变；

不可更改：内存空间中的数据不可更改，更改值需要分配新的内存空间，生成新的数据。

查看内存地址：`id(object)`

在 python 中，strings, tuples, 和 numbers 是不可更改的对象，而 list、dict、集合则是可以修改的对象。

**2、不可变类型**

变量对应的值中的数据是不能被修改，如果修改需要分配新的内存空间。

不可变类型：

- 数值（int, float, bool）

- 字符串（string）
- 元组（tuple）

**3、可变类型**

变量对应的值中的数据可以被修改，但内存地址保持不变

可变类型：

- 列表（list）
- 字典（dict）
- 集合（set）
