var express = require('express');
var app = express();
var bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/getdata/:name/:age', function (req, res) {
  res.send({"Get" : "Carpe diem! "+req.params.name});
 // res.send({"Get" : "Carpe diem! "+req.params.age});
})

app.post('/postdata', function (req, res) {
  res.send({"Post" : "Carpe diem! "+req.body.name});
})






app.listen(8080, function () {
console.log("server started")
});