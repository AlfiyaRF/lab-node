const axios = require('axios');

axios.post('http://localhost:8080/token', {
    headers: {
        'Content-Type': 'application/json',
    },
    username: 'Aleksandra_Manina@epam.com',
    password: 'Aleksandra_Manina',
})
.then(response => {
  const token = response.data;
  console.log(response.data);
  axios.get('http://localhost:8080/session', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
      console.error('error >>>> ', err)
    })
})
.catch(err => {
    console.error('error >>>> ', err)
});