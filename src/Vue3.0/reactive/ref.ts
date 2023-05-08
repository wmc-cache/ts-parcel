import { reactive } from "../reactive/effect";

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


