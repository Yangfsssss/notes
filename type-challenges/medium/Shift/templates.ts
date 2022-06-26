type Shift<T> = T extends [infer U,...infer V]
  ? [...V]
  : never

type ShiftResult = Shift<[3, 2, 1]> // [2, 1]