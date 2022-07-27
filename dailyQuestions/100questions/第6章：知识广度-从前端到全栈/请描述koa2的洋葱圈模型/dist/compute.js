"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
/**
 * @description: 子进程，计算
 * @author: Yang
 */
function getSum() {
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
        sum += i;
    }
    return sum;
}
process.on('message', (data) => {
    (0, console_1.info)('子进程 id', process.pid);
    (0, console_1.info)('子进程接收到的信息', data);
    const sum = getSum();
    //发送消息给主进程
    process.send(sum);
});
