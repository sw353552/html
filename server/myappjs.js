var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var admin = require('./admin/admin')
var user = require('./user/user')
var student=require('./student/student')
var config=require('./config/config')
app.use(bodyParser.urlencoded({extended: true}));

mongodb.connect('mongodb://localhost/test');

var db=mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("We are connected");
});

/*app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})

var sum=function(req,res,next)
{
	console.log("first function..")
	next();
}
app.use(sum)
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
app.use(logErrors)
*/
app.get('/getdata/:name/:age', function (req, res) {
  res.send({"Get" : " Carpe diem! "+req.params.name});
 // res.send({"Get" : "Carpe diem! "+req.params.age});
 //next();
})

app.post('/postdata', function (req, res) {
  res.send({"Post" : "Carpe diem! "+req.body.name});
})

/*app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
*/

app.use('/user',user)
//app.use('./user'sum)
app.use('/admin',admin)

app.listen(8080, function () {
console.log("server started")
})

/*var express = require('express');
var app=express();
var config=require('./config/config');
var bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));//read date from body

var myDefault=function(req,res,next)
{
	console.log("Def function called.");
	next();
	}
app.use(myDefault);

// app.get('/userdata/:name',function(req,res){
// 	res.send({"response":"Get is called"+req.params.name});
// })

app.post('/insdata',function(req,res){
	res.send({"response":"Post is called"+req.body.name});
})
app.listen(config.port,function(){
	console.log("server started",config.port);
})*/