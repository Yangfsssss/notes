import { info } from 'console';
import http from 'http';
import { fork } from 'child_process';

const server = http.createServer((req, res) => {
  if (req.url === '/get-sum') {
    console.info('主进程 id', process.pid);

    //开启子进程
    const computeProcess = fork('./compute.js');
    computeProcess.send('start computing');

    computeProcess.on('message', (data) => {
      info('主进程接收到的信息：', data);
      res.end('sum is ' + data);
    });

    computeProcess.on('close', () => {
      info('子进程因报错而退出');
      computeProcess.kill();
    });
  }
});

server.listen(8881, () => {
  info('localhost:8881');
});
