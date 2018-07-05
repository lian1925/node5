var express = require('express');
var app = express();

// 1 解析请求的body参数
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 2 跨域配置
app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
});  

// 3 路由配置
var indexRouter = require('./router/index');
var usersRouter = require('./router/user');
// 匹配根路由
app.use('/', indexRouter);
// 匹配user路由
app.use('/user', usersRouter);

// 4 静态文件托管
app.use(express.static('dist'));

// 5 HTTPs 配置
var fs = require('fs');
var privateKey = fs.readFileSync('./dist/keys/private.key','utf8');
var certificate = fs.readFileSync('./dist/keys/certificate.crt','utf8');
var credentials = {
  key: privateKey,
  cert: certificate
};

var http = require('http');
var https = require('https');
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80, function(){
  console.log("HTTP Server is running on: http://localhost:80");
})

httpsServer.listen(443, function(){
  console.log("HTTPs Server is running on: http://localhost:443");
})