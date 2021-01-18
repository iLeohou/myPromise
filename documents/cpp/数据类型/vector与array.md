vector类似于string，也是一种动态数组。
使用方法：
```cpp
#include <vetor>
using namespace std;
int main() {
    vector<int> vi;
}
```
上面的vi是vector<int>的一个实例对象，
vector会在你插入或者添加值的时候自动调整长度，因此你可以将vi初始长度设置为0.如果要调整长度等的信息，vector内有对应的函数方法使用。
我们也可以使用struct
`vector<food> bbd(n)`n代表这个vector存储的food数量。bbd是一个vector实例，类似数组存储着n个food实例。

vector的功能比较强大代价就是效率的底下。


