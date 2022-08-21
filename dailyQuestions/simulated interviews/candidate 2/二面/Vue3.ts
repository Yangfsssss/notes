const fns = new Set();

export function reactive(obj: Record<keyof any, unknown>): Record<keyof any, unknown> {
  const handler: ProxyHandler<typeof obj> = {
    get(target, key, receiver) {
      if(activeCb) fns.add(activeCb);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);

      if (oldValue !== value) {
        console.log(key, 'changed.');
      }

      for (const cb of fns) {
        if (typeof cb === 'function') {
          cb();
        }
      }

      return result;
    },
  };

  return new Proxy(obj, handler);
}

let activeCb: () => void;

function effect(fn: () => void) {
  activeCb = fn;
  fn(); // 执行一次，触发 proxy.get
}

const user = reactive({ name: 'Yang' });

effect(() => {
  console.log('name', user.name);
});

// 修改属性，自动触发effect内部函数执行
user.name = 'Tom';
setTimeout(() => {
  user.name = 'Jerry';
}, 1000);
