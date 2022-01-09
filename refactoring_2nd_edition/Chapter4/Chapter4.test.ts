// const { Province, Producer, sampleProvinceData } = require('./Chapter4');
import { Province, Producer, sampleProvinceData } from './Chapter4';
// import exportData from './Chapter4';

//4.3 第一个测试-----------------------------------------------------------------------------------------------------
describe('province', () => {
	let asia;

	beforeEach(() => {
		asia = new Province(sampleProvinceData());
	});

	it('shortfall', () => {
		expect(asia.shortfall).toBe(5);
	});

	//4.4 再添加一个测试-------------------------------------------------------------------------------------------------
	it('profit', () => {
		expect(asia.profit).toBe(230);
	});

	//4.5 修改测试夹具--------------------------------------------------------------------------------------------------
	it('change production', () => {
		asia.producers[0].production = 20;

		expect(asia.shortfall).toBe(-6);
		expect(asia.profit).toBe(292);
	});

	it('zero demand', () => {
		asia.demand = 0;

		expect(asia.shortfall).toBe(-25);
		expect(asia.profit).toBe(0);
	});

	it('negative demand', () => {
		asia.demand = -1;

		expect(asia.shortfall).toBe(-26);
		expect(asia.profit).toBe(-10);
	});

	it('empty string demand', () => {
		asia.demand = '';

		expect(asia.shortfall).toBe(NaN);
		expect(asia.profit).toBe(NaN);
	});
});

describe('no producers', () => {
	let noProducers;

	beforeEach(() => {
		const data = {
			name: 'No producers',
			producers: [],
			demand: 30,
			price: 20,
		};

		noProducers = new Province(data);
	});

	it('shortfall', () => {
		expect(noProducers.shortfall).toBe(30);
	});

	it('profit', () => {
		expect(noProducers.profit).toBe(0);
	});
});

describe('string for producers', function () {
	it('', function () {
		const data = {
			name: 'String producers',
			producers: '',
			demand: 30,
			price: 20,
		};

		const province = new Province(data);
		expect(province.shortfall).toBe(0);
	});
});
