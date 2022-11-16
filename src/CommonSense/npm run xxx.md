{
"name": "h5",
"version": "1.0.7",
"private": true,
"scripts": {
"serve": "vue-cli-service serve"
},
}

直接执行 vue-cli-service serve，会报错，因为操作系统中没有存在 vue-cli-service 这一条指令

我们在安装依赖的时候，是通过 npm i xxx 来执行的，

例如 npm i @vue/cli-service

npm 在安装这个依赖的时候，就会 node_modules/.bin/ 目录中创建 好 vue-cli-service 为名的几个可执行文件了。

# 总结

运行 npm run xxx 的时候，npm 会先在当前目录的 node_modules/.bin 查找要执行的程序，如果找到则运行；
没有找到则从全局的 node_modules/.bin 中查找，npm i -g xxx 就是安装到到全局目录；
如果全局目录还是没找到，那么就从 path 环境变量中查找有没有其他同名的可执行程序。
