const http = require('http');

const options = {
  hostname: 'localhost',
  port: '8080',
  path: '/',
  method: 'GET',
  headers: {'Content-Type': 'text/plain'}
};

const request = http.request(options, response => {
  let data = '';

  response.on('data', d => {
    data += d
  })
  response.on('end', () => {
    console.log(data)
  })
});

request.on('error', error => {
  console.error(error)
});

request.end();