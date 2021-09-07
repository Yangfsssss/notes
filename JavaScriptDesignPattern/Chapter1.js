/** 第一章 灵活的语言-- JavaScript */
//1.1 入职第一天
function oo() {
    function checkName() {
        //验证姓名
    }

    function checkEmail() {
        //验证邮箱
    }

    function checkPassword() {
        //验证密码
    }
}
//原始思路

//1.2 函数的另一种形式
function ot() {
    var checkName = function() {
        //验证姓名
    }

    var checkEmail = function() {
        //验证邮箱
    }

    var checkPassword = function() {
        //验证密码
    }
}
//使用函数表达式，将函数放在变量里保存，可以减少覆盖或被覆盖的风险，
//一旦被覆盖，所有的功能都会失效，容易找到原因

//1.3 用对象收编变量
function ot() {
    var checkObject = {
        checkName: function() {
            //验证姓名
        },
        checkEmail: function() {
            //验证邮箱
        },
        checkPassword: function() {
            //验证密码
        },
    }
}
//只需一个变量

//1.4 对象的另一种形式
function of() {
    var checkObject = function() {}

    checkObject.checkName = function() {
        //验证姓名
    }

    checkObject.checkName = function() {
        //验证邮箱
    }

    checkObject.checkName = function() {
        //验证密码
    }
}
//无法复制

//1.5 真假对象
function of() {
    var checkObject = function() {
        return {
            checkName: function() {
                //验证姓名
            },
            checkEmail: function() {
                //验证邮箱
            },
            checkPassword: function() {
                //验证密码
            },
        }
    }

    var a = checkObject()

    a.checkEmail()

    // return { a, checkObject }
    console.log(a)
    console.log(a.__proto__)
    console.log(checkObject.prototype)
    console.log(a.__proto__ === checkObject.prototype) //false
}
// console.log(of())
// console.log(of().a.__proto__)
// console.log(of().checkObject.prototype)
// console.log(of().a.__proto__ === of().checkObject.prototype)

// of()
//返回新对象，互不影响

//1.6 类也可以
function os() {
    var checkObject = function() {
        this.checkName = function() {
            //验证姓名
        }

        this.checkEmail = function() {
            //验证邮箱
        }

        this.checkPassword = function() {
            //验证密码
        }
    }

    var a = new checkObject()

    a.checkEmail()

    // return { a, checkObject }
    console.log(a)
    console.log(a.__proto__)
    console.log(checkObject.prototype)
    console.log(a.__proto__ === checkObject.prototype) //true
}

// os()
// console.log(os())
// console.log(os().a.__proto__)
// console.log(os().checkObject.prototype)
// console.log(os().a.__proto__ === os().checkObject.prototype)
//使用构造函数（类）

//1.7 一个检测类
//方法一：在原型上添加属性
function os() {
    var checkObject = function() {}

    checkObject.prototype.checkName = function() {
        //验证姓名
    }

    checkObject.prototype.checkEmail = function() {
        //验证邮箱
    }

    checkObject.prototype.checkPassword = function() {
        //验证密码
    }
}

//方法二：重写原型
function os2() {
    var checkObject = function() {}

    checkObject.prototype = {
        checkName: function() {
            //验证姓名
        },
        checkEmail: function() {
            //验证邮箱
        },
        checkPassword: function() {
            //验证密码
        },
    }
}
//两种方法不能混用

//1.8 方法还可以这样用
//在方法中返回主对象，以实现链式调用
//对象形式：
function oe() {
    var checkObject = {
        checkName: function() {
            //验证姓名
            return this
        },
        checkEmail: function() {
            //验证邮箱
            return this
        },
        checkPassword: function() {
            //验证密码
            return this
        },
    }

    checkObject.checkName().checkEmail().checkPassword()
}

//原型形式
function oe2() {
    var checkObject = function() {}

    checkObject.prototype = {
        checkName: function() {
            //验证姓名
            return this
        },
        checkEmail: function() {
            //验证邮箱
            return this
        },
        checkPassword: function() {
            //验证密码
            return this
        },
    }

    var a = new checkObject()

    a.checkName().checkEmail().checkPassword()
}

//1.9 函数的祖先
//函数原型Function.prototype的拓展
//1：在原型上拓展：污染函数原型
function on() {
    Function.prototype.checkEmail = function() {
        //验证邮箱
    }

    //使用形式：函数
    var f = function() {}
    f.checkEmail()

    //使用形式：类
    var c = new Function()
    c.checkEmail()
}

