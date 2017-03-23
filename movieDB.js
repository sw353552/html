$.ajax({
	url:
	data:{
		movieName:document.getElementById("movieName");
	}, success:function(result){
		$("#movie").html(" "+result+" ");
	}
});