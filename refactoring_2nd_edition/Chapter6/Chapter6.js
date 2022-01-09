"use strict";
/** Chapter6：第一组重构 */
//我最常用到的重构就是用提炼函数（106）将代码提炼到函数中，或者用提炼变量（119）来提炼变量。
//既然重构的作用就是应对变化，你应该不会感到惊讶，我也经常使用这两个重构的反向重构——内联函数（115）和内联变量（123）。
exports.__esModule = true;
exports.defaultOwner = void 0;
//6.1 提炼函数（Extract Function）-------------------------------------------------------------------------------------------
//曾用名：提炼函数（Extract Method）
//反向重构：内联函数（115）
function printOwing(invoice) {
    printBanner();
    var outstanding = calculateOutstanding();
    //before---------------------------------------------
    //print details
    console.log("name: " + invoice.customer);
    console.log("amount: " + outstanding);
    //after-----------------------------------------------
    function printDetails(outstanding) {
        console.log("name: " + invoice.customer);
        console.log("amount: " + outstanding);
    }
}
//动机
//“将意图与实现分开”：如果你需要花时间浏览一段代码才能弄清它到底在干什么，那么就应该将其提炼到一个函数中，
//并根据它所做的事为其命名。以后再读到这段代码时，你一眼就能看到函数的用途，
//大多数时候根本不需要关心函数如何达成其用途（这是函数体内干的事）。
//小函数得有个好名字才行，所以你必须在命名上花心思。
//起好名字需要练习，不过一旦你掌握了其中的技巧，就能写出很有自描述性的代码。
//做法
//···创造一个新函数，根据这个函数的意图来对它命名（以它“做什么”来命名，而不是以它“怎样做”命名）。
//如果想要提炼的代码非常简单，例如只是一个函数调用，只要新函数的名称能够以更好的方式昭示代码意图，我还是会提炼它；
//但如果想不出一个更有意义的名称，这就是一个信号，可能我不应该提炼这块代码。
//不过，我不一定非得马上想出最好的名字，有时在提炼的过程中好的名字才会出现。
//有时我会提炼一个函数，尝试使用它，然后发现不太合适，再把它内联回去，这完全没问题。
//只要在这个过程中学到了东西，我的时间就没有白费。
//···将待提炼的代码从源函数复制到新建的目标函数中。
//···仔细检查提炼出的代码，看看其中是否引用了作用域限于源函数、在提炼出的新函数中访问不到的变量。
//若是，以参数的形式将它们传递给新函数。
//如果提炼出的新函数嵌套在源函数内部，就不存在变量作用域的问题了。
//···所有变量都处理完之后，编译。
//···在源函数中，将被提炼代码段替换为对目标函数的调用。
//···测试。
//···查看其他代码是否有与被提炼的代码段相同或相似之处。如果有，考虑使用以函数调用取代内联代码（222）令其调用提炼出的新函数。
//范例：无局部变量
function printOwing(invoice) {
    var outstanding = 0;
    //before---------------------------------------------
    console.log('***********************');
    console.log('**** Customer Owes ****');
    console.log('***********************');
    //after-----------------------------------------------
    printBanner();
    // calculate outstanding
    for (var _i = 0, _a = invoice.orders; _i < _a.length; _i++) {
        var o = _a[_i];
        outstanding += o.amount;
    }
    // record due date
    var today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    //before---------------------------------------------
    //print details
    console.log("name: " + invoice.customer);
    console.log("amount: " + outstanding);
    console.log("due: " + invoice.dueDate.toLocaleDateString());
    //after-----------------------------------------------
    printDetails();
    function printBanner() {
        console.log('***********************');
        console.log('**** Customer Owes ****');
        console.log('***********************');
    }
    function printDetails() {
        console.log("name: " + invoice.customer);
        console.log("amount: " + outstanding);
        console.log("due: " + invoice.dueDate.toLocaleDateString());
    }
}
//范例：有局部变量
//局部变量最简单的情况是：被提炼代码段只是读取这些变量的值，并不修改它们。
//这种情况下我可以简单地将它们当作参数传给目标函数。
function printOwing(invoice) {
    var outstanding = 0;
    printBanner();
    // calculate outstanding
    for (var _i = 0, _a = invoice.orders; _i < _a.length; _i++) {
        var o = _a[_i];
        outstanding += o.amount;
    }
    //before---------------------------------------------
    // record due date
    var today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    //after-----------------------------------------------
    recordDueDate();
    function recordDueDate() {
        var today = Clock.today;
        invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    }
    //before---------------------------------------------
    //print details
    console.log("name: " + invoice.customer);
    console.log("amount: " + outstanding);
    console.log("due: " + invoice.dueDate.toLocaleDateString());
    //after-----------------------------------------------
    printDetails(invoice, outstanding);
    function printDetails(invoice, outstanding) {
        console.log("name: " + invoice.customer);
        console.log("amount: " + outstanding);
        console.log("due: " + invoice.dueDate.toLocaleDateString());
    }
}
//范例：对局部变量再赋值
function printOwing(invoice) {
    //1
    // let outstanding = 0;
    printBanner();
    //3,4
    var outstanding = calculateOutstanding(invoice);
    // calculate outstanding
    //1,3
    // let outstanding = 0;
    // for (const o of invoice.orders) {
    // 	outstanding += o.amount;
    // }
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}
//2
function calculateOutstanding(invoice) {
    //4
    var result = 0;
    for (var _i = 0, _a = invoice.orders; _i < _a.length; _i++) {
        var o = _a[_i];
        result += o.amount;
    }
    return result;
}
//这时候，你可能会问：“如果需要返回的变量不止一个，又该怎么办呢？”
//有几种选择。最好的选择通常是：挑选另一块代码来提炼。
//我比较喜欢让每个函数都只返回一个值，所以我会安排多个函数，用以返回多个值。
//如果真的有必要提炼一个函数并返回多个值，可以构造并返回一个记录对象—
//不过通常更好的办法还是回过头来重新处理局部变量，我常用的重构手法有以查询取代临时变量（178）和拆分变量（240）。
//即便可以先提炼成嵌套函数，或许也应该至少将目标函数放在源函数的同级，这样我就能立即看出提炼的范围是否合理。
//6.2 内联函数（Inline Function）---------------------------------------------------------------------------------------------------
//曾用名：内联函数（Inline Method）
//反向重构：提炼函数（106）
function getRating(driver) {
    return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}
