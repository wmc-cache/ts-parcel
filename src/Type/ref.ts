type Ref<T = any> = {
  value: T
}

function ref<T>(value: T): Ref<T> {
    return {
        value
    }
}
  
const count = ref(2)

count.value // number

export {}
