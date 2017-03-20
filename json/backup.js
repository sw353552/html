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


  /*--------------------------------------------First Graph for Oilseeds vs Production--------------------------------------------------------*/

  var fgindex=(header.indexOf(' 3-2013'))+1;//for the year 2013-required for both first and second graph
  var firstArray=[];//array for pushing the values of oilseeds and it's values
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
        obj['Particulars']= header1[0].replace('Agricultural Production Oilseeds ','');
  			obj['value']=header1[fgindex];
  			firstArray.push(obj);
  		}
  	}
  }
        console.log(firstArray);
        console.log("/*------------------------------------------------------------------------------------------------------*/");
        fs.writeFileSync('OilseedsVsProduction.json',JSON.stringify(firstArray));

  /*------------------------------------------------Second Graph for Foodgrains vs Production--------------------------------------------------------*/

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
        obj['Particulars']=header2[0].replace('Agricultural Production Foodgrains ','');
        obj['value'] = header2[fgindex];
        secondArray.push(obj);     
      }
    }
  } 
        console.log(secondArray);
        console.log("/*----------------------------------------------------------------------------------------------*/");
        fs.writeFileSync('FoodgrainsVsProduction.json',JSON.stringify(secondArray));


  /*-------------------------------------------Third Graph for Aggregate Value Vs Year---------------------------------------*/

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
    tempObject["year"]=header[j-1].replace(' 3-','');
    tempObject["value"]=total;
    thirdArray.push(tempObject);
  
 }
      console.log(thirdArray);
      console.log("/*--------------------------------------------------------------------------------------------------------*/");
      fs.writeFileSync('AggregateCommercialCropsVsYear.json',JSON.stringify(thirdArray));
  

  /*-------------------------------------Fourth Graph for Rice Production of 4 Southern States--------------------------------*/

  //var finalObject={};
  var fourthArray=[];
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
     fourthArray.push(fourObject);
  }
             
        console.log(fourthArray);
        console.log("/*------------------------------------------------------------------------------------------------------*/");
        fs.writeFileSync('RiceProductionOfSouthernStates.json',JSON.stringify(fourthArray));

}//end of function
