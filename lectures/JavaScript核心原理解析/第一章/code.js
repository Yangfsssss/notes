/** 01,delete 0：JavaScript中到底有什么是可以销毁的 */

function zo() {
    delete x
}

//函数产生副作用
function zo1() {
    const obj = {
        key1: 'value1'
    }

    function func(obj) {
        console.log('executed');
        console.log(obj.key1);
        delete obj.key1
    }

    func(obj)

    console.log(obj);
}

// zo1()

//delete删除的是一个非引用类型的值，也称单值表达式
//单值表达式的运算结果返回那个“对象字面量”的单值
function zo2() {
    delete {}
}

//所有赋值操作的含义，是将右边的“值”，赋给左边用于包含该值的“引用”
function zo3() {
    //操作,把值y赋给引用x
    x = y
        //实际内容
    x = GetValue(y)
}

function zo4() {
    const obj = {
        a: function() {
            return 5
        }
    }

    console.log((obj.a)() === obj.a());
}

// zo4()

//思考题
//1，x不存在，delete x会发生什么？
//正常运行，返回undefined
function zo5() {
    delete x
}

// zo5()
// console.log(zo5());

//2,在obj.x中，如果x是只读的，会发生什么？
//仍然可以执行删除操作
function zo6() {
    const obj = {
        x: 'aValue'
    }

    Object.defineProperty(obj, 'x', {
        writable: false
    })

    console.log(obj);
    console.log(Object.getOwnPropertyDescriptor(obj, 'x'));

    delete obj.x

    console.log(obj);
}

// zo6()

// console.log(Object.getOwnPropertyDescriptor(window, 'undefined'));



/** 02,var x = y = 100，声明语句和语法改变了JavaScript语言核心性质*/

function zt() {
    var x = y = 100;
    console.log(x);
    console.log(y);
}

// zt()

function zt1() {
    var a = 100;
    x = 200;

    console.log(Object.getOwnPropertyDescriptor(window, 'a'));
    console.log(Object.getOwnPropertyDescriptor(window, 'x'));

    console.log(delete a);
    console.log(delete x);

    console.log(a);
    console.log(x);
}

//特例：唯一一种
// eval('var b = 300');
// console.log(Object.getOwnPropertyDescriptor(window, 'b').configurable);
// console.log(delete b);
// console.log(b);

// zt1()

//赋值表达式本身是有结果的，它是右操作数的值，注意：是“值”而非“引用”

// function zt2() {
// obj = { f: function() { return this === obj } }

// (a = obj.f)()
// }

// zt2()

//变量提升
function zt3() {
    var x = 100;
    console.log(x, z, zz);
    console.log(y);
    if (true) {
        let y = 200;
        var z = 300;

        function zz() {}
    }
}

// zt3()

// n = 100;

// console.log(window.n);

// let n = 200;

// console.log(n);


/** 03,a.x = a = {n:2}：一道被无数人无数次地解释过的经典面试题 */

function ztt() {
    var c = {};
    c.a = c = [];
    alert(c.a)
}

// ztt()

//复习题
//1，试解析with ({x:100}) delete x; 将发生什么
function reviewQuestion1() {
    with({ x: 100 })
    var result = delete x
    console.log(result);
}

//没有操作，返回true
// reviewQuestion1()

//2，试说明(eval)()与(0, eval)()的不同
function reviewQuestion2() {
    console.log((eval));
    console.log((0, eval));
}

// reviewQuestion2()

//3，设“a.x === 0”，试说明“(a.x) = 1”为什么可行。
function reviewQuestion3() {
    var a = {}

    a.x === 0;

    // (a.x) = 1;

    console.log(a);
}

// reviewQuestion3()

//4，为什么with (obj={}) x = 100; 不会给 obj 添加一个属性’x’？
function reviewQuestion4() {
    with(obj = {})
    x = 100
    console.log(obj);
}

// reviewQuestion4()


/** 04，export default function(){}：你无法导出一个匿名函数表达式 */

function zf() {
    var obj = {
        default: function() {}
    }

    console.log(obj.default.name);
}

zf()