"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var PerformanceCalculator = /** @class */ (function () {
    function PerformanceCalculator(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }
    Object.defineProperty(PerformanceCalculator.prototype, "volumeCredit", {
        // get amount() {}
        get: function () {
            return Math.max(this.performance.audience - 30, 0);
        },
        enumerable: false,
        configurable: true
    });
    return PerformanceCalculator;
}());
//---------------------------------------------------------------------------------------------
var TragedyCalculator = /** @class */ (function (_super) {
    __extends(TragedyCalculator, _super);
    function TragedyCalculator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TragedyCalculator.prototype, "amount", {
        get: function () {
            var result = 40000;
            if (this.performance.audience > 30) {
                result += 1000 * (this.performance.audience - 30);
            }
            return result;
        },
        enumerable: false,
        configurable: true
    });
    return TragedyCalculator;
}(PerformanceCalculator));
var ComedyCalculator = /** @class */ (function (_super) {
    __extends(ComedyCalculator, _super);
    function ComedyCalculator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ComedyCalculator.prototype, "amount", {
        get: function () {
            var result = 30000;
            if (this.performance.audience > 20) {
                result += 10000 * (this.performance.audience - 20);
            }
            result += 300 * this.performance.audience;
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComedyCalculator.prototype, "volumeCredit", {
        get: function () {
            return _super.prototype.volumeCredit + Math.floor(this.performance.audience / 5);
        },
        enumerable: false,
        configurable: true
    });
    return ComedyCalculator;
}(PerformanceCalculator));
//---------------------------------------------------------------------------------------------
function createStatementData(invoice, plays) {
    var statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformances);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;
    function enrichPerformances(aPerformance) {
        var calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        var result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        // result.play = playFor(result);
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }
    // function amountFor(aPerformance: APerformance) {}
    // function volumeCreditsFor(aPerformance: APerformance) {}
    function totalAmount(data) {
        return data.performances.reduce(function (total, p) { return total + p.amount; }, 0);
    }
    function totalVolumeCredits(data) {
        return data.performances.reduce(function (total, p) { return total + p.volumeCredits; }, 0);
    }
    function createPerformanceCalculator(aPerformance, aPlay) {
        switch (aPlay.type) {
            case 'tragedy': {
                return new TragedyCalculator(aPerformance, aPlay);
            }
            case 'comedy': {
                return new ComedyCalculator(aPerformance, aPlay);
            }
            default:
                throw new Error("unknown type: " + aPlay.type);
        }
    }
}
exports["default"] = createStatementData;
