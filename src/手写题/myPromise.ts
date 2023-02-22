
type ResolveType = (value: any) => any
type RejectType = (value: any) => any
type Status = 'pending' | 'success' | 'reject'
type Executor = (resolve: ResolveType, reject: RejectType) => any


export class MyPromise {

    status: Status = 'pending'

    value: any

    error: any

    ResolveArray: ResolveType[] = []

    RejectArray: RejectType[] = []


    static all = (arr: MyPromise[]) => {
        let total = 0
        let result: any[] = []
        const p = new MyPromise((resolve, reject) => {
            for (let i = 0; i < arr.length; i++) {
                arr[i].then(
                    (value) => {
                        result.push(value)
                        total++
                        if (total === arr.length) {
                            resolve(result)
                        }
                    }, (error) => {
                        reject(error)
                    }
                )
            }
        })
        return p
    }

    constructor(Fn: Executor) {
        try {
            Fn(this.resolve, this.reject)
        } catch (error) {
            console.error(error)
        }
    }

    resolve: ResolveType = (value) => {
        if (this.status === 'pending') {
            this.status = 'success'
            this.value = value
            this.ResolveArray.forEach(Fn => {
                Fn(this.value)
            })
        }
    }
    reject: RejectType = (error) => {
        if (this.status === 'pending') {
            this.status = 'reject'
            this.error = error
            this.RejectArray.forEach(Fn => {
                Fn(this.error)
            })
        }
    }

    then = (Fn1: ResolveType, Fn2: RejectType) => {
        if (this.status === 'pending') {
            const p = new MyPromise((resolve: ResolveType, reject: RejectType) => {
                this.ResolveArray.push(() => {
                    try {
                        const result = Fn1(this.value)
                        resolve(result)
                    } catch (error) {
                        reject(error)
                    }
                })
                this.RejectArray.push(() => {
                    try {
                        const result = Fn2(this.error)
                        reject(result)
                    } catch (error) {
                        reject(error)
                    }
                })
            })
            return p
        }
        if (this.status === 'success') {
            const p = new MyPromise((resolve: ResolveType, reject: RejectType) => {
                try {
                    const result = Fn1(this.value)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }

            })
            return p
        }
        if (this.status === 'reject') {
            const p = new MyPromise((resolve: ResolveType, reject: RejectType) => {
                try {
                    const result = Fn2(this.error)
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            })
            return p
        }
        return new MyPromise(() => { })
    }

}


const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('vue1')
    }, 1000)
})

const p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('vue3')
    }, 3000)
})




MyPromise.all([p, p2]).then((value) => {
    console.log(value)
}, (err) => { console.log(err) })

