export function getTokenImg(token: string, url: string) {
  const img = document.createElement('img')
  const request = new XMLHttpRequest()
  request.responseType = 'blob'
  request.open('get', url, true)
  request.setRequestHeader('Authorization', token)
  request.onreadystatechange = (e) => {
    if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
      // 生成 blobURL，createObjectURL 方法创建从 URL 到 Blob 对象的映射关系
      img.src = URL.createObjectURL(request.response)
      img.onload = () => {
        URL.revokeObjectURL(img.src)
      }
    }
  }
  request.send(null)
  return img
}
