### postcss是什么
我们知道babel，它是使用js转换js的工具，那么postcss，便是使用js转换css的工具。它将css文件载入，解析成ast，然后在做修改，即可完成转译。与js一样的命运，浏览器对css的标准化支持也是慢的出奇，导致我们很多特性无法在几年内使用，严重导致了api与使用上的割裂感。<span style='color: red'>同样的post-css的核心也是插件</span>！

**less/sass**是两种预处理器，你也许觉得他们的作用和postcss差不多，但是其实是并不是这么一回事，首先postcss处理的必须是css文件，然后postcss的本质工作室解析活的css ast树。如果硬要类比的话，sass更像是postcss的插件。

### 为什么要用
因为方便好用。。我们不需要在去下载多种的工具转换，只需要配置post-css即可

栗子：
less需要自己配置函数来使用
```css
.flex-block() {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
}
.test{
    .flex-block()
}
```
post-css只需要autoprefixer插件即可，会自动补充
当属性多起来的时候，我们就能够清楚的感受到差距
```css
.test{
    display: flex;
}

```

### 工作原理
我们之前稍微提到过工作原理，现在可以去看同目录喜爱的post-css图片。

### 常用小全书
>PostCSS 插件列举
Autopreﬁxer：自动补全浏览器私有前缀
precss：CSS 预处理（整合 Sass、LESS 或 Stylus 功能，语法基本和 Sass 的相同）
postcss-import：通过 @import，整合多个 CSS 文件
css-mqpacker：将相同的 CSS 媒体查询规则合并为一个
cssnano：压缩 CSS 文件
postcss-color-rgba-fallback：给 rgba 颜色创建降级方案(添加备用颜色)
postcss-opacity：给 opacity 提供降级方案（给 IE 浏览器添加滤镜属性）
node-pixrem：让 IE8 ⽀持 rem 单位
postcss-pseudoelements：将伪元素的 :: 转换为 : ( IE8 不支持 :: )

应该怎么和css-loader和style-loader共同使用呢？
先使用post-loader解析css文件的特性（例如变量等），然后交付css-loader将其转变为js字符串，再由style-loader动态创建style标签插入。

此处的postcss-loader的配置项优先级最高，如果没有会降级至目录文件寻找`.postcssrc`文件的配置信息。
```js
{
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
        "style-loader",
        "css-loader",
        "postcss-loader"
    ]
}
```