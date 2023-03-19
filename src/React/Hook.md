① React Hooks 为什么必须在函数组件内部执行？React 如何能够监听 React Hooks 在外部执行并抛出异常。
② React Hooks 如何把状态保存起来？保存的信息存在了哪里？
③ React Hooks 为什么不能写在条件语句中？
④ useMemo 内部引用 useRef 为什么不需要添加依赖项，而 useState 就要添加依赖项。
# 有一点你应该了解，就是本质上 hooks 的状态是存在 fiber 上的，如果当前组件不销毁那么状态会一直保存下去，useRef 可以理解为就是一个对象，有一个固定的内存空间，所以无论是useMemo 内部如果引入了ref ，那么本质上就是引用了同一个对象，但是useState 不一样了，比如 state 是一个对象，那么如果想要更新组件，就需要浅拷贝一下，比如 dispatchAction({ ...state }) ,这样内存指向是不一样的，所以比如useMemo 引用了一个 state ，如果没有添加依赖项，那么会一直引用之前的，就是人们所说的‘闭包陷阱’。

# useRef永远是指向的是老地址。useState可能会赋值新的对象，新的对象地址跟老的对象的地址不一样，如果不加依赖项，useMemo里面永远用的是老的对象的地址，拿到的值就是老的，跟闭包差不多同样的道理

⑤ useEffect 添加依赖项 props.a ，为什么 props.a 改变，useEffect 回调函数 create 重新执行。
⑥ React 内部如何区别 useEffect 和 useLayoutEffect ，执行时机有什么不同？




hooks 对象本质上是主要以三种处理策略存在 React 中：

1 ContextOnlyDispatcher： 第一种形态是防止开发者在函数组件外部调用 hooks ，所以第一种就是报错形态，只要开发者调用了这个形态下的 hooks ，就会抛出异常。
2 HooksDispatcherOnMount： 第二种形态是函数组件初始化 mount ，因为之前讲过 hooks 是函数组件和对应 fiber 桥梁，这个时候的 hooks 作用就是建立这个桥梁，初次建立其 hooks 与 fiber 之间的关系。
3 HooksDispatcherOnUpdate：第三种形态是函数组件的更新，既然与 fiber 之间的桥已经建好了，那么组件再更新，就需要 hooks 去获取或者更新维护状态。

const HooksDispatcherOnMount = { /* 函数组件初始化用的 hooks */
    useState: mountState,
    useEffect: mountEffect,
    ...
}
const  HooksDispatcherOnUpdate ={/* 函数组件更新用的 hooks */
   useState:updateState,
   useEffect: updateEffect,
   ...
}
const ContextOnlyDispatcher = {  /* 当hooks不是函数内部调用的时候，调用这个hooks对象下的hooks，所以报错。 */
   useEffect: throwInvalidHookError,
   useState: throwInvalidHookError,
   ...
}


# 函数组件触发

所有函数组件的触发是在 renderWithHooks 方法中，在 fiber 调和过程中，遇到 FunctionComponent 类型的 fiber（函数组件），就会用 updateFunctionComponent 更新 fiber ，在 updateFunctionComponent 内部就会调用 renderWithHooks 。



``` js
let currentlyRenderingFiber
function renderWithHooks(current,workInProgress,Component,props){
    currentlyRenderingFiber = workInProgress;
    workInProgress.memoizedState = null; /* 每一次执行函数组件之前，先清空状态 （用于存放hooks列表）*/
    workInProgress.updateQueue = null;    /* 清空状态（用于存放effect list） */
    ReactCurrentDispatcher.current =  current === null || current.memoizedState === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate /* 判断是初始化组件还是更新组件 */
    let children = Component(props, secondArg); /* 执行我们真正函数组件，所有的hooks将依次执行。 */
    ReactCurrentDispatcher.current = ContextOnlyDispatcher; /* 将hooks变成第一种，防止hooks在函数组件外部调用，调用直接报错。 */ ① 
}
``` 




对于类组件 fiber ，用 memoizedState 保存 state 信息，对于函数组件 fiber ，用 memoizedState 保存 hooks 信息。
对于函数组件 fiber ，updateQueue 存放每个 useEffect/useLayoutEffect 产生的副作用组成的链表。在 commit 阶段更新这些副作用。
然后判断组件是初始化流程还是更新流程，如果初始化用 HooksDispatcherOnMount 对象，如果更新用 HooksDispatcherOnUpdate 对象。函数组件执行完毕，将 hooks 赋值给 ContextOnlyDispatcher 对象。



