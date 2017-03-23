//console.log("hi!!!!");
$(document).ready(function()
{
	$Container = $('#container1');
	$Container.hide();
	var movieURL, movieTitle, oData;
	$("#submit").on("click", function()
	{
		movieTitle=$("#mName").val();
		movieURL="http://www.omdbapi.com/?t="+movieTitle;
		$.ajax(movieURL, {
        complete: function(p_oXHR, p_sStatus){
            oData = $.parseJSON(p_oXHR.responseText);
            console.log(oData);
            $Container.find('.panel-title').text(oData.Title);
            $Container.find('.image').html('<img src="' + oData.Poster + '"/>');
            $Container.find('.plot').text(oData.Plot);
            $Container.find('.year').text(oData.Year);
            $Container.find('.imdb').text(oData.imdbRating);
            $Container.find('.genre').text(oData.Genre);
            $Container.show();
            
           console.log("success");

        }
    });

	});
});

/*var hiddenContent=$("#movie");
$("#search").on("click", function(event){
	hiddenContent.show();
});*/
/*$.ajax({
	url:"http://www.omdbapi.com/?t="+movieName;
	data:{
		movieName:"#mName";
	}, success:function(result){
		$("#movie").html(" "+result+" ");
	}
});*/

/*$.ajax({
			method:"GET",
			url:movieURL,
			success:function(results){
				console.log("true", results);
				var movies=Object.keys(results);
				//var s=movies.length;
				console.log(movies);
				//console.log(s);
				var oData;
				for(var i=0; i< movies.length;i++){
					result.append('<li><img src="'+movies[i].Poster+'"/></li>'+
									   '<li>'+movies[i].Title+'</li>'+
									   	'<li>'+movies[i].Type+'</li>'+
									   	'<li>'+movies[i].Year+'<li>'+
									   	'<li>'+movies[i].Genre+'<li>'+
									   	'<li>'+movies[i].imdbRating+'<li>');
				}
			},
			error:function(err){
				console.log("false",err);
			}
		});
*/