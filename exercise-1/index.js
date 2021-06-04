const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const reqFile = req.url.substr(1) || 'index.html';
  const filePath = path.join(__dirname, 'public', reqFile);

  fs.readFile(filePath, function (error, data) {
    if (error) {
      res.statusCode = 404;
      res.end('Not found');
    } else {
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
