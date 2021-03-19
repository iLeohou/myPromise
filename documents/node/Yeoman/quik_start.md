## Yeoman start!
### Yeoman是什么？
还在为一个简单的脚手架搭建而苦恼吗？直接使用制作脚手架的库Yeoman来快速搭建一个属于你自己的脚手架！
Yeoman 支持你搭建一个简单的只能复制文件的脚手架，也可以搭建基于问答模式复杂的自定义脚手架！

**quick start**
```js
tnpm install -g yo
yo xxx(脚手架名称)
```
>我们可能会发生一个环境报错，如果不想升级环境，可以把yeoman降级到4.0。

我们可以看到核心就是需要创建一个脚手架，yeoman提供了简单的api使得我们可以快速的构建。当然，代价就是我们需要使用yo来运行这个脚手架。

### 如何创建yeoman脚手架
我们创建的脚手架依赖于yo的一个库，名字为`yeoman-generator`，其是我们脚手架能yo调用的核心库。yeoman（也就是yo）会检查packge.json的files字段，确认脚手架的具体情况（脚手架可以包含子脚手架，所以需要一定的确认）。我可以把脚手架放在项目根目录，也可以放在generators文件夹下（如果你觉得放在根目录不好看的情况下），例如我便放到了generators下
```json
  "files": [
    "generators/app",
    "generators/sub_app"
  ]
```
此时我们如果要调用主生成器，则执行`yo xxx（yo xxx:app）`，调用子生成器，则执行`yo xxx:sub_app`

主生成器和子生成器的区别暂且不谈，这里只谈论到简单的生产器编写。我们以主生成器app为例。
app目录下，我们存放`template目录，index.js文件`(固定格式)，js文件需要导出一个继承yo提供的一个类的子类。我们在继承yo所给的基类的时候，可以针对开放的一些api做出操作，例如询问用户，例如拷贝文件（核心）来实现我们的脚手架。以下是我们的index文件。
```js
const Generators  = require('yeoman-generator');
module.exports = class extends Generators{
    async prompting() {
        this.answer = await this.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Your project title'    
            },
            {
                type: 'input',
                name: 'age',
                message: 'plz input you age'
            },
            {
                type: 'input',
                name: 'project_name',
                message: 'plz input your project_name'
            },
            {
                type: 'input',
                name: 'project_desc',
                message: 'plz input you project_desc'
            }
        ])
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('./index.html'),
            this.destinationPath('./public/index.html'),
            { 
                title: this.answer.title,
                age: this.answer.age
            }
        )

        this.fs.copyTpl(
            this.templatePath('./package.json'),
            this.destinationPath('./public/package.json'),
            { 
                project_name: this.answer.project_name,
                project_desc: this.answer.project_desc
            }
        )
    }
}
```

以上的文件内容可以猜到大致的yeoman的使用情况。其会有几个函数提供给yo来执行（类似于vue的生命周期函数）。同时也在基类上挂载了许多的方法函数，使得yo在多种工具下能够产生一致性的效果，而不至于只能在控制台使用。比如`console`只能在控制台打印，然而我们需要在yo的UI界面上使用时，`console`将不会输出任何信息。我们可以使用`this.log`api来输出，它已经被yo处理过了。

### 局部解析
> 完整api文档 https://yeoman.github.io/generator/module-promptSuggestion.html
#### yo循环
yo将回在合适的阶段自动唤起特定的函数，就像生命周期函数一样，我们称之为`yo loop`。
```js
initializing() // 最开始的阶段，我们可以确定用户所在目录状态，得到配置信息等
prompting() // 我们可以在这个阶段提问用户（this.prompt()）
configuring() // 我们在这个阶段存储配置或者配置是项目信息（创建文件）
default() // 其他我们自定义的函数将回被推到此处运行
writing() // 操作模版文件的阶段
conflicts() // 复制等活动产生文件冲突等的处理阶段，一般无需我们配置
install() // npm install 阶段
end() // byebye阶段，可以温馨的告诉他用户应用搭建完毕了，删除不需要的文件等
```

#### simple of Yo api 
yo仅仅拥有这yo loop还是不够的，我们需要在loop内编写代码，例如在`writing`阶段内将文件复制到用户的项目文件夹内。

##### - 我们不需要自己引入node的fs模块，直接使用我yo内置的`this.fs`
>内置 mem-fs-editor： https://github.com/SBoudrias/mem-fs-editor
参照此处api文档使用即可。
当然，yo内部类也有一些使用该模块的语法糖，如果要使用自行移步yo官方文档
##### - 我们也不需要引入`inquire`模块，直接使用`this.prompt`即可使用内置的`inquire`模块。
> inquire npm文档： https://www.npmjs.com/package/inquirer
##### - 我们也可以帮助它去安装依赖，所选的选项可以使得你选择它使用那种工具，或者制定依赖数组让工具自行安装
```js
this.installDependencies({
  yarn: {force: true},
  npm: false
});

// 我们可以制定安装哪些包
this.npmInstall(pkgs: string[], options: string, spawnOptions: spawnOptions);
```

### 完整实例




