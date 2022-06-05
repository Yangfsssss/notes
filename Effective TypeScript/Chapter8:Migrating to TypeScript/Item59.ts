/** Item59: 使用@ts-check和JSDoc来尝试TypeScript，Use @ts-check and JSDoc to Experiment TypeScript*/

//@ts-check可以指示类型检查器分析单个JS文件并报告它发现的任何问题。
//它是类型检查的一个宽松版本，甚至比关闭了noImplicitAny的TypeScript还要宽松。

//未声明的全局变量：
//假如user是一个来自定义在其他地方（例如另一个<script>标签）的环境符号
console.log(user.firstName); //error at first
//那么你可以创建一个名为types.d.ts的文件，并在其中声明它：
interface UserData {
  firstName: string;
  lastName: string;
}
declare let user: UserData;

//单独创建这个文件应该会解决这个问题，如果不能，使用“三斜杠”引用来显示地导入它：
/// <reference path="types.d.ts" />

//这样的types.d.ts文件是很有价值的，它将成为你项目类型声明的基础。

//未知的库：
//如果你使用第三方库，TypeScript需要知道它。
//使用npm install --save-dev @types/xxxxx来安装这些第三方库的类型声明。
//@ts-check可以让你利用流行的JavaScript库的类型声明，而不用自己迁移到TypeScript。

//DOM问题：
//TypeScript中的DOM问题可以参见Item55。
//JS文件中可以使用JSDoc来标注或断言类型。

//不准确的JSDoc：
//如果你的项目已经有JSDoc风格的注释，当你打开@ts-check时，TypeScript会开始检查它们
//修复现有的不准确的JSDoc并逐步将缺少的类型标注添加到你的项目中。

//我们最终的目标是将你的项目转换成TypeScript，而不是JSDoc标注的JavaScript。
//但@ts-check可以是一个有用的方法来尝试类型和发现一些最初的错误，特别是对于已经有大量JSDoc标注的项目。

//Things to Remember
//将“//@ts-check”添加到JavaScript文件的顶部以启用类型检查。
//识别常见错误，了解如何为第三方库声明全局变量和添加类型声明。
//使用JSDoc标注来进行类型断言和更好的类型推断。
//不要花太多时间在用JSDoc让你代码变得类型完美上。记住，我们的目标是转换到.ts!
