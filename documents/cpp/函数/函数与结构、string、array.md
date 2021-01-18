### 传递和返回结构
当结构比较小的时候，按值传递是比较靠谱的。(传入时，将结构赋值为函数内部的副本，而不是本体)
```cpp
struct travel_time {
    int hours;
    int mins;
}

// 函数原型
travel_time sum(travel_time t1, travel_time t2)

// 定义
travel_time sum(travel_time t1, travel_time t2) {
    travel_time total;
    total.mins = (t1.mins + t2.mins) % 60;
    total.hours = t1.hours + t2.hours + (t1.mins + t2.mins) / 60;
    return total;
}
```

当结构较大的时候，很明显这种复制是没有道理的，我们更多的会去传递一个指针入函数内。这样可以节省时间和空间。
```cpp
void show_polar(const polar *pda) {
    using namespace str;
    cout << pda -> distance
    cout << (*pda).distance
}
```

我们可以基于地址修改已有的结构，而非返回
```cpp
void func(rect *pad) {
    pad.name = "ranhao"
}
```

### 函数与string对象
与数组相比，string对象与结构在函数的使用上更相似。
```cpp
vaoid display(const string sa[], int n) {
    for(int i = 0; i < n; i++) {
        cout <<sa[i]
    }
}
```
### 函数和array对象

在c++中，类对象是基于结构的，因此，结构所要考虑的因素也同样适用于类。
例如可以按值将对象传递给函数，当然我们也可以传指针操控原对象。
例子：
```cpp
void show(std::array<double, 4> da) { // std::array<double, 5> *pd
    using namespace std;
    double total = 0.0;
    ...
}
```


