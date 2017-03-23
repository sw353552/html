var express = require('express');
//var app = express();
var router=express.Router();
var bodyParser= require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));

var test=function(req,res,next)
{
	console.log("first function..")
	next();
}
router.use(test)

var test1=function(req,res,next)
{
	console.log("first function..")
	next();
}
router.use(test1)

router.get('/getdata/:name', function (req, res,next) {
  res.send({"Get" : "Carpe diem! user "+req.params.name});
 // res.send({"Get" : "Carpe diem! "+req.params.age});
 //next();
})


router.post('/postdata', function (req, res) {
  res.send({"Post" : "Carpe diem! user "+req.body.name});
})

module.exports = router;