//2：在函数实例上拓展：在原型上添加一个为实例添加方法的方法
function on1() {
    Function.prototype.addMethod = function(name, fn) {
        this[name] = fn
    }

    var methods = function() {}
        //或 var methods = new Function();

    methods.addMethod('checkName', function() {
        //验证姓名
    })

    methods.addMethod('checkEmail', function() {
        //验证邮箱
    })

    methods.checkName()
    methods.checkEmail()
}

//1.10 可以链式添加吗
//1：链式添加方法
function ot() {
    Function.prototype.addMethod = function(name, fn) {
        this[name] = fn

        return this
    }

    var f = new Function()

    f.addMethod('checkName', function() {
        //验证姓名
    }).addMethod('checkEmail', function() {
        //验证邮箱
    })
}

//2：链式调用
function ot1() {
    Function.prototype.addMethod = function(name, fn) {
        this[name] = fn

        return this
    }

    var f = new Function()

    f.addMethod('checkName', function() {
        //验证姓名
        console.log('1')
        return this
    }).addMethod('checkEmail', function() {
        //验证邮箱
        console.log('2')
        return this
    })

    f.checkName().checkEmail()
}

// ot1()

//1.11 换一种方式使用方法
//构造一条新的原型链，m---Methods---Methods.prototype
function oe() {
    Function.prototype.addMethod = function(name, fn) {
        this.prototype[name] = fn

        return this
    }

    var Methods = new Function()

    Methods.addMethod('checkName', function() {
        console.log('checkName')
            //验证姓名
    }).addMethod('checkEmail', function() {
        console.log('checkEmail')
            //验证邮箱
    })

    console.log("Methods' prototype", Methods.prototype)
    console.log("Methods' __proto__", Methods.__proto__)

    var m = new Methods()

    m.checkEmail()
}

// oe()

//问题：函数的prototype属性是什么
function oe2() {
    const obj = new Object()

    //对象的prototype属性为undefined
    console.log("obj's __proto__", obj.__proto__)
    console.log("obj's prototype", obj.prototype) //undefined

    //函数的prototype属性是一个构造函数
    function func() {}
    console.log("func's __proto__", func.__proto__)
    console.log("func's prototype", func.prototype)
    console.log("func's prototype", typeof func.prototype) //object
    console.log("func's prototype", func.prototype instanceof Function) //false

    // const aFunc = new func.prototype()
    // console.log(aFunc)
}

// oe2()

//忆之获：
//“灵活性”是JavaScript特有的气质，不同的人可以写出不同风格的代码，
//不过在团队开发中需要慎重挥霍，尽量保证团队开发代码风格的一致性，
//这也是团队代码易开发，可维护以及代码规范的必然要求

//我问你答：
//1：真假对象一节中如何实现方法的链式调用呢？
//使用return this在方法调用末尾返回调用该方法的对象，以实现链式调用

//2：试着定义一个可以为函数添加多个方法的addMethod方法
//添加值函数本身而非原型
function questionTwo() {
    Function.prototype.addMultipleMethods = function(methodsContainerObj) {
        for (const key of Object.keys(methodsContainerObj)) {
            this[key] = methodsContainerObj[key]
        }
    }

    const methodsContainer = {
        checkName: function() {
            console.log('checkName')
            return this
        },
        checkEmail: function() {
            console.log('checkEmail')
            return this
        },
        checkPassword: function() {
            console.log('checkPassword')
            return this
        },
    }

    const f = new Function()

    f.addMultipleMethods(methodsContainer)

    f.checkName().checkEmail().checkPassword()
}

// questionTwo()

//3：试着定义一个即可为函数原型添加方法又可为其自身添加方法的addMethod方法
function questionThree() {
    Function.prototype.addMethod = function(name, fn, type) {
        switch (type) {
            case 'self':
                {
                    this[name] = fn
                }
                break
            case 'proto':
                {
                    Function.prototype[name] = fn
                }
                break
        }
    }

    const f = new Function()

    const checkName = function() {
        console.log('checkName')
    }

    const checkEmail = function() {
        console.log('checkEmail')
    }

    f.addMethod('checkName', checkName, 'self')
    f.addMethod('checkEmail', checkEmail, 'proto')

    f.checkName()
    f.checkEmail()

    console.log(f.hasOwnProperty('checkName'))
    console.log(f.hasOwnProperty('checkEmail'))
}

// questionThree()