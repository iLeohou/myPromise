### output.publicPath
对于按需加载或加载外部资源（如图片、文件等）来说，output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。

此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」。相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析。相对于服务的 URL(Server-relative URL)，相对于协议的 URL(protocol-relative URL) 或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时。

    大白话：用于引导静态资源(js,css,img)，比如在页面引入了background-image:url(’./people.png’); 这时候这里的路径就会相对publicPath做调整；指定了一个基础的路径。

    例如publicPath为 ```hao123.com```，此处就会自动去 ```
    hao123.com/people.png```寻找资源。

    值得一提的是，定义好publicPath后，webpack-dev-server也会根据该字段自动将静态资源资源定义在相对于publicPath路径下。

    所以此处可以将我们定义好的分为两种，一种为开发环境，一种为生产环境，分别定义好publicPath即可。

### devServer.publicPath

作用就是将devServer的资源放置于何处，

假设服务器运行在`http://localhost:8080`并且 `output.filename` 被设置为 `bundle.js`。

默认 `devServer.publicPath` 是 '/'，所以你的包(bundle)可以通过`http://localhost:8080/bundle.js` 访问。

修改 `devServer.publicPath`为`dist`，则你只能通过`http://localhost:8080/dist/bundle.js`。

当然你不设置的时候，会根据`output.publicPath`来自动设置（如果有的话）

优先级可以视为 ：`devServer.publicPath` > `output.publicPath` > `default`。

webpack-dev-server将会根据以上的优先级输出资源到本地开启的服务器上