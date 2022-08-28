const http = require('http');

// @ts-ignore
function serverCallback(req,res){
  console.log('url: ' + req.url);
  res.end('hello');
}

http.createServer(serverCallback).listen(8081);
console.log('监听 8081 端口');
