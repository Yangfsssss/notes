/** Item62: 在启用noImplicitAny之前，不要认为迁移已经完成，Dont't Consider Migration Complete Until You Enable noImplicitAny*/

//没有打开noImplicitAny选项的TypeScript代码最好被认为是过渡性的，因为该选项会掩盖类型声明中真正的错误。

//一个启用noImplicitAny的好的策略是在你的本地客户端启用它并开始修正错误。
//你从类型检查器中得到的错误数量能让你对进度有良好的把握。
//你可以在不提交tsconfig.json变更的情况下提交类型修正，直到你的错误降到0。

//noImplicitAny是增加类型检查的严格性的最重要的选项，单单一个设置就能使项目得到大部分TypeSc1ipt所带来的好处。

//Things to Remember
//在采用noImplicitAny之前，不要认为你的TypeScript迁移工作已经完成了。松散的类型检查会掩盖类型声明中真正的错误。
//在强制设置noImplicitAny之前，逐步修复类型错误。在采用更严格的检查之前，给你的团队一个适应TypeScript的机会。
