/**
 * @description: for sharedWorker
 * @author:Yang
 */

const set = new Set();
console.log('worker.js rendered');

onconnect = event => {
  const port = event.ports[0];
  set.add(port);

  // 接收信息
  port.onmessage = e => {
    // 广播消息
    set.forEach(p => {
      if(p === port) return;
      p.postMessage(e.data);
    })
  }

  // 发送信息
  port.postMessage('worker.js done')
}