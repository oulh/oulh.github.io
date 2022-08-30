---
title: 内置函数-python文件IO操作
---



一段简单的文件读写过程：

```python
>>> fp = open("test-dir/test-file.md", "r+")
>>> fp.read()
'Hello World'
>>> fp.write("Enjoy Study")
11
>>> fp.read()
''
>>> fp.flush
>>> fp.close()
>>> fp = open("test-dir/test-file.md", "r")
>>> fp.read()
'Hello WorldEnjoy Study'
>>>fp.close()
```



## 打开文件

**open()**

原型：

`def open(file, mode='r', buffering=None, encoding=None, errors=None, newline=None, closefd=True)`

- 参数

  file：要打开的文件的路径

  mode：打开方式

  encoding：编码格式

  errors：错误处理方式（ignore表示直接忽略）

- 返回值

  文件描述符，从当前的位置操作当前打开的文件

打开方式

| 方式 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| r    | 以只读的方式打开文件，文件的引用(描述符)将会被放在文件开头   |
| rb   | 以二进制格式打开只读文件，文件的引用(描述符)将会被放在文件开头 |
| r+   | 以读写的方式打开文件，文件的引用(描述符)将会被放在文件开头   |
| w    | 以只写的方式打开文件，如果该文件存在，则将其内容覆盖，如果文件不存在则会创建该文件 |
| wb   | 以二进制格式打开只写文件，如果该文件存在，则将其内容覆盖，如果文件不存在则会创建该文件 |
| w+   | 以读写的方式打开文件，如果该文件存在，则将其内容覆盖，如果文件不存在则会创建该文件 |
| a    | 打开一个文件用于追加内容，如果该文件存在，文件描述符会被放到文件的末尾，如果文件不存在则会创建该文件 |
| a+   | 打开一个文件用于读写，如果该文件存在，文件描述符会被放到文件的末尾，如果文件不存在则会创建该文件 |

打开普通文件

```py
fp = open(path, "r")
```

打开二进制文件

```py
fp = open(path, "rb")
```

指定编码格式

```py
fp = open(path, "r", encoding="utf-8")
```

指定错误处理方式

```py
fp = open(path, "r", encoding="utf-8", errors="ignore")
```



## 读操作

**read()**



`fp.read()` 读取文件的全部内容

`fp.read(num)` 读取指定字节数的内容

`fp.readline()`  读取整行内容(包括\n字符)

`fp.readline(num)` 读取指定字节数内容

```python
>>> fp = open("test-dir/test-file.md", "r")
>>> fp.readline(10)
'Hello Worl'
>>> fp.read(4)
'dEnj'
>>> fp.read()
'oy Study'
>>> fp.read()
''
>>> fp.close
```

`fp.readlines()` 读取所有行并返回一个列表，列表中的元素是每行内容

```python
li = fp.readlines()
```



**读文件完整过程：**

```python
try:
    fp = open("file.txt", "r")
    print(fp.read())
finally:
    if fp:
        fp.close()
```

**读文件简写方式：**

```python
with open("file.txt", "r") as fp:
    print(fp.read())
```



## 写操作

过程：

- 找到文件
- 打开文件
- 将内容写入缓冲区，此时内容没有写入文件
- 刷新缓冲区，直接把缓存区中的数据立刻写入文件
- 关闭文件



刷新缓冲区方式

- 程序结束
- 关闭文件
- 手动刷新
- 缓冲区满了
- 遇到\n



找到文件

```python
path = "file.txt"
```

打开文件

```py
fp = open(path, "w")
```

将内容写入缓冲区

```python
fp.write("sunck good")
```

手动刷新缓冲区

```py
fp.flush()
```

关闭文件

```py
fp.close()
```

**写文件完整过程：**

```python
try:
    fp = open("file.txt", "w")
    fp.write("cool man")
finally:
    if fp:
        fp.close()
```

**写文件简写方式：**

```python
with open("file.txt", "w") as fp:
    fp.write("cool man")
```



## 关闭文件

- 注意

  文件使用过后必须关闭

- 原因

  释放资源，系统能打开的文件个数是有限制的，所以需要释放相应文件的文件描述符

- 关闭方式

  程序结束自动关闭：程序结束时会释放文件对象的空间，文件会关闭，但是不建议这样来做，最好手动关闭

  手动关闭：调用代码关闭

- 示例

  ```py
  fp.close()
  ```



## 编码与解码

1、编码

```python
with open("file.txt", "wb") as fp:
    s = "sunck is a good man凯"
    s = s.encode("utf-8")
    fp.write(s)
```

2、解码

```python
with open("file.txt", "rb") as fp:
    s = fp.read()
    s = s.decode("utf-8")
    print(s)
```

3、chardet模块

- 作用

  使用chardet检测编码，支持检测中文、日文、韩文等多种语言

- 安装

  pip install chardet

- 使用

  ```python
  import chardet
  
  # 注意：数据量小，猜测的不准
  data = "凯哥是一个好男人".encode("gbk")
  # print(data)
  
  ret = chardet.detect(data)
  print(ret, type(ret))
  '''
  encoding：表示编码格式
  confidence：表示检测的正确的概率
  language：表示数据的语言
  '''
  
  '''
  GBK是GB2312的超集，两者是同一种编码
  '''
  info = data.decode(ret["encoding"])
  print(info)
  ```

## 特殊的读写

1、list、tuple、dict、set的文件操作

- pickle模块

  持久化保存对象，将list、tuple、dict、set等数据序列化存储到文件

  ```python
  import pickle
  ```

- 存储

  ```python
  user = {"account": "sunck", "passwd": "666"}
  with open("file.txt", "wb") as fp:
      pickle.dump(user, fp)
  ```

- 读取

  ```python
  with open("file.txt", "rb") as fp:
      user = pickle.load(fp)
  print(user, type(user))
  ```

2、StringIO

- 作用

  数据的读写不一定都是文件，也可以是内存中读写，StringIO可以在内存中读写字符串

- 导入

  ```python
  from io import StringIO
  ```

- 写

  ```python
  fp = StringIO()
  fp.write("sunck is\n")
  fp.write(" a good ")
  fp.write("man!")
  # 获取写入的内容
  print(fp.getvalue())
  ```

- 读

  ```python
  fp.seek(0)
  print(fp.read())
  fp.seek(0)
  print(fp.readline())
  fp.seek(0)
  print(fp.readlines())
  ```

注意：文件使用后关闭文件

3、BytesIO

- 作用

  数据的读写不一定都是文件，也可以是内存中读写，StringIO只能操作字符串，BytesIO可以操作二进制数据

- 使用

  ```python
  from io import BytesIO
  
  fp2 = BytesIO()
  fp2.write("sunck is a nice man".encode("utf-8"))
  
  fp2.seek(0)
  print(fp2.read().decode("utf-8"))
  
  fp2.close()
  ```

