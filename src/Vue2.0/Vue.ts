import { Compiler } from "./Compiler"
import { Observer } from "./Observer"

export class Vue {
  private $data: any
  private $el: any
  constructor(private options: any) {
    //1. 通过属性保存选项的数据
    this.$data = options.data
    this.$el =
      typeof options.el === 'string'
        ? document.querySelector(options.el)
        : options.el
    // 2. 把data中的成员转换成getter/setter,注入到Vue实例中
    this.proxyData(this.$data)
    // 3. 调用observer对象,监听数据的辩护
    new Observer(this.$data)
    // 4. 调用compiler对象, 解析指令和差值表达式
    new Compiler(this)
  }
  proxyData(data: any) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        //enumberable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (newValue === data[key]) {
            return
          }
          data[key] = newValue
        },
      })
    })
  }
}
