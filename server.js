var net = require('net');
const http = require('http');

const BOUNDARY = 'i_am_boundary';
let clientArr = {};

// http server
const getHandler = (req, res) => {
  const id = 'id_' + Date.now().toString() + Math.random().toString().substring(2);
  res.on('close', () => {
    delete clientArr[id];
    res.end();
    console.log('a conection terminated');
  });
  clientArr[id] = res;
  res.writeHead(200, { 'Content-Type': `multipart/x-mixed-replace; boundary="${BOUNDARY}"` });
}

const emit = (res, data) => {
  res.write(`--${BOUNDARY}\nContent-Type: image/jpg\nContent-length: ${data.length}\n\n`);
  res.write(data);
}

const httpServer = http.createServer((req, res) => {
  if(req.method === 'GET') {
    getHandler(req, res);
  }
});


httpServer.listen(8080, '0.0.0.0')

// tcp server
var server = net.createServer(function(socket) {
  socket.on('data', function(data) {
    Object.keys(clientArr).map(function(objectKey, index) {
      let res = clientArr[objectKey];
      emit(res, data)
    });
  });

  socket.on('close', function() {
    console.log('socket closed');
  });
});

server.listen(53301, '0.0.0.0');
console.log('server is running');