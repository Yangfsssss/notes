/** Item39: 比起普通的any，选择更精确的any变体，Prefer More Precise Variants of any to Plain any */

const numArgsBad = (...args: any) => args.length;
const numArgsGood = (...args: any[]) => args.length;
//the difference between these two is like (array:any) and (array:any[]);

//Things to Remember
//• When you use any, think about whether any JavaScript value is truly permissible.
//• Prefer more precise forms of any such as any[] or {[id: string]: any} or ()
//=> any if they more accurately model your data.
