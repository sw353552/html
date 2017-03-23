const readline = require('readline');
const fs = require('fs');
var arrayOne=[];
const rl = readline.createInterface({
  input: fs.createReadStream('mycsv.csv')
});
rl.on('line', (line) => {
	arrayOne.push(line);
  })
.on('close', () => {
  out(arrayOne);
  process.exit(0);
});

function out(arrayOne)
{
  var noOfRow=arrayOne.length;//rows in the csv
  var header=arrayOne[0].split(',');//title section of the row
  var noOfCol=header.length;//total columns in the file


  /*----------------------------------------------------first graph for oilseeds--------------------------------------------------------*/

  var fgindex=(header.indexOf(' 3-2013'))+1;//for the year 2013-required for both first and second graph
  var firstArray=[];
  var firstObj={};//object for oilseeds for the year 2013

  for(var i=0;i<noOfRow;i++)
  {
  	var header1=arrayOne[i].split(',');
   	var str=header1[0];//first column
  	var c1=(str.match(/Oilseeds /i) || []).length;
  	
    	if(c1>0)
   	 {
    	var c2=(str.match(/area/i) || []).length;
      var c3=(str.match(/Production/g) || []).length;
    	var c4=(str.match(/yield/i) || []).length;
    	var c5=(str.match(/major crops/i) || []).length;
      
  		if(c2==0 && c3==1 && c4==0 && c5==0)
  		{
  			var obj={};
  			obj[header1[0]]=header1[fgindex];
  			firstArray.push(obj);
  		}
  	}
  }
  for(var i in firstArray)
  {
      var fKeys = Object.keys(firstArray[i]);
      for(var j in fKeys)
      {
          firstObj[fKeys[j]] = firstArray[i][fKeys[j]];
      }
  }
        console.log(firstObj);
        console.log("/*------------------------------------------------------------------------------------------------------*/");
        fs.writeFileSync('OilseedsVsProduction.json',JSON.stringify(firstObj));

  /*-----------------------------------------------------second graph for foodgrains--------------------------------------------------------*/

  var secondArray=[];
  var secondObj={};//object for foodgrains for the year 2013
  
  for(var i=0;i<noOfRow;i++)
  {
    var header2=arrayOne[i].split(',');//splitting each row of  data inside the loop
    var s=header2[0];//first column
    var count=(s.match(/Foodgrains /i) || []).length;//finds all foodgrains in the csv
    if(count>0)
    {
      var s1=(s.match(/area/i) || []).length;
      var s2=(s.match(/volume/i) || []).length;
      var s3=(s.match(/yield/i) || []).length;
      var s4=(s.match(/Production/g) || []).length;
      var s5=(s.match(/major crops/i) || []).length;
      if(s1==0 && s2==0 && s3==0 && s4==1 && s5==0)
      {
        var obj = {};
        obj[header2[0]] = header2[fgindex];
        secondArray.push(obj);     
      }
    }
  } 

  for(var i in secondArray)
  {
      var sKeys = Object.keys(secondArray[i]);
      for(var j in sKeys) 
      {
        secondObj[sKeys[j]] = secondArray[i][sKeys[j]];
      }
  }
        console.log(secondObj);
        console.log("/*----------------------------------------------------------------------------------------------*/");
        fs.writeFileSync('FoodgrainsVsProduction.json',JSON.stringify(secondObj));


  /*----------------------------------------------------Third graph data--------------------------------------------------------*/

  var year1= (header.indexOf(' 3-1993'))+1;
  var yearN= (header.indexOf(' 3-2014'))+1;
  var thirdArray=[];
  var thirdObject={};//object for commercial crops for the year 2013

  for(var j=year1;j<=yearN;j++)
  {
    var total=0;
    for(var i=0;i<noOfRow;i++)
    {
      var tempObject={};
      var headerNew=arrayOne[i].split(',');
     	var str=headerNew[0]; //first column
    	var count=(str.match(/Commercial Crops/i) || []).length; 
      var count2=(str.match(/Jute and Mesta/g) || []).length; 	
    	if(count==1 && (!(headerNew[j]=="NA")) && count2!=1)
    	{    
       	var production=Number(headerNew[j]);
        total=total+production;
      }  
  }
    tempObject[header[j-1]]=total;
    thirdArray.push(tempObject);
  }
 
  for(var i in thirdArray)
  {
    var tKeys = Object.keys(thirdArray[i]);
    for(var j in tKeys)
    {
        thirdObject[tKeys[j]] = thirdArray[i][tKeys[j]].toString();
    }
  }
      console.log(thirdObject);
      console.log("/*--------------------------------------------------------------------------------------------------------*/");
      fs.writeFileSync('AggregateCommercialCropsVsYear.json',JSON.stringify(thirdObject));

  /*----------------------------------------------------Fourth graph data--------------------------------------------------------*/

   var arr=[];
  /*var myKey;
  var myValue;
  var header=arrayOne[0].split(',');*/
  var firstYear=header.indexOf(' 3-1993');
  var lastYear=header.indexOf(' 3-2014')+1;
  for(var i=firstYear;i<lastYear;i++)
  {
   var fourObject={};
   for(var j=0;j<noOfRow;j++)
   {
      
      var headerNew=arrayOne[j].split(',');
      var headerCurrent=headerNew[0];
      fourObject['year']=header[i].replace(' 3-', '');
      //console.log(header[i]);
      var occurence=(headerCurrent.match(/Rice Yield/g) || []).length;
      if(occurence>0)
      {
        var count1=(headerCurrent.match(/Andhra Pradesh/g) || []).length;
        var count2=(headerCurrent.match(/Karnataka/g) || []).length;
        var count3=(headerCurrent.match(/Kerala/g) || []).length;
        var count4=(headerCurrent.match(/Tamil Nadu/g) || []).length;
        if( count1>0 || count2>0 || count3>0 || count4>0)
        {
          if(headerNew[i+1]=="NA")
          {
             headerNew[i+1]="0";
          }
            fourObject[headerNew[0].replace('Agricultural Production Foodgrains Rice Yield ','')]=Number(headerNew[i+1]);
        }
      }
    }
     arr.push(fourObject);
  }
             
        console.log(arr);
        console.log("/*------------------------------------------------------------------------------------------------------*/");
        fs.writeFileSync('RiceProductionOfSouthernStates.json',JSON.stringify(arr));

}//end of function
