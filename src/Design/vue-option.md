Vue组件的API主要包含三部分：prop、event、slot

props 表示组件接收的参数，最好用对象的写法，这样可以针对每个属性设置类型、默认值或自定义校验属性的值，此外还可以通过type、validator等方式对输入进行验证
slot可以给组件动态插入一些内容或组件，是实现高阶组件的重要途径；当需要多个插槽时，可以使用具名slot
event是子组件向父组件传递消息的重要途径



单向数据流是Vue组件一个非常明显的特征，不应该在子组件中直接修改props的值

如果传递的prop仅仅用作展示，不涉及修改，则在模板中直接使用即可
如果需要对prop的值进行转化然后展示，则应该使用computed计算属性
如果prop的值用作初始化，应该定义一个子组件的data属性并将prop作为其初始值



状态提升
可以参考React的状态提升，直接通过props将父元素的数据处理逻辑传入子组件，子组件只做数据展示和事件挂载即可


<template>
    <div class="counter">
        <div class="counter_btn" @click="onMinus">-</div>
        <div class="counter_val">{{value}}</div>
        <div class="counter_btn" @click="onPlus">+</div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Number,
                default: 0
            },
            onMinus: Function,
            onPlus: Function
        },
    };
</script>

然后在调用时传入事件处理函数

<template>
    <div>
        <counter :value="counter2Val" :on-minus="minusVal" :on-plus="plusVal"></counter>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                counter2Val: 0,
            }
        },
        methods: {
            minusVal(){
                this.counter2Val--
            },
            plusVal(){
                this.counter2Val++
            }
        }
    }
</script>

很明显，由于在每个父组件中都需要实现on-minus和on-plus，因此状态提升并没有从根本上解决问题。(v-model就是更好的方案)




封装API组件(消息弹窗组件)

let component = new MessageBox().$mount()
document.getElementById('app').appendChild(component.$el)

<template>
    <div class="alert">
        <div class="alert-main" v-for="item in notices" :key="item.name">
            <div class="alert-content">{{ item.content }}</div>
        </div>
    </div>
</template>

<script>
    let seed = 0;

    function getUuid() {
        return 'alert_' + (seed++);
    }

    export default {
        data() {
            return {
                notices: []
            }
        },
        methods: {
            add(notice) {
                const name = getUuid();

                let _notice = Object.assign({
                    name: name
                }, notice);

                this.notices.push(_notice);

                // 定时移除，单位：秒
                const duration = notice.duration;
                setTimeout(() => {
                    this.remove(name);
                }, duration * 1000);
            },
            remove(name) {
                const notices = this.notices;

                for (let i = 0; i < notices.length; i++) {
                    if (notices[i].name === name) {
                        this.notices.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
</script>



<script>
// alert.js
import Vue from 'vue';

// 具体的组件
import Alert from './alert.vue';
Alert.newInstance = properties => {
    const props = properties || {};
	// 实例化一个组件，然后挂载到body上
    const Instance = new Vue({
        data: props,
        render (h) {
            return h(Alert, {
                props: props
            });
        }
    });
    const component = Instance.$mount();
    document.body.appendChild(component.$el);
	// 通过闭包维护alert组件的引用
    const alert = Instance.$children[0];
    return {
        // Alert组件对外暴露的两个方法
        add (noticeProps) {
            alert.add(noticeProps);
        },
        remove (name) {
            alert.remove(name);
        }
    }
};

// 提示单例
let messageInstance;
function getMessageInstance () {
    messageInstance = messageInstance || Alert.newInstance();
    return messageInstance;
}
function notice({ duration = 1.5, content = '' }) {
    // 等待接口调用的时候再实例化组件，避免进入页面就直接挂载到body上
    let instance = getMessageInstance();
    instance.add({
        content: content,
        duration: duration
    });
}

// 对外暴露的方法
export default {
    info (options) {
        return notice(options);
    }
}

</script>


<script>
import alert from './alert.js'
// 直接使用
alert.info({content: '消息提示', duration: 2})
// 或者挂载到Vue原型上
Vue.prototype.$Alert = alert
// 然后在组件中使用
this.$Alert.info({content: '消息提示', duration: 2})
</script>



高阶组件

高阶组件可以看做是函数式编程中的组合。可以把高阶组件看做是一个函数，他接收一个组件作为参数，并返回一个功能增强的组件。
高阶组件是一个接替Mixin实现抽象组件公共功能的方法，不会因为组件的使用而污染DOM（添加并不想要的div标签等）、可以包裹任意的单一子元素等等
在React中高阶组件是比较常用的组件封装形式，在Vue中如何实现高阶组件呢？
在组件的render函数中，只需要返回一个vNode数据类型即可，如果在render函数中提前做一些处理，并返回this.$slots.default[0]对应的vnode，就可以实现高阶组件。





throttle
节流是web开发中处理事件比较常见的需求。常见的场景有及时搜索框避免频繁触发搜索接口、表单按钮防止在短暂时间误重复提交等
首先来看看Throttle组件的使用方式，接收两个props

time表示节流的时间间隔
events表示需要处理的事件名，多个事件用逗号分隔

在下面的例子中，通过Throttle组件来控制其内部button的点击事件，此时连续点击多次，触发clickBtn的次数要比点击的次数小（节流函数通过一个定时器进行处理）。


<template>
    <div>
        <Throttle :time="1000" events="click">
            <button @click="clickBtn">click {{count}}</button>
        </Throttle>
    </div>
</template>



下面是具体实现，实现高阶组件的主要功能是在render函数中对当前插槽中的vnode进行处理

<script>
const throttle = function (fn, wait = 50, ctx) {
    let timer
    let lastCall = 0
    return function (...params) {
        const now = new Date().getTime()
        if (now - lastCall < wait) return
        lastCall = now
        fn.apply(ctx, params)
    }
}

export default {
    name: 'throttle',
    abstract: true,
    props: {
        time: Number,
        events: String,
    },
    created() {
        this.eventKeys = this.events.split(',')
        this.originMap = {}
        this.throttledMap = {}
    },
    // render函数直接返回slot的vnode，避免外层添加包裹元素
    render(h) {
        const vnode = this.$slots.default[0]
        this.eventKeys.forEach((key) => {
            const target = vnode.data.on[key]
            if (target === this.originMap[key] && this.throttledMap[key]) {
                vnode.data.on[key] = this.throttledMap[key]
            } else if (target) {
                // 将原本的事件处理函数替换成throttle节流后的处理函数
                this.originMap[key] = target
                this.throttledMap[key] = throttle(target, this.time, vnode)
                vnode.data.on[key] = this.throttledMap[key]
            }
        })
        return vnode
    },
}
</script>






