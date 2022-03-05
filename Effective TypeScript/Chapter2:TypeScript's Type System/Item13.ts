/** Item13: 了解类型（type）和接口（interface）的区别 */

//带有属性的函数，通过提醒自己函数是可调用的对象来记住这种语法。
type TFnWithProperties = {
  (x: number): number;
  prop: string;
};

interface IFnWithProperties {
  (x: number): number;
  prop: string;
}

//##type和interface可以互相扩展，但interface不能扩展复杂类型，比如联合类型。
//##类可以实现interface或简单类型。
//##有联合type，但没有联合interface。
//##type可以更容易地表达元组和数组类型。
//##interface可以被扩增，称为“声明合并”。

//##使用type还是interface？
//1，复杂类型，使用type；
//2，考虑代码一致性；
//3，考虑是否扩增
