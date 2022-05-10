class Theme {
  constructor(public name: string) {}
  private state: number = 0
  private observerList: Observer[] = []
  getState(): number {
    return this.state
  }
  setState(state: number): void {
    this.state = state
    this.observerList.forEach((observer) => {
      observer.update(this)
    })
  }
  addObserver(observer: Observer): void {
    this.observerList.push(observer)
  }
}

class Observer {
  constructor(public name: string) {}
  update(theme: Theme): void {
    console.log(`${this.name}  ${theme.name} update ${theme.getState()}`)
  }
}

const theme = new Theme('dark')
const observer1 = new Observer('observer1')
const observer2 = new Observer('observer2')
theme.addObserver(observer1)
theme.addObserver(observer2)
theme.setState(1)
theme.setState(2)


