//我们知道：在浏览器环境中，
// 常见的 macro task 有 setTimeout、MessageChannel、postMessage、setImmediate。
// 而常见的 micro task 有 MutationObsever 和 Promise.then。

// Vue中对于 macro task 的实现，优先检测是否支持原生 
// setImmediate，这是一个高版本 IE 和 Edge 才支持的特性，
// 不支持的话再去检测是否支持原生的MessageChannel，
// 如果也不支持的话就会降级为 setTimeout 0。




var channel = new MessageChannel();
var port1 = channel.port1;
var port2 = channel.port2;
port1.onmessage = function (event) {
    console.log("port1收到来自port2的数据：" + event.data);
}
port2.onmessage = function (event) {
    console.log("port2收到来自port1的数据：" + event.data);
}

port1.postMessage("发送给port2");
port2.postMessage("发送给port1");







