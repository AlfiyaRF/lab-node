const md5 = require('md5');
const secret = 'TheSecretForJSONWebToken';

module.exports  = (name, password) => {
  const jwt = [
    { type: 'jwt', alg: 'md5' },
    { name, password },
    { signature: null },
  ];

  const token = jwt.map((section, index) => {
    const buff = Buffer.from(JSON.stringify(section), encoding='utf8');
    let res = buff.toString('base64');
    if (index === 2) {
      res = md5(res + secret);
    }
    return res
  }).join('.');

  return token;
};