const token = ''
const url = ''
const img = document.getElementById('img') as HTMLImageElement
const request = new XMLHttpRequest()
request.responseType = 'blob'
request.open('get', url, true)
request.setRequestHeader('Authorization', token)
request.onreadystatechange = (e) => {
  if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
    img.src = URL.createObjectURL(request.response)
    img.onload = () => {
      URL.revokeObjectURL(img.src)
    }
  }
}
request.send(null)

export{}

