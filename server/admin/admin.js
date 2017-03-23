var express = require('express');
//var app = express();
var router=express.Router();
var bodyParser= require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/getdata/:name/:age', function (req, res) {
  res.send({"Get" : "Carpe diem! admin "+req.params.name});
 // res.send({"Get" : "Carpe diem! user "+req.params.age});
})

router.post('/postdata', function (req, res) {
  res.send({"Post" : "Carpe diem! admin "+req.body.name});
})

module.exports = router;