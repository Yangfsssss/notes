常见的类型判断：
    typeof - 只能判断值类型，其他就是function和object。
    instanceof - 需要两个参数来判断，而不是获取类型。

枚举各种类型：
    通过typeof判断值类型和function；
    其他引用通过instanceof来逐个判断识别；
    如 x instanceof Map，则返回map；

    枚举的坏处：
        你可能忽略某些类型；
        增加了新类型，需要修改代码；

答案：
    使用Object.prototype.toString.call();
