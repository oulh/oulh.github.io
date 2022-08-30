---
title: python基础
---



## 标识符

给变量、函数、类等命名。

**标识符规则**

1. 只能由字母、数字、下划线组成
2. 开头不能是数字
3. 不能是python的关键字

```python
# python关键字查看
>>> import keyword
>>> print(keyword.kwlist)
['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

4. 区分大小写
5. 见名知意



## 变量

**变量定义和赋值**

`变量名=值`，第一次赋值即定义了变量类型。变量使用前需要定义，否则出错。

**变量的命名**

规则和标识符一样。变量名不宜过长。

**删除变量**

`del 变量名`

## 数据类型

python的数据类型有：

- Number（数值）

  - 整数

    python3不再有长整型，都是int

  - 浮点数

  - 布尔

  - 复数

- String（字符串）

- None（空）

- list（列表）

- tuple（元组）

- dict（字典）

- set（集合）

## 基本数据类型

### 数字

#### 整数

**定义**

```python
# 普通定义
num1 = 10
# 连续定义
num2 = num3 = num4 = 5
# 交互定义
num5, num6 = 1, 2
```

**查看变量的内存地址**

`id(变量名)`

多个变量等于小整数对象，则这些变量的地址相同。小整数对象【-5~256】

**将十进制数字转为十六进制数字(0x为开头，不是数据内容部分)**

`hex(number)`

#### 浮点数

小数。

#### 布尔值

true和false

#### 数学函数

- 绝对值：`abs(num)`
- 最大值：`max(num1,num2,num3...)`
- 最小值：`min(num1,num2,num3...)`
- x的y次方：`pow(x,y)`
- 四舍五入：`round(x[,n])` n表示保留小数点后的多少位

数学模块

```python
# 导入数学模块
import math

#向上取整
print(math.ceil(10.2))
#向下取整
print(math.floor(10.9))
# 得到浮点数的小数部分和整数部分
#得到的是一个元组，元组的第一个元素为小数部分，第二个元素为整数部分
print(math.modf(10.3))
# 开平方
print(math.sqrt(10))
```

#### 随机函数

导入随机模块

```shel
# 导入随机模块
import random
```

- random.choice

  ```shell
  # choice(seq)  
  # 从序列（集合）中随机获取一个元素
  print(random.choice([1,2,4,3,5,6,7,8,9,0]))
  ```

- random.randrange

  ```shell
  # randrange([start,]stop[,step])
  # randrange(start,stop,step)
  # randrange(start,stop)
  # randrange(stop)
  # start：指定范围的开始值，包含在范围内，默认从0开始
  # stop：指定范围的结束值，不包含在范围内
  # step：指定阶跃值，默认为1
  print(random.randrange(1, 10, 2))
  print(random.randrange(1, 10))
  ```

- random.random

  ```shell
  # random()
  # 随机生成一个实数，范围在[0, 1)之间，得到的是浮点数
  print(random.random())
  ```

- random.uniform

  ```shell
  # uniform(x, y)
  # 随机生成一个实数，范围在[x, y]之间，得到一个浮点数
  print(random.uniform(3, 7))
  ```

- random.randint

  ```shell
  # randint(start, stop)
  # 在指定范围[start, stop]内得到一个整数
  print(random.randint(1, 4))
  ```



### 字符型、字符串

单引号或者双引号括起来的任意文本。

```python
# 基本类型字符串在使用是会自动转变为字符串对象类型
str1 = 'zutuanxue is a nice man'
```

如果字符串本身带单引号，外侧用双引号包裹起来（“he’s a good man”）

**多行字符**

```python
str3 = '''
good
nice
cool
handsome'''

str4 = """
good
nice
cool
handsome"""
```



**字符串运算**

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

**内容获取**

```python
# 内容获取
str8 = "zutuanxue is a good man"
# 根据下标(索引)获取字符串中的内容，下标从0开始
# 字符串[下标]
print(str8[2])
# 截取字符串中的一部分 字符串[start:stop]   [start, stop)
print(str8[1:4])
print(str8[1:])
print(str8[:4])
```

**成员判断**

```python
# 成员判断
str7 = "zutuanxue is a good man"
print("zutuanxue" in str7)
```



## 用户交互

### input输入

`input(["sftring"])`

input接收的所有输入默认都是字符串格式！

```python
>>> name = input("Name:");
Name:leo
>>> type(name)
<class 'str'>
>>> age=input ("age:")
age:16
>>> print (type(age))
<class 'str'>
```





**数据类型转换**

```python
# 把str转成int
#输出转换的结果，String本身不会改变。
int(String)
#得到int整型的age变量
age=int(input("age:"))

