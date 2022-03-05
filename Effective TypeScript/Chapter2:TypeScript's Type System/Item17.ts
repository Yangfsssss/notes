/** Item17: 使用readonly避免值变（Mutation）相关的错误*/
//readonly的特性：
//可以从中读取元素，但不能写入。
//可以读取其length属性，但不能重写它。
//不能调用pop()或其他方法来使数组值变。
//readonly具有传染性。

//readonly只修饰当前层级的数据，如需使用深层readonly，需要使用其他库。

//如果函数不修改它的参数，那么就把它们声明为readonly。这样可以使其契约更加清晰，以防在实现中无意间发生值变。
//用readonly来防止值变错误，并找到代码中发生值变的地方。
//理解const和readonly的区别。
//readonly是浅层的。
