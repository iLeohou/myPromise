# html-webpack-plugin

刚刚开始学习的时候我们可以看见这样的例子：
```js
// webpack.config.js
module.exports = {
    entry: path.resolve(__dirname, './app/index.js'),
    output:{
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'
    }
    ...
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
```
我们使用webpack后，会发现dist目录下自动生成了bundle.js和index.html。
html文件自动引入了bundle.js。这都是HtmlWebpackPlugin的功劳。**他会自动的帮助你生成html文件，并且引入相关的assets文件（css或者js文件）**

### HtmlWebpackPlugin接受一个对象参数
1. ### title
    >标签名字
2. ### filename
    >生成的文件名字，默认为index.html
3. ### template
    >根据你指定的模板文件来生成html文件。模本文件可以是html，ejs，jade等等。但是请确定你安装了loader，否则webpack无法正常解析。template的内容优先级最高，例如title，icon在template定义好的情况下，默认使用。
3. ### inject
    > - true 默认值，script标签位于body底部
    > - body 同ture
    > - head 在head标签
    > - false 不插入
4. ### favicon
    > 指定标签图标
5. ### minify 
    > 对html进行压缩，其内部集成了html-minifier，所以这里的选项是和html-minify完全一样的。
    > 1. false 默认值
    > 2. 对象，参照html-minifier

6. ### hash
    > 作用是给生成的js文件一个独一无二的hash值，每次编译后webpack都会产生的值
    > 好像没什么用，默认为false
    > \<script type=text/javascript src=bundle.js22b9692e22e7be37b57e><\/script>
7. ### cache
    > 只有在内容变化时才会生成新的文件，默认为true
8. ### showErrors
    > showErrors 的作用是，如果 webpack 编译出现错误，webpack会将错误信息包裹在一个 pre 标签内，属性的默认值为 true ，也就是显示错误信息。
9. ### chunk 
    > 此处可以看出是针对多入口文件的，当你拥有多入口文件的时候，对应就会生成多个编译后的js文件，那么chunk选项就可以决定你去使用哪个文件，你也可以使用多个htmlplugin来生成多个html文件去一一匹配。默认全部引入
    举个例子
    ```js
    // webpack.config.js
    entry: {
        index: path.resolve(__dirname, './src/index.js'),
        index1: path.resolve(__dirname, './src/index1.js'),
        index2: path.resolve(__dirname, './src/index2.js')
    }
    ...
    plugins: [
        new HtmlWebpackPlugin({
            ...
            chunks: ['index','index2']
        })
    ]
    ```
10. ### excludeChunks
    > 没错，和楼上相反的

11. ### chunksSortMode
    > 不太懂，日后再说




### 实践

不应该再在html里面去主动引入js文件了，这样的话可能会造成双重引入，并且public这个蛋疼的选项还会受到奇奇怪怪的干扰，所以我们就保持其的script标签简洁。