/** Item47: 导出所有出现在公有API中的类型，Export All Types That Appear in Public APIs*/

//作为用户，你总想使用一些第三方的type或者interface，但却发现它们没有被导出。
//可以使用TypeScript的类型之间的映射工具来解决这个问题。

//作为库作者，这意味着你应该在一开始就导出这些类型声明。

interface SecretName {
  first: string;
  last: string;
}

interface SecretSanta {
  name: SecretName;
  gift: string;
}

export function getGift(name: SecretName, gift: string): SecretSanta {
  return {} as SecretSanta;
}

type MySanta = ReturnType<typeof getGift>;
type MyName = Parameters<typeof getGift>;

//Things to Remember
//导出任何公共方法中以任何形式出现的类型。你的用户无论如何都能提取它们，所以不妨让这件事变得更容易一些。
