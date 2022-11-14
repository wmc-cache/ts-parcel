interface saveFunctionObiect {
  [key: string]: Function[]
}

class EventEmitter {
  private events: saveFunctionObiect = {}
  on(name: string, fn: Function) {
    this.events[name] = this.events[name] || []
    if (fn) this.events[name].push(fn)
  }

  emit(name: string, ...args: any[]) {
    if (this.events[name]) {
      this.events[name].forEach((fn) => fn.apply(this, args))
    }
  }
  off(name: string) {
    this.events[name] = []
  }
}

const emitter = new EventEmitter()



emitter.on('save', (a: any, b: any, c: any) => {
  console.log('save')
  console.log(a, b, c)
})


emitter.on('save', () => {
  console.log('save2')
})


emitter.emit('save', 'aa', 'bb', 'cc')


