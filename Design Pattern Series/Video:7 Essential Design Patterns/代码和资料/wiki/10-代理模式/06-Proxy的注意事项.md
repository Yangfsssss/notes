# Proxy 的注意事项

## 捕获器不变式

这是“红宝书”里的叫法。捕获器即 get ，不变式即不能因为 Proxy 而改变对象本身的描述符特性。

```ts
const obj = { x: 100, y: 0 }
Object.defineProperty(obj, 'y', {
    value: 200,
    writable: false,
    configurable: false,
})
const proxy = new Proxy(obj, {
    get() {
        return 'abc'
    }
})

console.log(proxy.x)
console.log(proxy.y) // y 属性描述符被修改，proxy 不能修改它的值
```

## this

函数里的 this 是由执行时确认的，而非定义时。

```ts
const user = {
    name: '张三',
    getName() {
        console.log('this...', this)
        return this.name
    }
}

const proxy = new Proxy(user, {})

user.getName() // 执行时 this 是 user
proxy.getName() // 执行时 this 是 proxy
```

## 总结

- 捕获器不变式
- this
