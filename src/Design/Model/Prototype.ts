const obj = {
  eat() {
    console.log('eat')
  },
}

const clone: any = Object.create(obj)
clone.kkk = "www"
clone.eat()
console.log(Reflect.getOwnPropertyDescriptor(clone, 'kkk'))

