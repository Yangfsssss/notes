export default class jQuery {
  length: number;
  [index: number]: Node;

  constructor(selector: string) {
    const result = document.querySelectorAll(selector);
    const length = result.length;

    for (let i = 0; i < length; i++) {
      this[i] = result[i];
    }
    this.length = length;
  }

  get(index: number) {
    return this[index];
  }

  each(fn: (element: Node) => void) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem);
    }
    return this;
  }

  on(type: string, fn: (event: Event) => void) {
    return this.each((elem) => {
      elem.addEventListener(type, fn);
    });
  }

  // 扩展很多DOM API
}

// 插件
// jQuery.prototype.dialog = function (info: string) {
//   alert(info);
// }

// 造轮子
export class myJQuery extends jQuery {
  constructor(selector: string) {
    super(selector);
  }

  // 扩展自己的方法
  addClass(className: string) {
    return className
  }

  style(data:Record<string,unknown>){
    return data
  }
}