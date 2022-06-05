/** Item56: 不要依赖私有访问修饰符来隐藏信息，Don't Rely on Private to Hide Information*/

class Diary {
  private secret = 'cheat on my English test';
}

const diary = new Diary();
// diary.secret; // error
(diary as any).secret; //OK
//无论是编译后的JavaScript，还是TypeScript本身，都无法阻止private修饰的信息被访问。

//使用闭包：
declare function hash(text: string): number;

class PasswordChecker {
  checkPassword: (password: string) => boolean;

  constructor(passwordHash: number) {
    this.checkPassword = (password: string) => {
      return hash(password) === passwordHash;
    };
  }
}

const checker = new PasswordChecker(hash('s3cret'));
checker.checkPassword('s3cret');

//使用私有字段：
class _PasswordChecker {
  #passwordHash: number;

  constructor(passwordHash: number) {
    this.#passwordHash = passwordHash;
  }

  checkPassword(password: string) {
    return hash(password) === this.#passwordHash;
  }
}

const _checker = new _PasswordChecker(hash('s3cret'));
_checker.checkPassword('secret'); //false
_checker.checkPassword('s3cret'); //true

//最后，如果你担心的是安全问题，而不仅仅是封装问题，那么还有其他需要注意的问题，比如对内置原型（prototype）和函数的修改。

//Things to Remember
//private访问修饰符只有通过类型系统才能被强制执行。它在运行时没有效果，可以被一个类型断言轻松绕过。不要以为它能保持数据的隐蔽性。
//为了更可靠的的信息隐藏，请使用闭包或者私有字段。
