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
  var fgindex=(header.indexOf(' 3-2013'))+1;//index value of the year 2013------required for both first and second graph

  oilseedsProduction();
  foodgrainsProduction();
  commercialCrops();
  riceProduction();
  /*------------------------------------First Graph for Oilseeds vs Production---------------------------------------*/

  function oilseedsProduction()
  {
    var firstArray=[];//array for storing the the key value pairs of oilseeds
    for(var i=0;i<noOfRow;i++)
    {
    	var header1=arrayOne[i].split(',');
     	var firstCol=header1[0];//first column
    	var count1=(firstCol.match(/Oilseeds /i) || []).length;
    	
    //Extracting the required data from the csv file
      	if(count1>0)
     	 {
      	var count2=(firstCol.match(/area/i) || []).length;
        var count3=(firstCol.match(/Production/g) || []).length;
      	var count4=(firstCol.match(/yield/i) || []).length;
      	var count5=(firstCol.match(/major crops/i) || []).length;
        
    		if(count2==0 && count3==1 && count4==0 && count5==0)
    		{
    			var firstObj={};
          firstObj['Particulars']= header1[0].replace('Agricultural Production Oilseeds ','');
    			firstObj['value']=header1[fgindex];
    			firstArray.push(firstObj);
    		}
    	}
    }//end of loop
          console.log(firstArray);
          console.log("/*------------------------------------------------------------------------------------------------------*/");
          fs.writeFileSync('OilseedsVsProduction.json',JSON.stringify(firstArray));//creating JSON
  }//end of function oilseeds production

  /*-------------------------------------Second Graph for Foodgrains vs Production-------------------------------------------*/
  function foodgrainsProduction()
  {
    var secondArray=[];//array for storing foodgrains and production  
    for(var i=0;i<noOfRow;i++)
    {
      var header2=arrayOne[i].split(',');//splitting each row of  data inside the loop
      var firstColumn=header2[0];//Row title
      var count=(firstColumn.match(/Foodgrains /i) || []).length;//finds all foodgrains in the csv
      
      //Extracting the required data from the csv file
      if(count>0)
      {
        var count1=(firstColumn.match(/area/i) || []).length;
        var count2=(firstColumn.match(/volume/i) || []).length;
        var count3=(firstColumn.match(/yield/i) || []).length;
        var count4=(firstColumn.match(/Production/g) || []).length;
        var count5=(firstColumn.match(/major crops/i) || []).length;
        if(count1==0 && count2==0 && count3==0 && count4==1 && count5==0)
        {
          var secondObj = {};
          secondObj['Particulars']=header2[0].replace('Agricultural Production Foodgrains ','');
          secondObj['value'] = header2[fgindex];
          secondArray.push(secondObj);     
        }
      }
    }//end of loop 
          console.log(secondArray);
          console.log("/*----------------------------------------------------------------------------------------------*/");
          fs.writeFileSync('FoodgrainsVsProduction.json',JSON.stringify(secondArray));//creating JSON
  
  }//end of function foodgrainsProduction        

  /*-------------------------------------------Third Graph for Aggregate Value Vs Year---------------------------------------*/
  function commercialCrops()
  {
    var year1= (header.indexOf(' 3-1993'))+1;//storing the year index
    var yearN= (header.indexOf(' 3-2014'))+1;
    var thirdArray=[];//array for storing the total value for each year
    //extracting the values for the required graph
    for(var j=year1;j<=yearN;j++)
    {
      var total=0;
      for(var i=0;i<noOfRow;i++)
      {
        var tempObject={};//object for commercial crops for the year 2013
        var headerNew=arrayOne[i].split(',');
       	var columnHeader=headerNew[0]; //first column
      	var count1=(columnHeader.match(/Commercial Crops/i) || []).length; 
        var count2=(columnHeader.match(/Jute and Mesta/g) || []).length; 	
      	if(count1==1 && (!(headerNew[j]=="NA")) && count2!=1)
      	{    
         	var production=Number(headerNew[j]);
          total=total+production;
        }  
      }//end of loop
      tempObject["year"]=header[j-1].replace(' 3-','');
      tempObject["value"]=total;
      thirdArray.push(tempObject);
    
   }//end of loop
        console.log(thirdArray);
        console.log("/*--------------------------------------------------------------------------------------------------------*/");
        fs.writeFileSync('AggregateCommercialCropsVsYear.json',JSON.stringify(thirdArray));//creating JSON
  
  }//end of function commercial crops aggregate

  /*-------------------------------------Fourth Graph for Rice Production of 4 Southern States--------------------------------*/

  function riceProduction()
  {
    var fourthArray=[];//array for rice production of 4 southern states
    var firstYear=header.indexOf(' 3-1993');//storing the year index
    var lastYear=header.indexOf(' 3-2014')+1;
    //extracting the values for the given graph
    for(var i=firstYear;i<lastYear;i++)
    {
     var fourObject={};
     for(var j=0;j<noOfRow;j++)
     {
        
        var headerNew=arrayOne[j].split(',');//the required rows for the rice production
        var headerCurrent=headerNew[0];
        fourObject['year']=header[i].replace(' 3-', '');
        //
        var occurence=(headerCurrent.match(/Rice Yield/g) || []).length;
        if(occurence>0)
        {
          var count1=(headerCurrent.match(/Andhra Pradesh/g) || []).length;
          var count2=(headerCurrent.match(/Karnataka/g) || []).length;
          var count3=(headerCurrent.match(/Kerala/g) || []).length;
          var count4=(headerCurrent.match(/Tamil Nadu/g) || []).length;
          if( count1>0 || count2>0 || count3>0 || count4>0)
          {
            //assigning 0 for NA
            if(headerNew[i+1]=="NA")
            {
               headerNew[i+1]="0";
            }
              fourObject[headerNew[0].replace('Agricultural Production Foodgrains Rice Yield ','')]=Number(headerNew[i+1]);
          }
        }
      }//end of loop
        fourthArray.push(fourObject);
    }// end of loop
               
          console.log(fourthArray);
          console.log("/*------------------------------------------------------------------------------------------------------*/");
          fs.writeFileSync('RiceProductionOfSouthernStates.json',JSON.stringify(fourthArray));//creating JSON
  }//end of function rice production

}//end of function
