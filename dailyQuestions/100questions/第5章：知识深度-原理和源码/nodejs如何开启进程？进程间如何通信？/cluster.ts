import { info } from 'console';
import http from 'http';
const cpuCoreLength = require('os').cpus().length;
import cluster from 'cluster';

if (cluster.isMaster) {
  for (let i = 0; i < cpuCoreLength; i++) {
    cluster.fork(); // 开启子进程
  }

  cluster.on('exit', (worker, code, signal) => {
    info('子进程退出');
    cluster.fork(); // 进程守护
  });
} else {
  // 多个子进程会共享一个TCP连接，提供一个网络服务
  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('done');
  });

  server.listen(8881);
}

// 工作中使用PM2
