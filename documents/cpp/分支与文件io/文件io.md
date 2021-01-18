### 文件的读取
这和键盘输入是差不了多少的。
首先我们将文本的一系列输入缓冲到内存当中，然后程序逐个读入处理
```cpp
char ch;
cin >> ch;
```
例如`38.5 19.2`
将会读取3的ascii码。

以下又不一样了，因为ch是int类的，将读取38后发现有效，赋给ch
```cpp
int ch;
cin >> ch
```

以下又不一样了，因为ch是double类的，可以容纳小数，法案现38.5有效，给ch。(也就是直到读到不是浮点数为止)
```cpp
double ch;
cin >>ch;
```

### 头文件fstream和iostream联合
我们使用的cout便是ostream，头文件早早帮我们定好了，但是fstream的ofstream对象我们是没有的，我们需要自己去定义他。
#### 写入
```cpp
ofstram outFile;
ofstram fout;
outFile.open("fish.txt");
char filename[50];
cin >> filename;
fout.open(filename);
```
一旦我们open了他，我们就可以如同cout一样去使用它了
```cpp
double wt = 125.8;
outFile << wt;
fout << wt << endl;
outFile.close();
fout.close();
```
这个做法是，如果有，则清楚内容，重新输入内容入内，如果没有，则新建文件夹。是最基础的文件写入。我们可以修改这个默认行为。

#### 读取

```cpp
ifstram fin;
fin.open("xx.txt");
double wt;
fn >> wt;
```

如果我们试图打开一个不存在的文件会怎么样呢，其实这是和cin一样的结果，会导致cin为false，进行输入给其他文件，或者变量时会出错。


