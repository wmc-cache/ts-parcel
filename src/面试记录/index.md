1.纯css画三角型

2.position：fixed 相对于absolute有一个最大的特点在于，无论你是否设置相对定位，fixed永远相对于body来定位， 而现在因为transform的原因，这一切都被打乱了。fixed变成了和absolute绝对定位一样的特征。

3.v-if和v-for不能同时用  vue2 v-for的优先级高于v-if  会先渲染   性能不行

4.import('./xxx')的原理

5.路由模式原理

6.在 while循环中，循环递增变量 i 是定义在循环之外在 main 方法内的，它的作用域在整个 main 方法中。所以当 while 循环结束后， 变量 i 依然存在，占用的内存没有被释放。

而在 for 循环中， 递增变量 i 是定义在 for 循环之内的，该变量的作用域在 for 循环中，一旦 for 循环结束后，变量 i 所占用的栈内存就会随着for方法结束而销毁（被垃圾回收器回收 ）

7.
