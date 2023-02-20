const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  } 
  if (req.url.endsWith('.js')) {
    fs.readFile('.' + req.url, 'utf8', (err, data) => {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.end(data);
    });
  }
  if (req.url.endsWith('.css')) {
    fs.readFile('.' + req.url, 'utf8', (err, data) => {
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    });
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});