"use strict";
/** Chapter4：构筑测试体系 */
//重构是很有价值的工具，但只有重构还不行。
//要正确地进行重构，前提是得有一套稳固的测试集合，以帮我发现难以避免的疏漏。
exports.__esModule = true;
exports.Province = exports.Producer = exports.sampleProvinceData = void 0;
//我发现，编写优良的测试程序，可以极大提高我的编程速度，即使不进行重构也一样如此。
//这让我很吃惊，也违反许多程序员的直觉，所以我有必要解释一下这个现象。
//4.1 自测试代码的价值-----------------------------------------------------------------------------------------------------
//确保所有测试都完全自动化，让它们检查自己的测试结果。
//一套测试就是一个强大的 bug 侦测器，能够大大缩减查找 bug 所需的时间。
//(TDD)
//事实上，撰写测试代码的最好时机是在开始动手编码之前。当我需要添加特性时，我会先编写相应的测试代码。
//听起来离经叛道，其实不然。编写测试代码其实就是在问自己：为了添加这个功能，我需要实现些什么？
//编写测试代码还能帮我把注意力集中于接口而非实现（这永远是一件好事）。
//预先写好的测试代码也为我的工作安上一个明确的结束标志：一旦测试代码正常运行，工作就可以结束了。
//本书谈的是重构，而重构需要测试。如果你想重构，就必须编写测试。
//4.2 待测试的示例代码------------------------------------------------------------------------------------------------------
function sampleProvinceData() {
    return {
        name: 'Asia',
        producers: [
            { name: 'Byzantium', cost: 10, production: 9 },
            { name: 'Attalia', cost: 12, production: 10 },
            { name: 'Sinope', cost: 10, production: 6 },
        ],
        demand: 30,
        price: 20
    };
}
exports.sampleProvinceData = sampleProvinceData;
var Producer = /** @class */ (function () {
    function Producer(aProvince, data) {
        this._province = aProvince;
        this._cost = data.cost;
        this._name = data.name;
        this._production = data.production || 0;
    }
    Object.defineProperty(Producer.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "cost", {
        get: function () {
            return this._cost;
        },
        set: function (arg) {
            this._cost = typeof arg === 'string' ? parseInt(arg) : arg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "production", {
        get: function () {
            return this._production;
        },
        set: function (amountStr) {
            var amount = typeof amountStr === 'string' ? parseInt(amountStr) : amountStr;
            var newProduction = Number.isNaN(amount) ? 0 : amount;
            this._province.totalProduction += newProduction - this._production;
            this._production = newProduction;
        },
        enumerable: false,
        configurable: true
    });
    return Producer;
}());
exports.Producer = Producer;
var Province = /** @class */ (function () {
    function Province(doc) {
        var _this = this;
        this._name = doc.name;
        this._producers = [];
        this._totalProduction = 0;
        this._demand = doc.demand;
        this._price = doc.price;
        doc.producers.forEach(function (producer) { return _this.addProducer(new Producer(_this, producer)); });
    }
    Object.defineProperty(Province.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Province.prototype, "producers", {
        get: function () {
            return this._producers.slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Province.prototype, "totalProduction", {
        get: function () {
            return this._totalProduction;
        },
        set: function (arg) {
            this._totalProduction = arg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Province.prototype, "demand", {
        get: function () {
            return this._demand;
        },
        set: function (arg) {
            this._demand = typeof arg === 'string' ? parseInt(arg) : arg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Province.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (arg) {
            this._price = typeof arg === 'string' ? parseInt(arg) : arg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Province.prototype, "shortfall", {
        get: function () {
            return this._demand - this.totalProduction;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Province.prototype, "satisfiedDemand", {
        get: function () {
            return Math.min(this._demand, this.totalProduction);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Province.prototype, "demandValue", {
        get: function () {
            return this.satisfiedDemand * this.price;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Province.prototype, "demandCost", {
        get: function () {
            var remainingDemand = this.demand;
            var result = 0;
            this.producers
                .sort(function (a, b) { return a.cost - b.cost; })
                .forEach(function (producer) {
                var contribution = Math.min(remainingDemand, producer.production);
                remainingDemand -= contribution;
                result += contribution * producer.cost;
            });
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Province.prototype, "profit", {
        get: function () {
            return this.demandValue - this.demandCost;
        },
        enumerable: false,
        configurable: true
    });
    //see:https://www.typescriptlang.org/docs/handbook/2/classes.html
    Province.prototype.addProducer = function (arg) {
        this._producers.push(arg);
        this._totalProduction += arg.production;
    };
    return Province;
}());
exports.Province = Province;
var province = new Province(sampleProvinceData());
var producer = new Producer(province, { name: 'Sinope', cost: 10, production: 6 });
// console.log('province', province);
// console.log('producer', producer);
// const exportData = { Province, Producer, sampleProvinceData };
// export = Province
// export = { Province, Producer, sampleProvinceData };
// export default { Province, Producer, sampleProvinceData };
// export default exportData;
//4.3 第一个测试-------------------------------------------------------------------------------------------------------
//频繁地运行测试。对于你正在处理的代码，与其对应的测试至少每隔几分钟就要运行一次，每天至少运行一次所有的测试。
//4.4 再添加一个测试---------------------------------------------------------------------------------------------------
//如果尝试撰写过多测试，结果往往反而导致测试不充分。事实上，即使我只做一点点测试，也从中获益良多。
//测试的重点应该是那些我最担心出错的部分，这样就能从测试工作中得到最大利益。
//编写未臻完善的测试并经常运行，好过对完美测试的无尽等待。
//先随便填写一个期望值，再用程序产生的真实值来替换它，然后引入一个错误，最后恢复错误。
//共享测试夹具会使测试间产生交互，这是滋生 bug 的温床——还是你写测试时能遇见的最恶心的 bug 之一。
//beforeEach 块旨在告诉读者，我使用了同一套标准夹具。
//你可以接着阅读 describe 块里的所有测试，并知道它们都是基于同样的数据展开测试的。
//4.5 修改测试夹具--------------------------------------------------------------------------------------------------------
//作为一个基本规则，一个 it 语句中最好只有一个验证语句，否则测试可能在进行第一个验证时就失败，
//这通常会掩盖一些重要的错误信息，不利于你了解测试失败的原因。
//4.6 探测边界条件--------------------------------------------------------------------------------------------------------
//考虑可能出错的边界条件，把测试火力集中在那儿。
//你应该把测试集中在可能出错的地方。
//观察代码，看哪儿变得复杂；
//观察函数，思考哪些地方可能出错。
//是的，你的测试不可能找出所有 bug，但一旦进行重构，你可以更好地理解整个程序，
//从而找到更多 bug。虽然在开始重构之前我会确保有一个测试套件存在，但前进途中我总会加入更多测试
//不要因为测试无法捕捉所有的 bug 就不写测试，因为测试的确可以捕捉到大多数 bug。
//4.7 测试远不止如此------------------------------------------------------------------------------------------------------
//与编程的许多方面类似，测试也是一种迭代式的活动。
//除非你技能非常纯熟，或者非常幸运，否则你很难第一次就把测试写对。
//我发觉我持续地在测试集上工作，就与我在主代码库上的工作一样多。
//很自然，这意味着我在增加新特性时也要同时添加测试，有时还需要回顾已有的测试：
//它们足够清晰吗？我需要重构它们，以帮助我更好地理解吗？我拥有的测试是有价值的吗？
//一个值得养成的好习惯是，每当你遇见一个 bug，先写一个测试来清楚地复现它。
//仅当测试通过时，才视为 bug 修完。只要测试存在一天，我就知道这个错误永远不会再复现。
//这个 bug 和对应的测试也会提醒我思考：测试集里是否还有这样不被阳光照耀到的犄角旮旯？
//一个测试集是否足够好，最好的衡量标准其实是主观的，
//请你试问自己：如果有人在代码里引入了一个缺陷，你有多大的自信它能被测试集揪出来？
//测试同样可能过犹不及。测试写得太多的一个征兆是，
//相比要改的代码，我在改动测试上花费了更多的时间——并且我能感到测试就在拖慢我。
