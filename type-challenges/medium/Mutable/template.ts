type Mutable<T extends object> = {
  -readonly [P in keyof T]: T[P];
}

interface MutableTodo {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

type testMutableTodo = Mutable<MutableTodo> // { title: string; description: string; completed: boolean; }
