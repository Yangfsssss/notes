/** Item57: 使用Source Maps来调试TypeScript，Use Source Maps to Debug TypeScript*/

//tsconfig.json:
// {
//   "compilerOptions":{
//     "sourceMap": true
//   }
// }

//使用Source Maps有以下一些需要注意的地方：
//你使用的打包或压缩工具应该映射到TypeScript代码而不是JavaScript代码。
//如果它没有内置支持TypeScript，你可能需要找到一些设置选项来使它读取Source Map输入。

//注意是否在生产环境中也提供了Source Map，除非打开调试器，否则浏览器不会加载Source Map，所以对用户来说没有性能影响。
//但可能存在隐私安全问题。

//Source Maps也可以用来调试NodeJS程序。这通常是通过你的编辑器或将浏览器调试器连接到你的node进程来完成的。
//类型检查器很好，但它不能代替一个好的调试器。使用Source Maps可以获得良好的TypeScript调试体验。

//Things to Remember
//不要调试JavaScript。要在运行时使用Source Maps来调试你的TypeScript代码。
//确保你的Source Maps一直映射到你运行的代码里。
//根据你的设置，你的Source Maps可能包含你的原始代码的内连副本。除非你知道你在做什么，否则不要发布它们！
