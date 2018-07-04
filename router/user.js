var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');


/* GET user page. */
router.all('/', function(req, res) {
  res.send({
    message:"user page"
  });
});

router.post('/login', function(req,res){
  // return res.send("\\");
  var username = req.body.username;
  var password = req.body.password;

  var token =   jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    username: username
  }, 'secret');

  if(username == "admin"&& password == "123"){
    return res.send({
      err_code: 0,
      token: token
    })
  }
  return res.send({
    err_code: 1,
    token:null
  })

})

router.post('/info', function(req,res){

  var token = req.body.token;

  // verify a token symmetric
  jwt.verify(token, 'secret', function(err, decoded) {
    console.log(decoded.foo) // bar

    if(decoded.username == "admin"){
      return res.send({
        err_code: 0,
        username: 'admin',
        age: 20
      })
    }else{
      return res.send({
        err_code: 1,
        username: null
      })
    }
  })
})


module.exports = router;