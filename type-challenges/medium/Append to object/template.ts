type AppendToObject<T extends object, U extends string, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V;
};

//思路：
//将keyof T和U组成字面量联合类型，遍历并取得对应的类型。

type testAppendToObject1 = {
  key: 'cat';
  value: 'green';
};

type TestAppendToObject = { id: '1' };
type ResultAppendToObject = AppendToObject<TestAppendToObject, 'value', 4>; // expected to be { id: '1', value: 4 }
type ResultAppendToObject1 = AppendToObject<testAppendToObject1, 'home', boolean>; // expected to be { id: '1', value: 4 }
