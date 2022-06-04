/** Item46: 了解类型声明中涉及的三个版本，Understand the Three Versions Involved in Type Declarations */

//使用TypeScript现在会让你管理三个版本的依赖关系：
//软件包的版本。
//其类型声明的版本。
//TypeScript的版本。

//通常情况下：
//将一个包作为直接依赖安装。
//npm install react
//+ react@16.8.6
//将其类型作为开发依赖安装。
//npm install --save-dev @types/react
//+ @types/react@16.8.19（类型声明的更新可能比库本身的更新多得多）

//问题一：
//库版本高于类型声明版本。
//解决办法：
//更新类型声明或使用扩增。

//问题二：
//类型声明版本高于库版本。
//解决办法：
//升级库或降级类型声明。

//问题三：
//类型声明的TypeScript版本高于项目的TypeScript版本。
//解决办法：
//升级项目的TypeScript版本或使用旧版本的类型声明。
//使用declare module 覆盖高版本的类型声明。

//给特定版本的TypeScript安装@types：
//npm install --save-dev @types/lodash@ts3.1

//问题四：
//出现重复的@types依赖关系并且其版本间存在冲突：
//解决办法：
//更新类型声明的版本使其兼容。

//-----------------------------------------------------------------------
//或者：
//将类型声明版本与包版本绑定并一同发布。

//问题一：
//有时出现无法通过扩增解决的问题或与TypeScript新版本不兼容。
//对比DefinitelyTyped：TypeScript新版本发布时会测试其是否与DefinitelyTyped兼容。

//问题二：
//类型声明中存在其他类型声明的依赖。
//对ts用户而言：无法获取到其他依赖，导致类型错误。
//如果将其作为一个直接依赖（dependencies而非devDependencies），对js用户而言：会安装无用的@types模块。
//对比DefinitelyTyped：只有ts用户才会获取类型声明。

//问题三：
//很难维护某个旧版本库的类型声明。
//对比DefinitelyTyped：支持方便地维护同一个库的不同版本的类型声明。

//问题四：
//类型声明的维护量通常大于库的维护量。
//对比DefinitelyTyped：支持社区共同维护。

//-----------------------------------------------------------------------
//结论：
//ts库：使用打包类型声明，使用tsc自动生成类型声明。
//js库：将类型声明发布在DefinitelyTyped，由社区共同维护。

//Things to Remember
//@types依赖关系涉及三个版本：库版本、@types版本、TypeScript版本。
//如果你更新了一个库，请确保你更新了其相应的@types。
//了解使用打包类型与在DefinitelyTyped上发布类型声明的利弊。如果你的库是用TypeScript编写的，优先选择打包类型；
//如果不是，优先选择DefinitelyTyped。
