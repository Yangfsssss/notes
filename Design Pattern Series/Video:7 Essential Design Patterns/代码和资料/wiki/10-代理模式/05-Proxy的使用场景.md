# Proxy 的使用场景

## 跟踪属性访问

Vue3 就是通过这个特性实现数据响应式

```ts
const user = {
    name: '张三'
}
const proxy = new Proxy(user, {
    get(target, key) {
        console.log('get...')
        return Reflect.get(target, key)
    },
    // get(...args) {
    //     return Reflect.get(...args)
    // },
    set(target, key, val) {
        console.log('set...', val)
        return Reflect.set(target, key, val)
    }
})

proxy.name = '李四'
console.log(proxy.name)
```

## 隐藏属性

```ts
const hiddenProps = ['girlfriend'] // 要隐藏的属性 key
const user = {
    name: '张三',
    age: 25,
    girlfriend: '小红'
}
const proxy = new Proxy(user, {
    get(target, key) {
        if (hiddenProps.includes(key as string)) return undefined
        return Reflect.get(target, key)
    },
    has(target, key) {
        if (hiddenProps.includes(key as string)) return false
        return Reflect.has(target, key)
    },
    set(target, key, val) {
        if (hiddenProps.includes(key as string)) return false
        console.log('set...', val)
        return Reflect.set(target, key, val)
    }
})

console.log('age', proxy.age)
console.log('girlfriend', proxy.girlfriend) // undefined
```

## 验证属性

如果用 TS ，会有静态类型检查，用不到这个验证。用 JS 的话会有效果。

以下代码可以在浏览器中运行（非 TS 环境）

```ts
const user = {
    name: '张三',
    age: 25,
}
const proxy = new Proxy(user, {
    get(target, key) {
        return Reflect.get(target, key)
    },
    set(target, key, val) {
        if (key === 'age') {
            if (typeof val !== 'number') return false // 验证 age 类型
        }
        return Reflect.set(target, key, val)
    }
})

proxy.age = 'a'
console.log(proxy.age) // 25
```

## 记录实例

```ts
const userList = new WeakSet() // 每次初始化 user ，都记录到这里

class User {
    name: string
    constructor(name: string) {
        this.name = name
    }
}

const ProxyUser = new Proxy(User, {
    construct(...args) {
        const user = Reflect.construct(...args)
        userList.add(user) // 记录 user 对象
        return user
    }
})

const user1 = new ProxyUser('张三')
const user2 = new ProxyUser('李四')
console.log('userList', userList)
```

## 总结

- 跟踪属性访问 get set
- 隐藏属性
- 验证属性
- 记录实例
