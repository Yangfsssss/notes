/** Item45: 把Typescript和@types放在devDependencies中，Put TypeScript and @types in devDependencies */

//npm区分了几种不同的依赖，分别在package.json中的devDependencies和dependencies中。
//dependencies是运行JavaScript所需的包，它们被称为传递性依赖。
//devDependencies用来开发和测试你的代码，但在运行时并不需要。

//Things to Remember
//避免在系统范围内安装TypeScript。让TypeScript成为你项目的devDependencies，以确保团队中的每一个人都在使用一个一致的版本。
//把@types的依赖放在devDependencies而不是dependencies中。如果在运行时需要@types，那么你可能需要重新设计你的流程。
