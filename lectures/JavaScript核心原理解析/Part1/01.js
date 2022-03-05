/** 01,delete 0：JavaScript中到底有什么是可以销毁的 */

//对象和函数按引用来传递和使用。
//delete 这个操作的正式语法设计并不是“删除某个东西”，而是“删除一个表达式的结果”
//表达式的结果，在 ECMAScript 的规范中，称为“引用”。
//任何表达式计算的结果（Result）要么是一个值，要么是一个引用。
//单值表达式的运算结果返回那个“对象字面量”的单值。
//所有赋值操作的含义，是将右边的“值”，赋给左边用于包含该值的“引用”。
//“delete x”归根到底，是在删除一个表达式的、引用类型的结果（Result），而不是在删除 x 表达式，或者这个删除表达式的值（Value）类型的结果。
//“属性存取（"."运算符）”返回一个关于“x”的引用，然后它可以作为下一个操作符（例如函数调用运算“()”）的左手端来使用
//在对象方法调用的时候，函数 _x()_ 是来自于obj.x这个引用的，所以这个引用将obj这个对象传递给 x()，这才会让函数 _x()_ 内部通过 this 来访问到 obj。
//根本上来说，如果obj.x只是值，或者它作为右手端，那么它就不能“携带”obj 这个对象，也就完成不了后续的方法调用操作。
//对象存取 + 函数调用 = 方法调用


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









