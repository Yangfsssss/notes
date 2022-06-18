type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer V}` ? `${V}` : `${T}`;

//使用`${}`将number、bigint类型转换为字符串字面量类型。

type testAbsolute = -35 extends number ? true : false;
type testAbsolute1 = Absolute<-35>;

type TestAbsolute = -100;
type AbsoluteResult = Absolute<TestAbsolute>; // expected to be "100"
