# Generator

迭代器和生成器，两者密不可分

## 基本使用

```js
function* genNums() {
    yield 10
    yield 20
    yield 30
}

const numsIterator = genNums()
numsIterator.next() // {value: 10, done: false}
numsIterator.next() // {value: 20, done: false}
numsIterator.next() // {value: 30, done: false}
numsIterator.next() // {value: undefined, done: true}

// for (let n of numsIterator) {
//     console.log(n)
// }
```

## yield* 语法

上一节说过，有序结构可用于 `yield*`

```js
function* genNums() {
    yield* [100, 200, 300] // 相当于：循环数组，分别 yield
}
const numsIterator = genNums()
numsIterator.next() // {value: 100, done: false}
numsIterator.next() // {value: 200, done: false}
numsIterator.next() // {value: 300, done: false}
numsIterator.next() // {value: undefined, done: true}

// for (let n of numsIterator) {
//     console.log(n)
// }
```

最简单的自定义迭代器

```js
class CustomIterator {
    private data: number[]

    constructor() {
        this.data = [10, 20, 30]
    }

    * [Symbol.iterator]() {
        yield* this.data
    }
}

const iterator = new CustomIterator()
for (let n of iterator) {
    console.log(n)
}
```

## yield 遍历 DOM 树

有助于深入理解 Generator

```js
function* traverse(elemList: Element[]): any {
    for (const elem of elemList) {
        yield elem

        const children = Array.from(elem.children)
        if (children.length) {
            yield* traverse(children)
        }
    }
}

const container = document.getElementById('container')
if (container) {
    for (let node of traverse([container])) {
        console.log(node)
    }
}
```

## 总结

- 基本使用
- yield* 语法
- 遍历 DOM 树
