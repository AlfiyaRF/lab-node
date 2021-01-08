const https = require('axios');

https({
    method: 'post',
    url: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
        'IKnowYourSecret': 'TheOwlsAreNotWhatTheySeem',
    },
    params: {
        name: 'Name',
    },
})
.then(res => {
    console.log(res.data)
})
.catch(err => {
    console.log('error >>>> ', err)
});