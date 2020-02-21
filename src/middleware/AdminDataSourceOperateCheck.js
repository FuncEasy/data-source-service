const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
let PUBLIC_KEY = "";
module.exports = async function (ctx, next) {
  let token = ctx.request.headers['authentication'] || ctx.request.headers['Authentication'];
  try {
    const res = await TokenVerify(token);
    console.log(res);
    return next();
  } catch (e) {
    PUBLIC_KEY = "";
    ctx.status = 401;
    ctx.body = {
      err: "Forbidden",
      message: "Data Source Operator Forbidden"
    };
  }
};
function TokenVerify(token) {
  return new Promise((resolve, reject) => {
    let publicKeyPath = '';
    if (process.env.NODE_ENV === 'dev') {
      publicKeyPath = path.join(__dirname, '..', '..', 'dev', 'data_source.public.key')
    } else {
      publicKeyPath = '/data_source_access/data_source.public.key'
    }
    if (!PUBLIC_KEY) PUBLIC_KEY = fs.readFileSync(publicKeyPath, 'utf8');
    jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    }, (err, payload) => {
      if (err) reject(err);
      else resolve(payload)
    })
  })
}
