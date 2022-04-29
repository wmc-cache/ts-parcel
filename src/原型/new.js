function People(name, age) {
  this.name = name
  this.age = age
}

function MyNew(People, ...arg) {
  let newObject = Object.create(People.prototype) // 创建一个新对象以People的原型为基础
  People.apply(newObject, arg) // 将arg作为参数传入People的构造函数 this指向newObject
  return newObject  // 返回新对象
}

const people = MyNew(People, 'asd', 12)
console.log(people)