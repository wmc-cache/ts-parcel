/**  水印添加方法  */

let setWatermark = (str1: string, str2: string) => {
  let id = '123456789'

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id) as Node)
  }

  let can = document.createElement('canvas')
  // 设置canvas画布大小
  can.width = 220 //单个水印大小
  can.height = 120

  let cans = can.getContext('2d')
  if (cans) {
    cans?.rotate((-20 * Math.PI) / 180) // 水印旋转角度
    cans.font = '15px Vedana'
    cans.fillStyle = '#666666' // 水印颜色
    cans.textAlign = 'center'
    cans.textBaseline = 'middle'
    cans.fillText(str1, can.width / 2, can.height) // 水印在画布的位置x，y轴
    cans.fillText(str2, can.width / 2, can.height + 22)
  }

  let div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '40px'
  div.style.left = '0px'
  div.style.opacity = '0.08'
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.width = document.documentElement.clientWidth + 'px'
  div.style.height = document.documentElement.clientHeight + 'px'
  div.style.background =
    'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return id
}

// 添加水印方法
export const setWaterMark = (str1: string, str2: string) => {
  let id = setWatermark(str1, str2)
  if (document.getElementById(id) === null) {
    id = setWatermark(str1, str2)
  }
}

// 移除水印方法
export const removeWatermark = () => {
  let id = '123456789'
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id) as Node)
  }
}


setWaterMark('水印1', '水印2')
