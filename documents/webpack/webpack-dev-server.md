# webpack-dev-server

> 我们知道一个webpack构建最起码需要一个入口和一个出口，随即便可以得到一个bundle文件，我们根据这个来对js进行打包和编译。虽然webpack --watch的功能也提供了动态监测来监听文件的改变实时打包，但是其实打包的速度还是依旧缓慢的。每次更新完成后还需要手动的刷新浏览器。webpack-dev-serve的出现便是使得我们在开发的过程中更加的方便，迅速的，能够在文件变化的同时，迅速做到更新。

tip： webpack-dev-server主要是启动了一个express的服务器，提供静态资源，服务器与客户端之间使用了ws通信，文件改动后就会主动通知客户端。webpack-dev-server的文件都是输出至内存而非原始目录的。

### 以下是主webpack-dev-server的要属性（在webpack.config.js的devSerVer对象）

#### 1.  contentBase
它指定了服务器资源的根目录，如果不写入该值，则默认输出为根目录。并且默认打开根目录下的`index.html`文件（如果有的话），没有则会显示出一个资源界面。
我们一般会使用html-webpack-plugin的插件动态生成，这样的话我们需要将contentBase指向到dist目录下才行。其他的用处还未完善

#### 2. port/host
定义打开的端口号与主机号

#### 3. historyApiFallback
应对返回404页面时定向到特定页面用的
我们在dist目录下新增一个404的html页面
我们看看如何配置，这样也可以解决vue的history模式下无法重定向回去的问题
```js
devServer: {
    contentBase: path.join(__dirname, "dist"),
        historyApiFallback:{
            rewrites:[
                {from:/./,to:'/404.html'}
            ]
        }
    }
}
```
#### 4. overlay
在整个页面上显示编译时产生的错误信息（如果有的话），熟悉vuecli的应该非常常见的一种情况，个人感觉没什么用（一般还是在编译器内看错误），当然默认也是关闭的。
```js
devServer: {
    // 即可开启
    overlay: true
}
```

#### 5. stats
这个配置属性用来控制编译的时候shell上的输出内容。
一般来说我们将会在页面上看到很多信息，包括每个文件的构建成功，我们不需要去知道。
我们只需要去知道有没有报错就可以了。
当然还有很多其他的选项，不多赘述。

```js
devServer: {
   stats: "errors-only"
}
```
#### 6. quiet
这个基本没什么用，也是控制控制台信息展示的，第一次编译展示没什么不一样，第二次编译就会变成极简编译的样子。

#### 7. compress
true时会采用gzip压缩资源。

#### 8. hot/inline
我们在写代码的时候，如果文件发生了改变，页面都会自动刚刷新，我们做的修改会呈现到页面上（之前有提到的。）
hot和inline应该是要共同去作用才会有所效果。
在热替换（HMR）里，则不是之前那样的原始刷新，而是根据加载的模块，进行更为细致的更新，只会去更新变化了的那部分。

webpack-dev-serve有两种方式可以实现自动刷新和HMR。

- iframe模式（旧版本默认，新版本好像已经移除）
没什么特殊的，将html页面嵌入iframe内，并在模块变化的时候重载页面
- inline模式
```js
devServer: {
   inline: true,
   hot: true
}
// 开启之后，dev-server会在entry内做修改。
// 新增加了一个入口文件。
entry:{
    app:[
        path.join(__dirname,'src','index.js'),
        'webpack-dev-server/client?http://localhost:8080/'
        ]
}

// 当然不仅于此，还需要增加一个插件HotModuleReplacementPlugin
```

#### 其他选项。。。

### 聊一聊inline与iframe模式下的区别
我们知道，webpack-dev-server开启服务后，会与客户端建立好连接。
那么我们在启动客户端的时候，仅仅是只打开了index.html吗？不是的，仅仅是打开index.html不会有那么多有用的功能。比如socket连接的库，就不可能存在。所以在webpack-dev-server开启服务后，很明显，他会将一个特殊的js注入到index.html内，使其能够连接上ws与服务端通信，所以这就有了两种注入js的方式--iframe，--inline。

--iframe就简单了，就是在外层的文件下，特殊js作用，这个特殊js完成与服务端通信，开启iframe，刷新iframe等等的活动。那么我们的应用文件就是注入到了iframe内的。

>本质上是加载了live.bundle.js文件，其不但创建了iframe标签，同时包含socket.io的client代码，以和webpack-dev-server进行websocket通讯，从而完成自动编译打包、页面自动刷新的功能。


--inline又是另外一种实现方式了，他通过入口数组的方式，直接将这个特殊的js文件混入我们开发的js文件内，上述的功能，包括开启ws，刷新等等。

网上教程大多是旧版本的，新版本怎么实现细节未知，等未来开发需要使用的时候再来完善。看样子好像已经去除了ifranme模式了。可以去`http://localhost:8080/webpack-dev-server.js`查询其自动生成的代码。




