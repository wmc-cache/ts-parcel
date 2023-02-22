export function debounce(fun: Function, delay: number) {
  let timer: ReturnType<typeof setTimeout>
  return function (this: any) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fun.apply(this, arguments)
    }, delay)
  }
}

function log() {
  console.log('log')
}

const newLog = debounce(log, 2000)

setInterval(() => {
  newLog()
}, 1000)

