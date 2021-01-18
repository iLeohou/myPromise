### if语句
和js差不多。

### 逻辑表达式
和js差不多，注意与比或优先级高，但是最好加括号吧，免得麻烦

### 字符函数库 cctype
我们使用这个函数库能够帮助我们确定一些内容，例如字符串中是否是一个字母，是否是数字，是否是标点符号等。

```cpp
#include <cctype>
using namespace std;
int main() {
    int ch = 'a';
    int result;
    result = isalpha(ch);
    cout << result;
    result = ispunct(ch)
    cout << result;
    return 0
}
```
这通常比我们使用条件运算判断ascii更合适方便。

### expression ? expression2 : expression3
一样

### switch 
一样
```cpp
switch(label) {
    case lable1: statement
    break;
    case lable2: statement
    break;
    default    : statement
}
```

### break和continue
可以在循环和switch中使用break
continue只能使用在循环中。
差不多

### goto
```cpp
goto paris
paris: cout << "You've just arrived at Paris.\n"
```

