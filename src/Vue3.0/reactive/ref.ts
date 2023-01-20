import VIEW from "./view";

const { reactive, effect } = VIEW;

// 封装一个 ref 函数
export function ref(val: any) {
    // 在 ref 函数内部创建包裹对象
    const wrapper = {
        value: val
    }
    Object.defineProperty(wrapper, '__v_isRef', {
        value: true
    })
    // 将包裹对象变成响应式数据
    return reactive(wrapper)

}


export function toRef(obj: any, key: string) {
    const wrapper = {
        get value() {
            return obj[key]

        },
        // 允许设置值
        set value(val) {
            obj[key] = val
        }
    }
    Object.defineProperty(wrapper, '__v_isRef', {
        value: true
    })
    return wrapper
}


// 创建原始值的响应式数据
const refVal = ref(1)
effect(() => {
    // 在副作用函数内通过 value 属性读取原始值
    console.log(refVal, refVal.value)

})
// 修改值能够触发副作用函数重新执行
refVal.value = 2