# 把int转成str
str(intNum)
```

### print输出

`print(["str"],[number],[表达式],[变量])`

```python
#
print("")
# 输出多个字符串。","后会输出一个空格
>>> print(name,age)
leo 16
# 打印不同类型的多个数据
>>> print(name,"age:",10+6)
leo age: 16
```

#### 格式化输出

**%s就是代表字符串占位符，%d,是数字占位符，%f是浮点数占位符**

|      %s      |     %d     |                  %f                  |
| :----------: | :--------: | :----------------------------------: |
| 格式化字符串 | 格式化整数 | 格式化浮点数字，可指定小数点后的精度 |

例：

```python
>>> height=170.333
>>> print("His height is %f"%(height))
His height is 170.333000
>>> print("His height is %.2f"%(height))
His height is 170.33
>>> age = 18
>>> print("zutuanxue is a nice man!He is %d years old"%(age))
zutuanxue is a nice man!He is 18 years old
>>> print("zutuanxue is a nice man!He is %4d years old"%(age))
zutuanxue is a nice man!He is   18 years old
>>> print("zutuanxue is a nice man!He is %-4d years old"%(age))
zutuanxue is a nice man!He is 18   years old
```

例：

`print("我叫%s，我今年%d岁，身高%f，具体身高%.1f" % (name, age, height, height))`

例：

把要打印的格式先准备好，把字符串里的占位符与外部的变量做个映射关系，实现便捷的格式化输出。

```python
name = input("Name:")
age = int(input("Age:"))
job = input("Job:")
hobbie = input("Hobbie:")
# 关联变量和占位符
info = '''
------------ info of %s -----------
Name  : %s
Age   : %d
job   : %s
Hobbie: %s
------------- end -----------------
''' %(name,name,age,job,hobbie)
print(info)
```

结果：
```python
>>> print(info)

------------ info of leo -----------
Name  : leo
Age   : 16
job   : Student
Hobbie: study
------------- end -----------------
```

#### 常用转义字符

|  `\n`  |    `\t`    |  `\\`  |  `\"`  |  `\'`  |
| :----: | :--------: | :----: | :----: | :----: |
| 换行符 | 横向制表符 | 反斜杠 | 双引号 | 单引号 |

```python
# 如果字符串里有很多字符需要转义，就需要加入很多\，为了简化，python允许使用r""表示，""内部的字符串默认不转义
#  打印\\\t\\
>>> print("\\\\\\t\\\\")
\\\t\\
>>> print(r"\\\t\\")
\\\t\\
```



## 运算符

### 基本运算符

- 算术运算符

  |  +   |  -   |  *   |  /   |  %   |  //  |  **  |
  | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
  |  加  |  减  |  乘  |  除  | 取模 | 取整 | 求幂 |

- 赋值运算符	

  |  =   |
  | :--: |
  | 赋值 |

- 复合运算符

  |  +=  | a += b  | 相当于 a = a + b  |
  | :--: | :-----: | :---------------: |
  |  -=  | a -= b  | 相当于 a = a - b  |
  |  *=  | a *= b  | 相当于 a = a * b  |
  |  /=  | a /= b  | 相当于 a = a / b  |
  |  %=  | a %= b  | 相当于 a = a % b  |
  | //=  | a //= b | 相当于 a = a // b |
  | **=  | a **= b | 相当于 a = a ** b |



### 真值与假值

- 假值（False）

  可表示假的值有：0 0.0 “” None False

- 真值（True）

  除了假值就是真值

### 关系运算符

- 关系运算符

  |  >   |  <   |   `>=`   |    <=    |  ==  |   !=   |
  | :--: | :--: | :------: | :------: | :--: | :----: |
  | 大于 | 小于 | 大于等于 | 小于等于 | 等于 | 不等于 |

### 逻辑运算符

- 逻辑与

  - 逻辑与运算符

    **and**

  - 逻辑与运算表达式

    格式：

    ` 表达式1 and 表达式2` 

    ` 表达式1 and 表达式2 and 表达式3 and …… and 表达式n`

- 逻辑或

  - 逻辑或运算符

    **or**

  - 逻辑或运算表达式

    格式：

    ` 表达式1 or 表达式2`
    ​` 表达式1 or 表达式2 or 表达式3 or …… or 表达式n`

- 逻辑非

  - 逻辑非运算符

    **not**

  - 逻辑非运算表达式

    格式：`not 表达式`

### 成员运算符

- 符号

  |   in   |  如果在指定的序列中找到值则返回真，否则返回假  |
  | :----: | :--------------------------------------------: |
  | not in | 如果在指定的序列中找不到值则返回真，否则返回假 |

- 格式

  x in seq

  x not in seq

  说明：x表示一个数据，seq表示一个集合

### 身份运算符

- 符号

  |   is   |  判断两个标识符是否引用同一个对象，是的话返回真，否则返回假  |
  | :----: | :----------------------------------------------------------: |
  | is not | 判断两个标识符是否不是引用同一个对象，是的话返回真，否则返回假 |

- 格式

  obj1 is obj2

  obj1 is not obj2

### 运算符优先级

1. `**`

2. `~` `+` `-` 按位取反，一元运算符（正负号）

3. `*` `/` `%` `//`

