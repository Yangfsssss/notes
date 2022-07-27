const { WebSocketServer }  = require('ws');

const wsServer = new WebSocketServer({ port: 8881 });

const list = new Set();


wsServer.on('connection', (currentWs) => {
  console.info('connected');

  // 这里不能一直被add，实际使用中，这里应该有一些清理缓存的机制。
  // 长期用不到的ws要被delete掉。
  list.add(currentWs);

  currentWs.on('message', (message) => {
    console.info('收到了信息:', message.toString());

    // 传递给其他客户端
    list.forEach(ws =>{
      if(ws === currentWs) return;
      ws.send(message.toString());
    })
  });
});
