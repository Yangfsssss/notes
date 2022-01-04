import { APerformance, Invoice, Play, Plays, StatementData } from './type';

class PerformanceCalculator {
	public performance: APerformance;
	public play: Play;
	public volumeCredits: number;

	constructor(aPerformance: APerformance, aPlay: Play) {
		this.performance = aPerformance;
		this.play = aPlay;
	}

	// get amount() {}

	get volumeCredit() {
		return Math.max(this.performance.audience - 30, 0);
	}
}

//---------------------------------------------------------------------------------------------
class TragedyCalculator extends PerformanceCalculator {
	get amount() {
		let result = 40000;

		if (this.performance.audience > 30) {
			result += 1000 * (this.performance.audience - 30);
		}

		return result;
	}
}

class ComedyCalculator extends PerformanceCalculator {
	get amount() {
		let result = 30000;

		if (this.performance.audience > 20) {
			result += 10000 * (this.performance.audience - 20);
		}

		result += 300 * this.performance.audience;

		return result;
	}

	get volumeCredit() {
		return super.volumeCredit + Math.floor(this.performance.audience / 5);
	}
}

//---------------------------------------------------------------------------------------------
export default function createStatementData(invoice: Invoice, plays: Plays) {
	const statementData = {} as StatementData;

	statementData.customer = invoice.customer;
	statementData.performances = invoice.performances.map(enrichPerformances);
	statementData.totalAmount = totalAmount(statementData);
	statementData.totalVolumeCredits = totalVolumeCredits(statementData);

	return statementData;

	function enrichPerformances(aPerformance: APerformance) {
		const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));

		const result = Object.assign({}, aPerformance);
		result.play = calculator.play;
		// result.play = playFor(result);
		result.amount = calculator.amount;
		result.volumeCredits = calculator.volumeCredits;
		return result;
	}

	function playFor(aPerformance: APerformance): Play {
		return plays[aPerformance.playID];
	}

	// function amountFor(aPerformance: APerformance) {}

	// function volumeCreditsFor(aPerformance: APerformance) {}

	function totalAmount(data) {
		return data.performances.reduce((total, p) => total + p.amount, 0);
	}

	function totalVolumeCredits(data) {
		return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
	}

	function createPerformanceCalculator(aPerformance: APerformance, aPlay: Play) {
		switch (aPlay.type) {
			case 'tragedy': {
				return new TragedyCalculator(aPerformance, aPlay);
			}
			case 'comedy': {
				return new ComedyCalculator(aPerformance, aPlay);
			}
			default:
				throw new Error(`unknown type: ${aPlay.type}`);
		}
	}
}
