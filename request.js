const https = require('axios');

https({
    method: 'post',
    url: 'http://localhost:8080/tokens',
    headers: {
        'Content-Type': 'application/json',
    },
    data: {
        name: 'Vlad',
        password: '456',
    },
})
.then(response => {
  console.log(response.data);
})
.catch(err => {
    console.log('error >>>> ', err)
});