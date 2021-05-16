const path = require('path');

module.exports = {
  dbUrl: 'mongodb+srv://papa2019:Allahou1@cluster0.kr9in.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  cert: path.join( __dirname, '../ssl/local.crt'),
  key: path.join( __dirname, '../ssl/local.key'),
  portHttp: 3000,
  portHttps: 3001
}