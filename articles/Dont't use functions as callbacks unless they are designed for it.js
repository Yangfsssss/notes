"use strict";
//------------------------------------------------------------------------------------
function oneArg(arg1) {
    console.log(arg1);
}
oneArg('hello', 'world');
function twoArg(cb) {
    cb('hello', 'world');
}
twoArg(oneArg);
//------------------------------------------------------------------------------------
function toReadableNumber(num1, num2) {
    return '';
}
var readableNumbers = [1, 2, 3].map(toReadableNumber);
function aFunc(str, options) {
    if (typeof options.valueOf === 'function') {
        console.log('5577');
    }
    console.log('7799');
}
aFunc('str', { optionA: true });
