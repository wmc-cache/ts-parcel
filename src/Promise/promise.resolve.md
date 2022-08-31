Promise.resolve共有四种参数

第一种：不带任何参数

setTimeout(function () {
  console.log('three')
}, 0)

Promise.resolve().then(function () {
  console.log('two')
})

console.log('one')
// one two three



第二种：普通变量或者普通对象

const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});

// Hello


第三种：参数是一个 Promise 实例

如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。




第四种：参数是一个thenable对象


thenable对象指的是具有then方法的对象，比如下面这个对象

let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。

let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
thenable对象的then方法执行后，对象p1的状态就变为resolved，从而立即执行最后那个then方法指定的回调函数，输出 42