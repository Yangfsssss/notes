"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const http_1 = __importDefault(require("http"));
const child_process_1 = require("child_process");
const server = http_1.default.createServer((req, res) => {
    if (req.url === '/get-sum') {
        console.info('主进程 id', process.pid);
        //开启子进程
        const computeProcess = (0, child_process_1.fork)('./compute.js');
        computeProcess.send('start computing');
        computeProcess.on('message', (data) => {
            (0, console_1.info)('主进程接收到的信息：', data);
            res.end('sum is ' + data);
        });
        computeProcess.on('close', () => {
            (0, console_1.info)('子进程因报错而退出');
            computeProcess.kill();
        });
    }
});
server.listen(8881, () => {
    (0, console_1.info)('localhost:8881');
});
