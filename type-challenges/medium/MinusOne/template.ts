type MinusOne<T extends number, Temp extends any[] = []> = [...Temp, '']['length'] extends T
  ? Temp['length']
  : MinusOne<T, [...Temp, '']>;

//思路：
//创建一个初始长度为0的临时数组，组合成一个长度加1的新数组，
//如果新数组长度等于T，则返回临时数组的长度，否则递归调用。

type Zero = MinusOne<1>; // 0
type FiftyFour = MinusOne<55>; // 54
type OneHounder = MinusOne<101>; // 100
type OneThousandOneHounderAndOne = MinusOne<999>;
