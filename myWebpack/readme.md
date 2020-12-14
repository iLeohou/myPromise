>旨在测试webpack的文档功能

## 第一天

### - 入口
从入口起，webpack会找出哟那些模块和库是与入口有关的，对其进行整合后会输出到bundles文件中。

#### entry的属性分为三种
1. 字符串
```js
entry: './path/to/my/entry/file.js'
// 其实等价于下面的形式
entry: {
    main: './path/to/my/entry/file.js'
}
```
2. 数组
```js
entry: ['./b.js', './a.js']
// a与b两个不相关的库将会整合成一个文件
// 因为无脑的堆叠而丧失了灵活性
```
3. 对象
```js
entry: {
    app: './a.js',
    vendors: './vendors.js'
}
```