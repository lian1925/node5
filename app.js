var express = require('express');
var app = express();

// 跨域配置
app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "X-Requested-With");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')  
  res.header("Content-Type", "application/json;charset=utf-8");  
  next();  
});  

var indexRouter = require('./router/index');
var usersRouter = require('./router/user');


// 匹配根路由
app.use('/', indexRouter);
// 匹配user路由
app.use('/user', usersRouter);


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});