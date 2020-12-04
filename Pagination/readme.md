## 原生 JS实现一个简单分页插件
### 简要

>代码思路摘自:  https://juejin.cn/post/6844903543749476365
此处主要是typescript化了该插件，并且对待细节做了一些处理修改（可能会导致错误，此代码插件主要用于阅读以及学习，万万不可商用）

### 用法

首先 `new`这个类，然后调用 `init`方法，传入相应的参数即可，例如：
```js
const slp = new SimplePagination(12)
slp.init({
  container: '.box',
  maxShowBtnCount: 3,
  onPageChange: state => {console.log('pagination change:', state.curPage)}
})
```
其中，在 `new`实例化 `SimplePagination`类的时候，需要传入 `1`个参数，即总页数(`totalPageCount`)，分页插件需要根据此值来进行页码元素的绘制。

调用 `init`方法时，为了方便传参，此方法接收一个对象，对象中存在以下属性：

|参数名|类型|`default`|说明|是否必填|
|---|---|---|---|---|
|`container`|`string`|`body`|一个`DOM`元素的选择器，`id` 或者 `class`均可，表示分页的容器|否|
|`maxShowBtnCount`|`number`|`5`|不包括开头和结尾的两个固定按钮外，中间最多展示几个数字页码按钮|否|
|`allPageClassName`|`string`|`page-li`|所有的分页页码元素的统一类名，包括上一页、下一页|否|
|`activeClassName`|`string`|`page-active`|当选中页码时添加的类名`class`|否|
|`dataNumberAttr`|`string`|页码元素上的一个属性，其值为页码元素所表示的页码|`data-number`|否|
|`prevClassName`|`string`|`page-prev`|上一页 按钮的类名`class`|否|
|`nextClassName`|`string`|`page-next`|下一页 按钮的类名`class`|否|
|`disablePrevClassName`|`string`|`no-prev`|禁用 上一页 按钮的可用性时给此按钮添加的类名`class`|否|
|`disableNextClassName`|`string`|`no-next`|禁用 下一页 按钮的可用性时给此按钮添加的类名`class`|否|
|`pageNumberClassName`|`string`|`page-number`|不包括 上一页 下一页、省略号占位符按钮之外的所有页码元素统一类名|否|
|`switchEvent`|`string`|`click`|触发切换页面的事件|否|
|`onPageChange`|`string`|-|页码切换时的回调函数|否|

除了根据页面上的页码和上一页、下一页按钮进行页码切换外，插件还有一个 `gotoPage`方法可用，此方法接收一个类型为 `number`的参数，调用此方法，就会跳到此参数指定的页码上，例如，跳转到页码 `9`上：
```js
slp.gotoPage(9)
```

如果传入的参数不是合法的页码，则不会进行任何操作。

>`SimplePagination`这个类主要在于页码切换的逻辑判断，外加简单地组装了 `DOM`结构，默认是没有样式的，我在示例代码中随便写了个样式，如果你不喜欢这个样式完全可以自己重写。