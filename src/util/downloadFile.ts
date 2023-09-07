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
      // 生成 blobURL，createObjectURL 方法创建从 URL 到 Blob 对象的映射关系
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



// export default function downloadFile(url, fileName, params = {}) {
//   const request = new XMLHttpRequest();
//   request.responseType = 'blob';
//   request.open('post', url, true);
//   request.setRequestHeader('Content-Type', 'application/json'); // 设置请求头，根据需要设置合适的 Content-Type

//   request.onreadystatechange = (e) => {
//     if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
//       // 生成 blobURL
//       download(URL.createObjectURL(request.response), fileName);
//     }
//   };

//   request.send(JSON.stringify(params)); // 将参数转换为 JSON 字符串并发送请求

//   const download = (url, name) => {
//     const aLink = document.createElement('a');
//     aLink.download = name;
//     aLink.href = url;
//     aLink.dispatchEvent(new MouseEvent('click', {}));
//   };
// }