4. `+` `-` 二元运算符

5. `<<` `>>`

6. `&`

7. `|` `^`

8. `>` `<` `>=` `<=`

9. `==` `!=`

10. ###### `+=` `-=` `*=` `/=` `%=` `//=` `**=`

11. `is` `is not`

12. `in` `not in`

13. `and` `or` `not`



### 位运算符

- &

  按位与运算符：参与运算的两个值，如果两个相应位都为1，则该位的结果为1，否则为0

  ```
  '''
    0000 0101
    0000 0111
  --------------
    0000 0101
  '''
  print(5 & 7)
  ```

- |

  按位或运算符：参与运算的两个值，如果两个相应位有一个为1时，则该位的结果为1，否则为0

  ```
  '''
    0000 0101
    0000 0111
  --------------
    0000 0111
  '''
  print(5 | 7)
  ```

- ^

  按位异或运算符：参与运算的两个值，如果两个相应位不同时，则该位的结果为1，否则为0

  ```
  '''
    0000 0101
    0000 0111
  --------------
    0000 0010
  '''
  print(5 ^ 7)
  ```

- ~

  按位取反运算符：对数据的每个二进制位进行取反操作，把1变为0，把0变为1

  ```
  '''
    0000 0101
  --------------
    1111 1010
    1000 0101
    1000 0110
  '''
  print(~5)
  ```

- <<

  左移动运算符：运算数的各二进制位全部向左移动若干位，由符号右侧的数字指定移动的位数，高位丢弃，低位补0

  ```
  '''
      0000 1001
  ----------------
      0010 0100
  '''
  print(9 << 2)
  ```

- `>>`

  右移动运算符：运算数的各二进制位全部向右移动若干位，由符号右侧的数字指定移动的位数，低位丢弃，高位补0

  ```
  '''
      0000 1001
  ----------------
      0000 0010
  '''
  print(9 >> 2)
  ```



## 流程控制

### if判断语句

```python
if 表达式:
	语句
```

```python
if 表达式:
    语句1
else:
    语句2
```

```python
if 表达式1:
    语句1
elif 表达式2:
    语句2
……
elif 表达式n:
    语句n
else:
    语句e
#最后的else部分可有可无
```

**每一个elif都是对它上面所有表达式的否定**

三元表达式： 

`表达式 if 判断语句 表达式`

条件判断为真时返回 if 前面的表达式，为false时返回 else 后面的表达式。

### 循环语句while

```python
while 表达式:
    语句
```

**while-else语句**

```python
while 表达式:
    语句1
else:
    语句2
#当表达式的值为假时会执行“语句2”
```

**死循环**

```python
while 1:
	语句
```



### 循环语句 for

```python
for 变量名 in 集合:
    语句
```

#### range()生成列表

`range([start, ]stop[, step])`

range(stop)
range(start, stop)
range(start, stop, step)
功能：生成列表
参数：
start：表示列表起始值，包含， 默认为0
stop：表示列表结束值，但是不包含
step：阶跃值， 默认为1

```python
for x in range(5):
	#相当于
for x in [0,1,2,3,4]:
```



同时遍历列表的下标和元素 

```python
for index, word in enumerate(words):
   print(index, word)
```



### 循环控制

#### pass

作用：当语句要求不希望任何命令或代码来执行时使用

说明：

1. pass语句表示一个空操作，在执行时没有任何的响应，pass的位置最终应该有代码来执行，只不过暂时写不出来
2. 可以使用在流程控制和循环语句中

```python
if 1:
    pass
```

#### break

作用：退出循环
注意：只能跳出距离最近的for或者while循环

- for

  ```python
  for x in range(10):
      if x == 5:
          # 结束循环(跳出循环)
          break
      print("x = %d"%x)
  ```

  ```python
  for x in range(3):
      for y in range(5):
          if y == 3:
              break
          print("******", y)
      print("-------", x)
  ```

- while

  while循环语句可以有else子句，表达式为假时会被执行，但是使用break终止while循环后else中的子句不执行

  ```python
  num = 0
  while num < 8:
      print("num = %d"%num)
      num += 1
      if num == 8:
          break
  else:
      print("--------else")
  ```

#### continue

作用：跳过本次循环后面的剩余语句，然后继续下一次循环
注意：只能跳过距离最近的for或者while循环

- for

  ```python
  for x in range(10):
      if x == 5:
          continue
      print("x = %d"%x)
  ```

- while

  ```python
  num = 0
  while num < 10:
      if num == 5:
          num += 1
          continue
      print("num = %d"%num)
      num += 1
  ```

## 注释

python的注释方式：

```python
# 单行注释：井号后面行内容被注释掉

'''多行注释
该引号内的内容均被注释
注释内容1
注释内容2
'''

"""多行注释
该引号内的内容均被注释
注释内容1
注释内容2
"""
```

重要或不好理解的部分加注释即可；

注释不光是给自己看，还要给别人看

