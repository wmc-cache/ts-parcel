interface saveFunctionObiect {
  [key: string]: Function[]
}

class EventEmitter {
  private events: saveFunctionObiect = {}
  on(name: string, fn?: Function) {
    this.events[name] = this.events[name] || []
    if (fn) this.events[name].push(fn)
  }

  emit(name: string) {
    if (this.events[name]) {
      this.events[name].forEach((fn) => fn.apply(this, arguments))
    }
  }
  off(name: string) {
    this.events[name] = []
  }
}

const emitter = new EventEmitter()
emitter.on('save', () => {
  console.log('save')
})
emitter.on('save', () => {
  console.log('save2')
})
emitter.on('save')
emitter.emit('save')
