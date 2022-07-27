//同一浏览器打开了两个同源页面
//其中一个页面修改了localStorage
//另一个网页注册了这个事件

window.localStorage.setItem('test', 'test')

setInterval(() => {
  window.localStorage.setItem('test', 'test100')
}, 5000)

window.addEventListener('setItemEvent', (event: any) => {
  console.log(event.newValue)
})



// 为了在本页面中获取到localStorage的值改变
let originalSetItem = window.localStorage.setItem

localStorage.setItem = function (key, value) {
  let setItemEvent: any = new Event('setItemEvent')

  setItemEvent.newValue = value

  window.dispatchEvent(setItemEvent)

  originalSetItem.call(this, key, value)
}
