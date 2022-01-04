"use strict";
exports.__esModule = true;
// const { Province, Producer, sampleProvinceData } = require('./Chapter4');
var Chapter4_1 = require("./Chapter4");
// import exportData from './Chapter4';
//4.3 第一个测试-----------------------------------------------------------------------------------------------------
describe('province', function () {
    var asia;
    beforeEach(function () {
        asia = new Chapter4_1.Province(Chapter4_1.sampleProvinceData());
    });
    it('shortfall', function () {
        expect(asia.shortfall).toBe(5);
    });
    //4.4 再添加一个测试-------------------------------------------------------------------------------------------------
    it('profit', function () {
        expect(asia.profit).toBe(230);
    });
    //4.5 修改测试夹具--------------------------------------------------------------------------------------------------
    it('change production', function () {
        asia.producers[0].production = 20;
        expect(asia.shortfall).toBe(-6);
        expect(asia.profit).toBe(292);
    });
    it('zero demand', function () {
        asia.demand = 0;
        expect(asia.shortfall).toBe(-25);
        expect(asia.profit).toBe(0);
    });
    it('negative demand', function () {
        asia.demand = -1;
        expect(asia.shortfall).toBe(-26);
        expect(asia.profit).toBe(-10);
    });
    it('empty string demand', function () {
        asia.demand = '';
        expect(asia.shortfall).toBe(NaN);
        expect(asia.profit).toBe(NaN);
    });
});
describe('no producers', function () {
    var noProducers;
    beforeEach(function () {
        var data = {
            name: 'No producers',
            producers: [],
            demand: 30,
            price: 20
        };
        noProducers = new Chapter4_1.Province(data);
    });
    it('shortfall', function () {
        expect(noProducers.shortfall).toBe(30);
    });
    it('profit', function () {
        expect(noProducers.profit).toBe(0);
    });
});
describe('string for producers', function () {
    it('', function () {
        var data = {
            name: 'String producers',
            producers: '',
            demand: 30,
            price: 20
        };
        var province = new Chapter4_1.Province(data);
        expect(province.shortfall).toBe(0);
    });
});