引用的 React hooks都是从 ReactCurrentDispatcher.current 中的， 
React 就是通过赋予 current 不同的 hooks 对象达到监控 hooks 是否在函数组件内部调用。
Component ( props ， secondArg ) 这个时候函数组件被真正的执行，里面每一个 hooks 也将依次执行。
每个 hooks 内部为什么能够读取当前 fiber 信息，因为 currentlyRenderingFiber ，函数组件初始化已经把当前 fiber 赋值给 currentlyRenderingFiber ，每个 hooks 内部读取的就是 currentlyRenderingFiber 的内容。




# hooks初始化- hooks 如何和 fiber 建立起关系


hooks 初始化流程使用的是 mountState，mountEffect 等初始化节点的hooks，将 hooks 和 fiber 建立起联系，那么是如何建立起关系呢，每一个hooks 初始化都会执行 mountWorkInProgressHook 


function mountWorkInProgressHook() {
  const hook = {  memoizedState: null, baseState: null, baseQueue: null,queue: null, next: null,};
  if (workInProgressHook === null) {  // 只有一个 hooks
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {  // 有多个 hooks
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}


首先函数组件对应 fiber 用 memoizedState ② 保存 hooks 信息，每一个 hooks 执行都会产生一个 hooks 对象，hooks 对象中，保存着当前 hooks 的信息，不同 hooks 保存的形式不同。每一个 hooks 通过 next 链表建立起关系。③



# hooks更新


更新 hooks 逻辑和之前 fiber 章节中讲的双缓冲树更新差不多，会首先取出 workInProgres.alternate 里面对应的 hook ，然后根据之前的 hooks 复制一份，形成新的 hooks 链表关系。这个过程中解释了一个问题，就是hooks 规则，hooks 为什么要通常放在顶部，hooks 不能写在 if 条件语句中，因为在更新过程中，如果通过 if 条件语句，增加或者删除 hooks，在复用 hooks 过程中，会产生复用 hooks 状态和当前 hooks 不一致的问题。举一个例子，还是将如上的 demo 进行修改。






# 状态派发

function mountState(initialState){
     const hook = mountWorkInProgressHook();
    if (typeof initialState === 'function') {initialState = initialState() } // 如果 useState 第一个参数为函数，执行函数得到初始化state
     hook.memoizedState = hook.baseState = initialState;
    const queue = (hook.queue = { ... }); // 负责记录更新的各种状态。
    const dispatch = (queue.dispatch = (dispatchAction.bind(  null,currentlyRenderingFiber,queue, ))) // dispatchAction 为更新调度的主要函数 
    return [hook.memoizedState, dispatch];
}

上面的 state 会被当前 hooks 的 memoizedState 保存下来，每一个 useState 都会创建一个 queue 里面保存了更新的信息。
每一个 useState 都会创建一个更新函数，比如如上的 setNumber 本质上就是 dispatchAction，那么值得注意一点是，当前的 fiber 被 bind 绑定了固定的参数传入 dispatchAction 和 queue ，所以当用户触发 setNumber 的时候，能够直观反映出来自哪个 fiber 的更新。
最后把 memoizedState dispatch 返回给开发者使用。


function dispatchAction(fiber, queue, action){
    /* 第一步：创建一个 update */
    const update = { ... }
    const pending = queue.pending;
    if (pending === null) {  /* 第一个待更新任务 */
        update.next = update;
    } else {  /* 已经有带更新任务 */
       update.next = pending.next;
       pending.next = update;
    }
    if( fiber === currentlyRenderingFiber ){
        /* 说明当前fiber正在发生调和渲染更新，那么不需要更新 */
    }else{
       if(fiber.expirationTime === NoWork && (alternate === null || alternate.expirationTime === NoWork)){
            const lastRenderedReducer = queue.lastRenderedReducer;
            const currentState = queue.lastRenderedState;                 /* 上一次的state */
            const eagerState = lastRenderedReducer(currentState, action); /* 这一次新的state */
            if (is(eagerState, currentState)) {                           /* 如果每一个都改变相同的state，那么组件不更新 */
               return 
            }
       }
       scheduleUpdateOnFiber(fiber, expirationTime);    /* 发起调度更新 */
    }
}


原来当每一次改变 state ，底层会做这些事。

首先用户每一次调用 dispatchAction（比如如上触发 setNumber ）都会先创建一个 update ，然后把它放入待更新 pending 队列中。
然后判断如果当前的 fiber 正在更新，那么也就不需要再更新了。
反之，说明当前 fiber 没有更新任务，那么会拿出上一次 state 和 这一次 state 进行对比，如果相同，那么直接退出更新。如果不相同，那么发起更新调度任务。这就解释了，为什么函数组件 useState 改变相同的值，组件不更新了。







# 处理副作用

初始化


在 fiber 章节讲了，在 render 阶段，实际没有进行真正的 DOM 元素的增加，删除，React 把想要做的不同操作打成不同的 effectTag ，等到commit 阶段，统一处理这些副作用，包括 DOM 元素增删改，执行一些生命周期等。hooks 中的 useEffect 和 useLayoutEffect 也是副作用，接下来以 effect 为例子，看一下 React 是如何处理 useEffect 副作用的。

下面还是以初始化和更新两个角度来分析。


function mountEffect(create,deps){
    const hook = mountWorkInProgressHook();
    const nextDeps = deps === undefined ? null : deps;
    currentlyRenderingFiber.effectTag |= UpdateEffect | PassiveEffect;
    hook.memoizedState = pushEffect( 
      HookHasEffect | hookEffectTag, 
      create, // useEffect 第一次参数，就是副作用函数
      undefined, 
      nextDeps, // useEffect 第二次参数，deps    
    )
}

mountWorkInProgressHook 产生一个 hooks ，并和 fiber 建立起关系。
通过 pushEffect 创建一个 effect，并保存到当前 hooks 的 memoizedState 属性下。
pushEffect 除了创建一个 effect ， 还有一个重要作用，就是如果存在多个 effect 或者 layoutEffect 会形成一个副作用链表，绑定在函数组件 fiber 的 updateQueue 上。
为什么 React 会这么设计呢，首先对于类组件有componentDidMount/componentDidUpdate 固定的生命周期钩子，用于执行初始化/更新的副作用逻辑，但是对于函数组件，可能存在多个 useEffect/useLayoutEffect ，hooks 把这些 effect，独立形成链表结构，在 commit 阶段统一处理和执行。

如果在一个函数组件中这么写：

React.useEffect(()=>{
    console.log('第一个effect')
},[ props.a ])
React.useLayoutEffect(()=>{
    console.log('第二个effect')
},[])
React.useEffect(()=>{
    console.log('第三个effect')
    return () => {}
},[])



更新

function updateEffect(create,deps){
    const hook = updateWorkInProgressHook();
    if (areHookInputsEqual(nextDeps, prevDeps)) { /* 如果deps项没有发生变化，那么更新effect list就可以了，无须设置 HookHasEffect */
        pushEffect(hookEffectTag, create, destroy, nextDeps);
        return;
    } 
    /* 如果deps依赖项发生改变，赋予 effectTag ，在commit节点，就会再次执行我们的effect  */
    currentlyRenderingFiber.effectTag |= fiberEffectTag
    hook.memoizedState = pushEffect(HookHasEffect | hookEffectTag,create,destroy,nextDeps)
}

就是判断 deps 项有没有发生变化，如果没有发生变化，更新副作用链表就可以了；如果发生变化，更新链表同时，打执行副作用的标签：fiber => fiberEffectTag，hook => HookHasEffect。在 commit 阶段就会根据这些标签，重新执行副作用。



React 会用不同的 EffectTag 来标记不同的 effect，对于useEffect 会标记 UpdateEffect | PassiveEffect， UpdateEffect 是证明此次更新需要更新 effect ，HookPassive 是 useEffect 的标识符，对于 useLayoutEffect 第一次更新会打上 HookLayout 的标识符。React 就是在 commit 阶段，通过标识符，证明是 useEffect 还是 useLayoutEffect ，接下来 React 会同步处理 useLayoutEffect ，异步处理 useEffect 。

如果函数组件需要更新副作用，会标记 UpdateEffect，至于哪个effect 需要更新，那就看 hooks 上有没有 HookHasEffect 标记，所以初始化或者 deps 不想等，就会给当前 hooks 标记上 HookHasEffect ，所以会执行组件的副作用钩子。



# 状态获取与状态缓存

1 对于 ref 处理

function mountRef(initialValue) {
  const hook = mountWorkInProgressHook();
  const ref = {current: initialValue};
  hook.memoizedState = ref; // 创建ref对象。
  return ref;
}

function updateRef(initialValue){
  const hook = updateWorkInProgressHook()
  return hook.memoizedState // 取出复用ref对象。
}

2 对于useMemo的处理

function mountMemo(nextCreate,deps){
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}


function updateMemo(nextCreate,nextDeps){
    const hook = updateWorkInProgressHook();
    const prevState = hook.memoizedState; 
    const prevDeps = prevState[1]; // 之前保存的 deps 值
    if (areHookInputsEqual(nextDeps, prevDeps)) { //判断两次 deps 值
        return prevState[0];
    }
    const nextValue = nextCreate(); // 如果deps，发生改变，重新执行
    hook.memoizedState = [nextValue, nextDeps];
    return nextValue;
}