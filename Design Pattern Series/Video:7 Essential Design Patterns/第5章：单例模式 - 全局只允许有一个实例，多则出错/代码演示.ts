// 将类的实例作为自身的属性，并实现一个类方法，返回这个实例
// 注意：
// 1，实例同时也是类属性，使用static；
// 2，实例无法直接通过类访问，使用private
//3，类只能在其类方法中实例化，使用private constructor
export class Singleton {
  // 单例的实例
  private static instance:Singleton | null;
  name:string;

  // 将constructor设为private，使类无法在其外部被实例化
  private constructor(name:string){
    this.name = name;
  }

  // 获取单例的实例，如果没有，则创建一个
  static getInstance(name:string):Singleton {
    if(Singleton.instance == null){
      Singleton.instance = new Singleton(name)
    }

    return Singleton.instance;
  }
}

const s1 = Singleton.getInstance('Jack');
const s2 = Singleton.getInstance('John');

console.log(s1 === s2);
