---
title: os模块-python操作linux系统
---

## os模块常用属性和方法

作用：包含了基本的操作系统功能，提供了非常丰富的方法用来处理文件和目录

- 属性

  | 名称    | 说明                                                    |
  | ------- | ------------------------------------------------------- |
  | name    | 操作系统的类型，nt表示windows，posix表示Linux、Unix     |
  | uname   | 获取操作系统的信息，linux、Unix下使用                   |
  | environ | 获取系统中的环境变量，environ.get()可以获取环境变量的值 |
  | curdir  | 返回当前的目录                                          |

- 方法

  | 名称      | 说明                                                         |
  | --------- | ------------------------------------------------------------ |
  | getcwd()  | 返回当前工作目录的绝对路径                                   |
  | listdir() | 返回指定目录下的所有文件和目录                               |
  | mkdir()   | 创建指定目录，注意目录已经存在时会报错，目录路径中存在不存在的层级时报错 |
  | rmdir()   | 删除目录，注意目录不存在则报错                               |
  | rename()  | 重命名                                                       |
  | stat()    | 获取文件属性                                                 |
  | remove()  | 删除普通文件                                                 |
  | system()  | 运行shell命令                                                |

- 示例

  ```python
  import os
  
  # 操作系统的类型
  # nt     windows
  # posix  Linux、Unix
  print(os.name)
  # 获取操作系统的信息，linux、Unix下使用
  print(os.uname())
  # 获取系统中的环境变量
  print(os.environ)
  # 获取指定环境变量的值
  print(os.environ.get("PATH"))
  
  # 返回当前的目录
  print(os.curdir)
  
  # 返回当前工作目录的绝对路径
  print(os.getcwd())
  
  # 返回指定目录下的所有文件和目录
  print(os.listdir(r"path"))
  
  # 创建指定目录，注意目录已经存在时会报错，目录路径中存在不存在的层级时报错
  os.mkdir(r"path")
  os.mkdir(r"path")
  
  # 删除目录，注意目录不存在则报错
  os.rmdir(r"path")
  
  # 重命名
  os.rename(r"dirname or filename", r"new name")
  
  # 获取文件属性
  print(os.stat(r"filename"))
  
  # 删除普通文件
  os.remove(r"filename")
  
  # 运行shell命令
  os.system("notepad")
  os.system("shutdown -s -t 10")
  os.system("shutdown -a")
  ```

## os.path常用方法

操作文件和目的函数一部分在os模块中，还有一部分在os.path中

| 名称       | 说明                                      |
| ---------- | ----------------------------------------- |
| abspath    | 返回指定路径的绝对路径                    |
| join       | 拼接路径（不论是否存在）                  |
| split      | 拆分路径（不论是否存在）                  |
| splitdrive | 以路径第一个’/'为分隔，分隔驱动器名与路径 |
| splitext   | 获取文件的扩展名（不论是否存在）          |
| basename   | 获取目录或文件名（不论是否存在）          |
| getsize    | 获取属性                                  |
| getctime   | 获取属性                                  |
| isdir      | 判断是否是目录                            |
| isfile     | 判断是否是文件                            |
| exists     | 判断目录和文件是否存在                    |
| isabs      | 判断是否是绝对路径（不论是否存在）        |

```python
import os

# 返回指定路径的绝对路径
>>> os.path.abspath(".")
'C:\\WINDOWS\\system32'
>>> os.path.abspath(".")
'/root/study

# 拼接路径（不论是否存在）
>>> os.path.join(r"path", "a.txt")
'path/a.txt'
# 拆分路径（不论是否存在）
>>> os.path.split(r"path/file")
('path', 'file')
>>> os.path.split(r"path/file/sunck.txt")
('path/file', 'sunck.txt')
# 以路径第一个'/'为分隔，分隔驱动器名与路径（Windows有效）
>>> os.path.splitdrive(r"C:\path\file")
('C:', '\\path\\file')
# 获取文件的扩展名（不论是否存在）
>>> os.path.splitext(r"test-file.md")
('test-file', '.md')

# 获取目录名（不论是否存在）
>>> os.path.basename(r"path/file")
'file'
# 获取文件名（不论是否存在）
>>> os.path.basename(r"path/file/sunck.txt")
'sunck.txt'

# 获取属性
>>> os.path.getsize(r"test-dir/test-file.md")
0
>>> os.path.getctime(r"test-dir/test-file.md")
1659891863.9607382

# 判断是否是目录
>>> os.path.isdir(r"test-dir")
True
>>> os.path.isdir(r"test-dir/test-file.md")
False

# 判断是否是文件
>>> os.path.isfile(r"test-dir/test-file.md")
True
>>> os.path.isfile(r"test-dir")
False

# 判断目录和文件是否存在
print(os.path.exists(r"path/file"))

# 判断是否是绝对路径（不论是否存在）
print(os.path.isabs(r"path/file"))

```