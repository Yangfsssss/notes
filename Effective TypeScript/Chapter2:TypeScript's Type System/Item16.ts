/** Item16: 优先选择Array、Tuple和ArrayLike，而不是数字索引签名*/
//理解数组是对象，它们的键是字符串，而不是数字。Number作为索引签名是一个纯粹的TypeScript结构，用以捕获错误。
//比起在索引签名中使用number，更应该使用Array、tuple或ArrayLike类型。

const ary = ['value1', 'value2'];
//等同于
const obj = { '0': 'value1', '1': 'value2' };
