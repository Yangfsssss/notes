"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const http_1 = __importDefault(require("http"));
const cpuCoreLength = require('os').cpus().length;
const cluster_1 = __importDefault(require("cluster"));
if (cluster_1.default.isMaster) {
    for (let i = 0; i < cpuCoreLength; i++) {
        cluster_1.default.fork(); // 开启子进程
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        (0, console_1.info)('子进程退出');
        cluster_1.default.fork(); // 进程守护
    });
}
else {
    // 多个子进程会共享一个TCP连接，提供一个网络服务
    const server = http_1.default.createServer((req, res) => {
        res.writeHead(200);
        res.end('done');
    });
    server.listen(8881);
}
// 工作中使用PM2
