class myIterator {
  constructor(private collection: any[]) {}
  private index = 0
  next() {
    if (this.index < this.collection.length) {
      return { value: this.collection[this.index++], done: false }
    }
    return { value: undefined, done: true }
  }
  [Symbol.iterator]() {
    return this
  }
}

const myiterator = new myIterator([1, [1, 2, 3], 3])
//const myiterator = [1, [1, 2, 3], 3]
for (const item of myiterator) {
  console.log(item)
}
