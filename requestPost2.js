const https = require('axios');

https({
    method: 'post',
    url: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
        'WhatWillSaveTheWorld': 'Love',
    },
})
.then(res => {
    console.log(res.data)
})
.catch(err => {
    console.log('error >>>> ', err)
});