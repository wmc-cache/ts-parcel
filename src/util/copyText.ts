export function copyText(text:string) {
  const el = document.createElement('section')
  el.innerText = text
  document.body.appendChild(el)
  const sel = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(el)
  sel?.removeAllRanges()
  sel?.addRange(range)
  const bool = document.execCommand('copy')
  el.remove()
  return bool
}
