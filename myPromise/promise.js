function myPromise(executor) {  // new Promise((resolve, reject) => {if(...) resolve() | reject()}) resolve|reject是我们定的。
    this.state = 'pending'; // 初始promise的状态将是pending/《ECMAScript 6 入门/阮一峰》
    this.value = undefined; 
    this.reason = undefined;
    this.fn1CallBacks = [];
    this.fn2CallBacks = [];
    // resolve(value) 的时候，接受value，并取代默认的undefined;
    let resolve = (value) => { 
        if(this.state === 'pending') {
            this.state = 'fulfilled';
            this.value = value
        }
    }; 
    //同上
    let reject = (reason) => {
        if(this.state === 'pending') {
            this.state = 'rejected';
            this.reason = reason
        }
    };
    try {
        executor(resolve, reject)
    } catch {
        reject(err)
    }
}

// promise最重要的核心就是then，可以说其他的方法都一定程度的依赖了它，比如finally，它便是使用then去实现的。
// 关于方法，我们一般都是定义在prototype上的。

myPromise.prototype.then = function(fn1, fn2) {
    const that = this;
    let promise2;
    // 调用库的人自己编写的函数，处理resolve | reject传下来的数据，因为他有可能不是写函数进去的，所以需要判定一下。
    fn1 = typeof fn1 === 'function' ? fn1 : function(v) {};
    fn2 = typeof fn2 === 'function' ? fn2 : function(r) {};

    //如果成功
    if(that.state === 'fulfilled') {
        return promise2 = new myPromise((resolve, reject) => {
            try{
                let x = fn1(that.value)
                if(x instanceof myPromise) { // 如果传入的参数是经过处理后是一个promise，需要等待其的状态变化
                    x.then((data) => {resolve(data), (e) => {reject(e)}}) //为其增加一个then方法，x resolve后，执行正常的resolve。
                } else if(x instanceof Object && typeof x.then === 'function') { // x也有可能是一个thenable对象。 let thenable = {
                        x.then(resolve ,reject)                                //   then: function(resolve, reject) {
                                                                                //      resolve(42);
                                                                                //      }
                                                                                // };
                                                                                //
                } else {
                    resolve(x)
                }
            } catch(e) {
                reject(e)
            }
        })
    }
    //如果失败
    if(that.state === 'rejected') {
        return promise2 = new myPromise((resolve, reject) => {
            try{
                let x = fn2(that.value) // 无论是fn1还是fn2都是调用库的程序员去定义得，故可能会发生错误，我们使用try去尝试。
                resolve(x)              // 会不会有疑问为什么rejected还会resolve，因为其实无论then（）内的两个函数参数到底是调用的什么，
            } catch {                       // 其实都会返回一个新的promise对象。详情请看阮一峰老师的es6入门指南。这里可能说不清。
                reject(val)                 //就算是rejected也是会出错的（因为是调用库者编写，不稳定），所以需要它。
            }
        })
    }

    //如果还在pending中的时候 因为你new了promise后，会直接执行promise的代码，
    // 有可能你在定义then方法的时候，他已经准备就绪了，有可能还没有到达resolve的那行代码。
    //例如 new Promise((resolve, reject) => { resolve（1）}).then((v) => console.log(v)) 这将在执行then方法的时候，state以及fullfiled了。
    // new Promise((resolve, reject) => { setTimeout(() => {resolve(1)}, 1000)}).then((v) => console.log(v))
    //可以看出在定义then方法的时候，promise的状态是pending的。这个时候明显我们是要处理的，不然它将永远不会被调用。除非你不想用定时器之类的异步去处理。
    if(that.state === 'pending') {
        return promise2 = new myPromise((resolve, reject) => {
            this.fn1CallBacks.push((value) => {
                try {
                    let x = fn1(that.value)
                    resolve(x)
                } catch(e) {
                    reject(e)
                }
            })
            this.fn2Callback.push(function(value) {
                try {
                    var x = fn2(that.value);
                    reject(x)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }


}