function moreThanFiveLateDeliveries(driver) {
    return driver.numberOfLateDeliveries > 5;
}
function getRating(driver) {
    return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
//动机
//有时候你会遇到某些函数，其内部代码和函数名称同样清晰易读。
//也可能你重构了该函数的内部实现，使其内容和其名称变得同样清晰。
//若果真如此，你就应该去掉这个函数，直接使用其中的代码。
//间接性可能带来帮助，但非必要的间接性总是让人不舒服。
//如果代码中有太多间接层，使得系统中的所有函数都似乎只是对另一个函数的简单委托，
//造成我在这些委托动作之间晕头转向，那么我通常都会使用内联函数。
//当然，间接层有其价值，但不是所有间接层都有价值。
//通过内联手法，我可以找出那些有用的间接层，同时将无用的间接层去除。
//做法
//···检查函数，确定它不具多态性。
//如果该函数属于一个类，并且有子类继承了这个函数，那么就无法内联。
//···找出这个函数的所有调用点。
//···将这个函数的所有调用点都替换为函数本体。
//···每次替换之后，执行测试。
//不必一次完成整个内联操作。如果某些调用点比较难以内联，可以等到时机成熟后再来处理。
//···删除该函数的定义。
//如果你遇到了复杂情况，就不应该使用这个重构手法。
//范例
function rating(aDriver) {
    //before-------------------------------------------------------------
    // return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
    //after-------------------------------------------------------------
    return aDriver.numberOfLateDeliveries & gt;
    5;
}
//before-------------------------------------------------------------
function moreThanFiveLateDeliveries(aDriver) {
    return aDriver.numberOfLateDeliveries & gt;
    5;
}
//情况还可能更复杂。例如，请看下列代码：
function reportLines(aCustomer) {
    var lines = [];
    //before-------------------------------------------------------------
    // gatherCustomerData(lines, aCustomer);
    //after-------------------------------------------------------------
    lines.push(['name', aCustomer.name]);
    lines.push(['location', aCustomer.location]);
    return lines;
}
//before-------------------------------------------------------------
function gatherCustomerData(out, aCustomer) {
    out.push(['name', aCustomer.name]);
    out.push(['location', aCustomer.location]);
}
//重点在于始终小步前进。
//6.3 提炼变量（Extract Variable）-------------------------------------------------------------------------------------------
//曾用名：引入解释性变量（Introduce Explaining Variable）
//反向重构：内联变量（123）
//动机
//表达式有可能非常复杂而难以阅读。这种情况下，局部变量可以帮助我们将表达式分解为比较容易管理的形式。
//在面对一块复杂逻辑时，局部变量使我能给其中的一部分命名，这样我就能更好地理解这部分逻辑是要干什么。
//这样的变量在调试时也很方便，它们给调试器和打印语句提供了便利的抓手。
//如果我考虑使用提炼变量，就意味着我要给代码中的一个表达式命名。
//一旦决定要这样做，我就得考虑这个名字所处的上下文。
//如果这个名字只在当前的函数中有意义，那么提炼变量是个不错的选择；
//但如果这个变量名在更宽的上下文中也有意义，我就会考虑将其暴露出来，通常以函数的形式。
//如果在更宽的范围可以访问到这个名字，就意味着其他代码也可以用到这个表达式，
//而不用把它重写一遍，这样能减少重复，并且能更好地表达我的意图。
//“将新的名字暴露得更宽”的坏处则是需要额外的工作量。如果工作量很大，我会暂时搁下这个想法，
//稍后再用以查询取代临时变量（178）来处理它。但如果处理其他很简单，我就会立即动手，这样马上就可以使用这个新名字。
//有一个好的例子：如果我处理的这段代码属于一个类，对这个新的变量使用提炼函数（106）会很容易。
//做法
//···确认要提炼的表达式没有副作用。
//···声明一个不可修改的变量，把你想要提炼的表达式复制一份，以该表达式的结果值给这个变量赋值。
//···用这个新变量取代原来的表达式。
//···测试。
//如果该表达式出现了多次，请用这个新变量逐一替换，每次替换之后都要执行测试。
//范例
//我们从一个简单计算开始：
function price(order) {
    //price is base price - quantity discount + shipping
    return order.quantity * order.itemPrice - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + Math.min(order.quantity * order.itemPrice * 0.1, 100);
}
//1
function price(order) {
    //price is base price - quantity discount + shipping
    var basePrice = order.quantity * order.itemPrice;
    return basePrice - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + Math.min(basePrice * 0.1, 100);
}
//2
function price(order) {
    //price is base price - quantity discount + shipping
    var basePrice = order.quantity * order.itemPrice;
    var quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    return basePrice - quantityDiscount + Math.min(basePrice * 0.1, 100);
}
//3
function price(order) {
    var basePrice = order.quantity * order.itemPrice;
    var quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    var shipping = Math.min(basePrice * 0.1, 100);
    return basePrice - quantityDiscount + shipping;
}
//范例：在一个类中
var Order = /** @class */ (function () {
    function Order(aRecord) {
        this._data = aRecord;
    }
    Object.defineProperty(Order.prototype, "quantity", {
        get: function () {
            return this._data.quantity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "itemPrice", {
        get: function () {
            return this._data.itemPrice;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "price", {
        //before---------------------------------------------------------
        get: function () {
            return this.quantity * this.itemPrice - Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 + Math.min(this.quantity * this.itemPrice * 0.1, 100);
        },
        enumerable: false,
        configurable: true
    });
    return Order;
}());
//我要提炼的还是同样的变量，但我意识到：这些变量名所代表的概念，适用于整个 Order 类，
//而不仅仅是“计算价格”的上下文。既然如此，我更愿意将它们提炼成方法，而不是变量。
var Order = /** @class */ (function () {
    function Order(aRecord) {
        this._data = aRecord;
    }
    Object.defineProperty(Order.prototype, "quantity", {
        get: function () {
            return this._data.quantity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "itemPrice", {
        get: function () {
            return this._data.itemPrice;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "price", {
        //after------------------------------------------------------------
        get: function () {
            return this.basePrice - this.quantityDiscount + this.shipping;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "basePrice", {
        get: function () {
            return this.quantity * this.itemPrice;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "quantityDiscount", {
        get: function () {
            return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "shipping", {
        get: function () {
            return Math.min(this.basePrice * 0.1, 100);
        },
        enumerable: false,
        configurable: true
    });
    return Order;
}());
//这是对象带来的一大好处：它们提供了合适的上下文，方便分享相关的逻辑和数据。
//在如此简单的情况下，这方面的好处还不太明显；但在一个更大的类当中，如果能找出可以共用的行为，
//赋予它独立的概念抽象，给它起一个好名字，对于使用对象的人会很有帮助。
//6.4 内联变量（Inline Variable）------------------------------------------------------------------------------------------------------------------------
//曾用名：内联临时变量（Inline Temp）
//反向重构：提炼变量（119）
//动机
//在一个函数内部，变量能给表达式提供有意义的名字，因此通常变量是好东西。
//但有时候，这个名字并不比表达式本身更具表现力。还有些时候，变量可能会妨碍重构附近的代码。
//若果真如此，就应该通过内联的手法消除变量。
//做法
//···检查确认变量赋值语句的右侧表达式没有副作用。
//···如果变量没有被声明为不可修改，先将其变为不可修改，并执行测试。
//这是为了确保该变量只被赋值一次。
//···找到第一处使用该变量的地方，将其替换为直接使用赋值语句的右侧表达式。
//···测试。
//···重复前面两步，逐一替换其他所有使用该变量的地方。
//···删除该变量的声明点和赋值语句。
//···测试。
//范例
function inlineVariable() {
    //before-----------------------------------------
    var basePrice = anOrder.basePrice;
    return basePrice > 1000;
    //after-----------------------------------------
    return anOrder.basePrice > 1000;
}
//6.5 改变函数声明（Change Function Declaration）-----------------------------------------------------------------------------------------
//别名：函数改名（Rename Function）
//曾用名：函数改名（Rename Method）
//曾用名：添加参数（Add Parameter）
//曾用名：移除参数（Remove Parameter）
//别名：修改签名（Change Signature）
//##动机
//函数是我们将程序拆分成小块的主要方式。函数声明则展现了如何将这些小块组合在一起工作——可以说，它们就是软件系统的关节。
//和任何构造体一样，系统的好坏很大程度上取决于关节。
//好的关节使得给系统添加新部件很容易；
//而糟糕的关节则不断招致麻烦，让我们难以看清软件的行为，当需求变化时难以找到合适的地方进行修改。
//还好，软件是软的，我可以改变这些关节，只是要小心修改。
//一个好名字能让我一眼看出函数的用途，而不必查看其实现代码。
//如果我看到一个函数的名字不对，一旦发现了更好的名字，就得尽快给函数改名。
//这样，下一次再看到这段代码时，我就不用再费力搞懂其中到底在干什么。
//（有一个改进函数名字的好办法：先写一句注释描述这个函数的用途，再把这句注释变成函数的名字。）
//减少模块彼此之间的信息依赖，当我要做出修改时就能减轻我大脑的负担
//##做法
//在进行此重构时，我会查看变更的范围，自问是否能一步到位地修改函数声明及其所有调用者。
//如果可以，我就采用简单的做法。
//迁移式的做法让我可以逐步修改调用方代码，如果函数被很多地方调用，或者修改不容易，
//或者要修改的是一个多态函数，或者对函数声明的修改比较复杂，能渐进式地逐步修改就很重要。
//##简单的做法
//···如果想要移除一个参数，需要先确定函数体内没有使用该参数。
//···修改函数声明，使其成为你期望的状态。
//···找出所有使用旧的函数声明的地方，将它们改为使用新的函数声明。
//···测试。
//最好能把大的修改拆成小的步骤，所以如果你既想修改函数名，又想添加参数，最好分成两步来做。
//（并且，不论何时，如果遇到了麻烦，请撤销修改，并改用迁移式做法。）
//##迁移式做法
//···如果有必要的话，先对函数体内部加以重构，使后面的提炼步骤易于开展。
//···使用提炼函数（106）将函数体提炼成一个新函数。
//如果你打算沿用旧函数的名字，可以先给新函数起一个易于搜索的临时名字。
//···如果提炼出的函数需要新增参数，用前面的简单做法添加即可。
//···测试。
//···对旧函数使用内联函数（115）。
//···如果新函数使用了临时的名字，再次使用改变函数声明（124）将其改回原来的名字。
//···测试。
//如果要重构的函数属于一个具有多态性的类，那么对于该函数的每个实现版本，你都需要通过“提炼出一个新函数”的方式添加一层间接，
//并把旧函数的调用转发给新函数。如果该函数的多态性是在一个类继承体系中体现，
//那么只需要在超类上转发即可；如果各个实现类之间并没有一个共同的超类，那么就需要在每个实现类上做转发。
//如果要重构一个已对外发布的 API，在提炼出新函数之后，你可以暂停重构，将原来的函数声明为“不推荐使用”（deprecated），
//然后给客户端一点时间转为使用新函数。等你有信心所有客户端都已经从旧函数迁移到新函数，再移除旧函数的声明。
//##范例：函数改名（简单做法）
//找出所有调用者，修改函数声明，然后修改调用者。
//最好是能分步骤修改：如果既想给函数改名，又想添加参数，我会先完成改名，测试，然后添加参数，然后再次测试。
//##范例：函数改名（迁移式做法）
//首先要对整个函数体使用提炼函数（106）：
//before----------------------------------------------------------
function circum(radius) {
    return 2 * Math.PI * radius;
}
//after-----------------------------------------------------------
function circum(radius) {
    return circumference(radius);
}
function circumference(radius) {
    return 2 * Math.PI * radius;
}
//此时我要执行测试，然后对旧函数使用内联函数（115）：找出所有调用旧函数的地方，将其改为调用新函数。
//每次修改之后都可以执行测试，这样我就可以小步前进，每次修改一处调用者。所有调用者都修改完之后，我就可以删除旧函数。
//大多数重构手法只用于修改我有权修改的代码，但这个重构手法同样适用于已发布 API——使用这些 API 的代码我无权修改。
//以上面的代码为例，创建出 circumference 函数之后，我就可以暂停重构，并（如果可以的话）将 circum 函数标记为 deprecated。
//然后我就耐心等待客户端改用 circumference 函数，等他们都改完了，我再删除 circum 函数。
//即便永远也抵达不了“删除 circum 函数”这个快乐的终点，至少新代码有了一个更好的名字。
//##范例：添加参数
//首先，我用提炼函数（106）把 addReservation 的函数体提炼出来，放进一个新函数。
//这个新函数最终会叫 addReservation，但新旧两个函数不能同时占用这个名字，所以我会先给新函数起一个容易搜索的临时名字。
//然后我会在新函数的声明中增加参数，同时修改旧函数中调用新函数的地方（也就是采用简单做法完成这一步）。
//在修改调用方之前，我喜欢利用 JavaScript 的语言特性先应用引入断言（302），确保调用方一定会用到这个新参数。
//现在，我可以对源函数使用内联函数（115），使其调用者转而使用新函数。这样我可以每次只修改一个调用者。
//现在我就可以把新函数改回原来的名字了。一般而言，此时用简单做法就够了；但如果有必要，也可以再用一遍迁移式做法。
var Book = /** @class */ (function () {
    function Book() {
        this._reservations = [];
    }
    //before-----------------------------
    // addReservation(customer){
    //   this._reservations.push(customer);
    // }
    //after------------------------------
    Book.prototype.addReservation = function (customer) {
        this.zz_addReservation(customer, false);
    };
    Book.prototype.zz_addReservation = function (customer, isPriority) {
        console.assert(isPriority === true || isPriority === false);
        this._reservations.push(customer);
    };
    return Book;
}());
//##范例：把参数改为属性
//before---------------------------------------------
function inNewEngland(aCustomer) {
    return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(aCustomer.address.state);
}
//after---------------------------------------------
function inNewEngland(aCustomer) {
    return xxNEWinNewEngland(aCustomer.address.state);
}
function xxNEWinNewEngland(stateCode) {
    return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}
//6.6 封装变量（Encapsulate Variable）---------------------------------------------------------------------------------
//曾用名：自封装字段（Self-Encapsulate Field）
//曾用名：封装字段（Encapsulate Field）
//##动机
//重构的作用就是调整程序中的元素。函数相对容易调整一些，因为函数只有一种用法，就是调用。
//数据就要麻烦得多，因为没办法设计这样的转发机制。
//如果我把数据搬走，就必须同时修改所有引用该数据的代码，否则程序就不能运行。
//如果数据的可访问范围很小，比如一个小函数内部的临时变量，那还不成问题。
//但如果可访问范围变大，重构的难度就会随之增大，这也是说全局数据是大麻烦的原因。
//所以，如果想要搬移一处被广泛使用的数据，最好的办法往往是先以函数形式封装所有对该数据的访问。
//这样，我就能把“重新组织数据”的困难任务转化为“重新组织函数”这个相对简单的任务。
//封装数据的价值还不止于此。封装能提供一个清晰的观测点，可以由此监控数据的变化和使用情况；
//我还可以轻松地添加数据被修改时的验证或后续逻辑。
//我的习惯是：对于所有可变的数据，只要它的作用域超出单个函数，我就会将其封装起来，只允许通过函数访问。
//数据的作用域越大，封装就越重要。
//处理遗留代码时，一旦需要修改或增加使用可变数据的代码，
//我就会借机把这份数据封装起来，从而避免继续加重耦合一份已经广泛使用的数据。
//面向对象方法如此强调对象的数据应该保持私有（private），背后也是同样的原理。
//每当看见一个公开（public）的字段时，我就会考虑使用封装变量
//（在这种情况下，这个重构手法常被称为封装字段）来缩小其可见范围。
//封装数据很重要，不过，不可变数据更重要。
//如果数据不能修改，就根本不需要数据更新前的验证或者其他逻辑钩子。
//我可以放心地复制数据，而不用搬移原来的数据——这样就不用修改使用旧数据的代码，
//也不用担心有些代码获得过时失效的数据。不可变性是强大的代码防腐剂。
//##做法
//···创建封装函数，在其中访问和更新变量值。
//···执行静态检查。
//···逐一修改使用该变量的代码，将其改为调用合适的封装函数。每次替换之后，执行测试。
//···限制变量的可见性。
//有时没办法阻止直接访问变量。若果真如此，可以试试将变量改名，再执行测试，找出仍在直接使用该变量的代码。
//···测试。
//···如果变量的值是一个记录，考虑使用封装记录（162）。
//##范例
function encapsulateVariable() {
    //before--------------------------------------------------------------
    var defaultOwner = { firstName: 'Martin', lastName: 'Fowler' };
    var spaceship = {
        owner: { firstName: '', lastName: '' }
    };
    spaceship.owner = defaultOwner;
    defaultOwner = { firstName: 'Rebecca', lastName: 'Parsons' };
    //after---------------------------------------------------------------
    //首先我要定义读取和写入这段数据的函数，给它做个基础的封装。
    function getDefaultOwner() {
        return defaultOwner;
    }
    function setDefaultOwner(arg) {
        defaultOwner = arg;
    }
    //每看见一处引用该数据的代码，就将其改为调用取值函数。
    spaceship.owner = getDefaultOwner();
    //每看见一处给变量赋值的代码，就将其改为调用设值函数。
    setDefaultOwner({ firstName: 'Rebecca', lastName: 'Parsons' });
    //每次替换之后，执行测试。
    //处理完所有使用该变量的代码之后，我就可以限制它的可见性。
    //这一步的用意有两个，一来是检查是否遗漏了变量的引用，二来可以保证以后的代码也不会直接访问该变量。
    //分离文件defaultOwner.js
    var defaultOwnerData = { firstName: 'Martin', lastName: 'Fowler' };
    export function getdefaultOwner() {
        return defaultOwnerData;
    }
    export function setDefaultOwner(arg) {
        defaultOwnerData = arg;
    }
}
//##封装值
//前面的基本重构手法只封装了对最外层数据的引用。很多时候这已经足够了。
//但也有很多时候，我需要把封装做得更深入，不仅控制对变量引用的修改，还要控制对变量内容的修改。
//这有两个办法可以做到。最简单的办法是禁止对数据结构内部的数值做任何修改。
//我最喜欢的一种做法是修改取值函数，使其返回该数据的一份副本。
var defaultOwnerData = { firstName: 'Martin', lastName: 'Fowler' };
function defaultOwner() {
    return Object.assign({}, defaultOwnerData);
}
exports.defaultOwner = defaultOwner;
//封装记录
function sealRecord() {
    var defaultOwnerData = { firstName: 'Martin', lastName: 'Fowler' };
    export function defaultOwner() {
        return new Person(defaultOwnerData);
    }
    export function setDefaultOwner(arg) {
        defaultOwnerData = arg;
    }
    var Person = /** @class */ (function () {
        function Person(data) {
            this._lastName = data.lastName;
            this._firstName = data.firstName;
        }
        Object.defineProperty(Person.prototype, "lastName", {
            get: function () {
                return this._lastName;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Person.prototype, "firstName", {
            get: function () {
                return this._firstName;
            },
            enumerable: false,
            configurable: true
        });
        return Person;
    }());
}
//数据封装很有价值，但往往并不简单。
//到底应该封装什么，以及如何封装，取决于数据被使用的方式，以及我想要修改数据的方式。
//不过，一言以蔽之，数据被使用得越广，就越是值得花精力给它一个体面的封装。
//6.7 变量改名（Rename Variable）--------------------------------------------------------------------------------------
//##动机
//好的命名是整洁编程的核心。变量可以很好地解释一段程序在干什么。
//对于作用域超出一次函数调用的字段，则需要更用心命名。这是我最花心思的地方。
//##机制
//···如果变量被广泛使用，考虑运用封装变量（132）将其封装起来。
//···找出所有使用该变量的代码，逐一修改。
//如果在另一个代码库中使用了该变量，这就是一个“已发布变量”（published variable），此时不能进行这个重构。
//如果变量值从不修改，可以将其复制到一个新名字之下，然后逐一修改使用代码，每次修改后执行测试。
//···测试。
//##范例
//如果变量的作用域不止于单个函数，问题就会出现。代码库的各处可能有很多地方使用它：
var tpHd = 'untitled';
//有些地方是在读取变量值：
result += "<h1>" + tpHd + "</h1>";
//另一些地方则更新它的值：
tpHd = obj['articleTitle'];
//对于这种情况，我通常的反应是运用封装变量（132）：
result += "<h1>" + title() + "</h1>";
setTitle(obj['articleTitle']);
function title() {
    return tpHd;
}
function setTitle(arg) {
    tpHd = arg;
}
//现在就可以给变量改名：
var _title = 'untitled';
function title() {
    return _title;
}
function setTitle(arg) {
    _title = arg;
}
//包装函数内联：
var title = getTitle();
function getTitle() {
    return 'untitled';
}
//如果这个变量被广泛使用，以至于我感到需要先做封装才敢改名，那就有必要保持这个状态，将变量封装在函数后面。
//如果我确实想内联，在重构过程中，我就会将取值函数命名为 getTitle，并且其中的变量名也不会以下划线开头。
//##给常量改名
//如果我想改名的是一个常量（或者在客户端看来就像是常量的元素），我可以复制这个常量，这样既不需要封装，又可以逐步完成改名。
var cpyNm = 'Acme Gooseberries';
//复制这个常量：
var companyName = 'Acme Gooseberries';
var cpyNm = companyName;
//有了这个副本，我就可以逐一修改引用旧常量的代码，使其引用新的常量。
//全部修改完成后，我会删掉旧的常量。我喜欢先声明新的常量名，然后把新常量复制给旧的名字。
//这样最后删除旧名字时会稍微容易一点，如果测试失败，再把旧常量放回来也稍微容易一点。
//这个做法不仅适用于常量，也同样适用于客户端只能读取的变量（例如 JavaScript 模块中导出的变量）。
//6.8 引入参数对象（Introduce Parameter Object）-----------------------------------------------------------------------
//##动机
//我常会看见，一组数据项总是结伴同行，出没于一个又一个函数。
//这样一组数据就是所谓的数据泥团，我喜欢代之以一个数据结构。
//将数据组织成结构是一件有价值的事，因为这让数据项之间的关系变得明晰。
//使用新的数据结构，参数的参数列表也能缩短。
//并且经过重构之后，所有使用该数据结构的函数都会通过同样的名字来访问其中的元素，从而提升代码的一致性。
//但这项重构真正的意义在于，它会催生代码中更深层次的改变。
//一旦识别出新的数据结构，我就可以重组程序的行为来使用这些结构。
//我会创建出函数来捕捉围绕这些数据的共用行为——可能只是一组共用的函数，也可能用一个类把数据结构与使用数据的函数组合起来。
//这个过程会改变代码的概念图景，将这些数据结构提升为新的抽象概念，可以帮助我更好地理解问题域。
//果真如此，这个重构过程会产生惊人强大的效用——但如果不用引入参数对象开启这个过程，后面的一切都不会发生。
//##做法
//···如果暂时还没有一个合适的数据结构，就创建一个。
//我倾向于使用类，因为稍后把行为放进来会比较容易。我通常会尽量确保这些新建的数据结构是值对象
//···测试。
//···使用改变函数声明（124）给原来的函数新增一个参数，类型是新建的数据结构。
//···测试。
//···调整所有调用者，传入新数据结构的适当实例。每修改一处，执行测试。
//···用新数据结构中的每项元素，逐一取代参数列表中与之对应的参数项，然后删除原来的参数。测试。
//##范例
function introduceParameterObject() {
    //一组数据
    var station = {
        name: 'ZB1',
        readings: [
            { temp: 47, time: '2016-11-10 09:10' },
            { temp: 53, time: '2016-11-10 09:20' },
            { temp: 58, time: '2016-11-10 09:30' },
            { temp: 53, time: '2016-11-10 09:40' },
            { temp: 51, time: '2016-11-10 09:50' },
        ]
    };
    //调用函数
    function readingsOutsideRange(station, min, max) {
        return station.readings.filter(function (r) { return r.temp < min || r.temp > max; });
    }
    //调用方
    alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);
    // 首先为要组合的数据声明一个类：
    var NumberRange = /** @class */ (function () {
        function NumberRange(min, max) {
            this._data = { min: min, max: max };
        }
        NumberRange.prototype.contains = function (arg) {
            return arg >= this._data.min && arg <= this._data.max;
        };
        Object.defineProperty(NumberRange.prototype, "min", {
            get: function () {
                return this._data.min;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NumberRange.prototype, "max", {
            get: function () {
                return this._data.max;
            },
            enumerable: false,
            configurable: true
        });
        return NumberRange;
    }());
    //然后我会运用改变函数声明（124），把新的对象作为参数传给 readingsOutsideRange。
    function readingsOutsideRange(station, min, max, range) {
        return station.readings.filter(function (r) { return r.temp < min || r.temp > max; });
    }
    //随后，我会挨个找到函数的调用处，传入合适的温度范围。
    var range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);
    alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling, range);
    //现在我可以开始修改使用参数的代码了。
    alerts = readingsOutsideRange(station, range);
    function readingsOutsideRange(station, range) {
        return station.readings.filter(function (r) { return r.temp < range.min || r.temp > range.max; });
    }
    //这项重构手法到这儿就完成了。不过，将一堆参数替换成一个真正的对象，这只是长征第一步。
    //创建一个类是为了把行为搬移进去。在这里，我可以给“范围”类添加一个函数，用于测试一个值是否落在范围之内。
    function readingsOutsideRange(station, range) {
        return station.readings.filter(function (r) { return !range.contains(r.temp); });
    }
}
//一旦识别出“范围”这个概念，那么每当我在代码中发现“最大/最小值”这样一对数字时，我就会考虑是否可以将其改为使用“范围”类。
//（例如，我马上就会考虑把“运作计划”类中的 temperatureFloor 和 temperatureCeiling 替换为 temperatureRange。）
//在观察这些成对出现的数字如何被使用时，我会发现一些有用的行为，并将其搬移到“范围”类中，简化其使用方法。
//比如，我可能会先给这个类加上“基于数值判断相等性”的函数，使其成为一个真正的值对象。
//6.9 函数组合成类（Combine Functions into Class）----------------------------------------------------------------------------------
function base(aReading) { }
function taxableCharge(aReading) { }
function calculateBaseCharge(aReading) { }
var Reading = /** @class */ (function () {
    function Reading() {
    }
    Reading.prototype.base = function () { };
    Reading.prototype.taxableCharge = function () { };
    Reading.prototype.calculateBaseCharge = function () { };
    return Reading;
}());
//##动机
//##做法
//···运用封装记录（162）对多个函数共用的数据记录加以封装。
//如果多个函数共用的数据还未组织成记录结构，则先运用引入参数对象（140）将其组织成记录。
//···对于使用该记录结构的每个函数，运用搬移函数（198）将其移入新类。
//如果函数调用时传入的参数已经是新类的成员，则从参数列表中去除之。
//···用以处理该数据记录的逻辑可以用提炼函数（106）提炼出来，并移入新类。
//##范例
