type PickByType<T extends object, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

//在object中，
//筛选key在左边操作，
//操纵key的类型在右边操作。

//思路：
//以其类型是否属于传入泛型参数的类型筛选key。

type OnlyBoolean = PickByType<
  {
    name: string;
    count: number;
    isReadonly: boolean;
    isEnable: boolean;
  },
  boolean
>; // { isReadonly: boolean; isEnable: boolean; }
