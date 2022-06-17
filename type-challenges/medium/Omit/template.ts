type ExcludeAgain<M,N> = M extends  N ? never : M;

// type MyOmit<T, K extends keyof T> = {
//   [P in  ExcludeAgain<keyof T,K> ]: T[P];
// };

//as之后的表达式类似一个条件遍历：
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never:P]: T[P];
};

//思路：
//1，取得T的key，然后去除掉与K重合的key。
//2，然后遍历组成新的对象类型。

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}

function MyOmit(obj: Record<string,any>, keys: string[]) {
  const result:Record<string,any> = {};

  for(const key in Object.keys(obj)){
    if(!keys.includes(key)){
      result[key] = obj[key];
    }
  }

  return result;
}

// type aaa=  Exclude