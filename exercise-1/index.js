const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { HOST_NAME, PORT } = process.env;

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

server.listen(PORT, HOST_NAME, () => {
  console.log(`Server running at http://${HOST_NAME}:${PORT}/`);
});
