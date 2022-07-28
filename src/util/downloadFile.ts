/**
 *
 * @param {*} url  下载地址
 * @param {*} fileName 文件名称
 */
export default function downloadFile(url: string, fileName: string) {
  const request = new XMLHttpRequest()
  request.responseType = 'blob'
  request.open('get', url, true)
  request.onreadystatechange = (e) => {
    if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
      download(URL.createObjectURL(request.response), fileName)
    }
  }
  request.send(null)

  const download = (url: string, name: string) => {
    const aLink = document.createElement('a')
    aLink.download = name
    aLink.href = url
    aLink.dispatchEvent(new MouseEvent('click', {}))
  }
}
