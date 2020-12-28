const http = require('http');

const body = JSON.stringify({
    title: 'title',
});

const options = {
    hostname: 'localhost',
    port: '8080',
    path: '/',
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
      'WhatWillSaveTheWorld': 'Love',
    }
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

request.end(body);