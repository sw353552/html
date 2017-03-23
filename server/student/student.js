var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var studSchema=new Schema(
{
	name:String,
	age:Number
})

module.exports=mongoose.model('Student',studSchema);