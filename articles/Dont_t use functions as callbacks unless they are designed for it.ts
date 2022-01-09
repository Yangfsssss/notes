

//------------------------------------------------------------------------------------
function oneArg(arg1: string) {
	console.log(arg1);
}

oneArg('hello', 'world');

function twoArg(cb: (arg1: string, arg: string) => void) {
	cb('hello', 'world');
}

twoArg(oneArg);

//------------------------------------------------------------------------------------
function toReadableNumber(num1: number, num2: string): string {
	return '';
}

const readableNumbers = [1, 2, 3].map(toReadableNumber);

//------------------------------------------------------------------------------------
interface AFuncOptions {
	optionA: boolean;
	valueOf?: (value: any) => any;
}

function aFunc(str: string, options: AFuncOptions) {
	if (typeof options.valueOf === 'function') {
		console.log('5577');
	}

	console.log('7799');
}

aFunc('str', { optionA: true });
