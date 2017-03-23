var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("We are connected");
});

var studSchema=mongoose.Schema(
{
	name:String,
	age:Number,
	marks:Number
});

var school=mongoose.model('school',studSchema);
//var hari = new school({name:'hari'});

studSchema.methods.print=function(){
	console.log("hi");
}

var school=mongoose.model('school',studSchema);
var rohith = new school({name:'rohith'});
rohith.print();