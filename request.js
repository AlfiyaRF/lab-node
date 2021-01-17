const https = require('axios');

https({
    method: 'post',
    url: 'http://localhost:8080/tokens',
    headers: {
        'Content-Type': 'application/json',
    },
    data: {
        name: 'Ivan',
        password: '456',
    },
})
.then(res => {
  if (res.data) {
    https({
      method: 'post',
      url: 'http://localhost:8080/accesses',
      headers: {
          'Content-Type': 'application/json',
          'token': res.data,
      },
    })
    .then(response => {
      console.log(response.data);
    });
  }
})
.catch(err => {
    console.log('error >>>> ', err)
});

https({
  method: 'post',
    url: 'http://localhost:8080/accesses',
    headers: {
        'Content-Type': 'application/json',
        'token': 'token456',
    }
})
.then(res => {
  console.log(res.data);
})
.catch(err => {
  console.log('error >>>> ', err)
});