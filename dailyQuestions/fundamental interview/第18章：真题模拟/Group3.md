数组slice和splice的区别：
    Array.prototype.slice()：数组切片，第一个参数为起点（包含）的索引，第二个参数为终点（不包含）的索引（），返回包含被切片元素的新数组，不修改原数组；

    Array.prototype.splice()：剪接数组元素，第一个参数为起点（包含）的索引，第二个参数为切除的长度，剩余参数为在起点后接入的元素，修改原数组，返回原数组。


[10,20,30].map(parseInt) 返回结果是什么？
    略；


ajax请求中，get方法和post方法的区别：
    get：不能包含body，可以包含query；
    post：可以包含body，不能包含query。

    补充：
        get一般用于查询操作，post一般用于用户提交操作；
        get参数拼接在url上，post放在请求体内（数据体积更大）；
        post易于防止CSRF，安全性更好；