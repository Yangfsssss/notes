/** Item58: 编写现代JavaScript，Write Modern JavaScript*/

//除了检查你的代码的安全性，tsc还可以作为一个“transpiler”来使用：将新版本的JavaScript代码转换成旧版本的。
//TypeScript被设计成与现代JavaScript同步，所以更新你的JS是采纳TypeScript的第一步。
//对于采用TypeScript，最重要的还是ECMAScript的模块和ES2015的类。

//使用ECMAScript模块：
//TypeScript与ES模块配合得最好，采用ES模块将促进你的过渡，尤其是它允许你一次迁移一个模块。

//使用类而不是原型：
//如果你的代码直截了当地使用原型，请切换到使用类。TypeScript语言服务提供了一个“将函数转换成类”的快速修复方法。

//使用let/const代替var：

//使用for-of或数组方法代替for(;;)：

//优先使用箭头函数而不是函数表达式：
//箭头函数中的this更加可预测。

//使用对象字面量的简写形式和解构赋值：
//解构赋值可以减少变量个数。
//解构时可以指定默认值。

//使用默认函数参数：
//当迁移到TypeScript时，默认参数可以帮助类型检查器推断参数的类型，从而消除对类型标注的需求。

//使用await/async代替原始的Promise或Callback：
//Item25解释了为什么await/async更可取，但要点是它们会简化代码，防止错误，并帮助类型在你的异步代码中流动。

//不要把use strict放在TypeScript中：
//TypeScript提供的健全性检查比严格模式要严格的多。
//使用alwaysStrict，而不是use strict。

//Things to Remember
//TypeScript可以让你编写现代的JavaScript，不论是什么运行时环境。好好利用这一点吧，充分使用它所支持的语言特性。
//除了改善代码库外，这将帮助TypeScript理解你的代码。
//用TypeScript来学习语言特性，如类、解构和async/await。
//别管'use strict'了：TypeScript更加严格。
//查看TC39 Github代码库和TypeScript发行说明，了解所有最新的语言特性。
