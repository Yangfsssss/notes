type OmitByType<T extends object, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
}

//操作key

type OmitBoolean = OmitByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { name: string; count: number }