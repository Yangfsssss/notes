declare interface Window {
  $: (selector: string) => JQuery;
}

export class JQuery {
  selector: string;
  length: number;

  constructor(selector: string) {
    const domList = Array.prototype.slice.call(document.querySelectorAll(selector));
    const length = domList.length;

    for (let i = 0; i < length; i++) {
      // @ts-ignore
      this[i] = domList[i];
    }

    this.selector = selector;
    this.length = length;
  }

  append(elem: HTMLElement): JQuery {
    // append的操作...
    return this;
  }

  addClass(className: string): JQuery {
    // addClass的操作...
    return this;
  }

  // ...methods
}

// 不用工厂模式
// const $div = new JQuery('div');
// const $p = new JQuery('p');

// 用工厂模式
function $(selector:string){
  return new JQuery(selector)
}

const $div = $('div');
const $p = $('p');

// @ts-ignore
window.$ = $;
