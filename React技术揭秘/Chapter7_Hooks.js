"use strict";
/** Chapter7：Hooks */
//7.1 Hooks理念-----------------------------------------------------------------------
//7.2 极简Hooks实现-----------------------------------------------------------------
//7.2.1 工作原理
function App() {
    var _a = useState(0), num = _a[0], updateNum = _a[1];
    return onClick;
    {
        (function () { return updateNum(function (num) { return num + 1; }); });
    }
     > { num: num } < /p>;;
}
var update = {
    //更新执行的函数
    action: action,
    //与同一个Hook的其他更新形成链表
    next: null
};
//调用updateNum实际调用的是dispatchAction.bind(null, hook.queue)
function dispatchAction(queue, action) {
    //创建update
    var update = {
        action: action,
        next: null
    };
    //环状单向链表操作
    if (queue.pending === null) {
        update.next = update;
    }
    else {
        update.next = queue.pending.next;
        queue.pending.next = update;
    }
    queue.pending = update;
    //模拟React开始调度更新
    schedule();
}
//queue.pending始终指向最后一个插入的update。
//当我们要遍历update时，queue.pending.next指向第一个插入的update。
//7.2.4 状态如何保存
//App组件对应的fiber对象
var fiber = {
    //保存该FunctionComponent对应的Hooks链表
    memoizedState: null,
    //指向App函数
    stateNode: App
};
//7.2.5 Hook数据结构
var hook = {
    //保存update的queue，即上文介绍的queue
    queue: {
        pending: null
    },
    //保存hook对应的state
    memoizedState: initialState,
    //与下一个Hook连接形成单向无环链表
    next: null
};
//每个useState对应一个hook对象
//调用 const[num,updateNum] = useState(0)时，updateNum（即上文介绍的dispatchAction）
//产生的update保存在useState对应的hook.queue中
//7.2.5 模拟React调度更新流程
//使用isMount变量指代mount还是update
var isMount = true;
function schedule() {
    //更新前将workInProgressHook重置为fiber保存的第一个Hook
    workInProgressHook = fiber.memoizedState;
    //触发组件render
    fiber.stateNode();
    //组件首次render为mount,以后再触发的更新为update
    isMount = false;
}
//在组件render时，每当遇到下一个useState，我们移动workInProgressHook的指针。
workInProgressHook = workInProgressHook.next;
//7.2.6 计算state
function useState(initialState) {
    //当前useState使用的hook会被赋值该变量
    var hook;
    if (isMount) {
        //...mount时需要生成hook对象
        hook = {
            queue: {
                pending: null
            },
            memoizedState: initialState,
            next: null
        };
        //将hook插入fiber.memoizedState链表末尾
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook;
        }
        else {
            workInProgressHook.next = hook;
        }
        //移动workInProgressHook指针
        workInProgressHook = hook;
    }
    else {
        //... update时从workInProgressHook中取出该useState对应的hook
        hook = workInProgressHook;
        //移动workInProgressHook指针
        workInProgressHook = workInProgressHook.next;
    }
    var baseState = hook.memoizedState;
    if (hook.queue.pending) {
        //...根据queue.pending中保存的update更新state
        var firstUpdate = hook.queue.pending.next;
        do {
            //执行update action
            var action = firstUpdate.action;
            baseState = action(baseState);
            firstUpdate = firstUpdate.next;
            //最后一个update执行完后跳出循环
        } while (firstUpdate !== hook.queue.pending.next);
        //清空queue.pending
        hook.queue.pending = null;
    }
    //将update action执行完后的state作为memoizedState
    hook.memoizedState = baseState;
    return [baseState, dispatchAction.bind(null, hook.queue)];
}
