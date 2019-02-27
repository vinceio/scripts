var Next_Date = parseInt(Date.parse(inputData.Next_Date));
var Last_Date = parseInt(Date.parse(inputData.Last_Date));
let xToday_Date = new Date();

var Create_Date = parseInt(new Date(Date.parse(inputData.Create_Date)).setHours(0,0,0,0));

//adjustments for time zone
var Today_Date = parseInt(new Date(xToday_Date.setHours(xToday_Date.getHours()-8)).setHours(0,0,0,0));

console.log(xToday_Date);
console.log(inputData.Create_Date);
console.log(Create_Date);
console.log(Today_Date);

if (Next_Date > Last_Date){
 
  return {value: 'true', createistoday: 'false'};
   
} else if (Create_Date === Today_Date) {
  
  return {value: 'true', createistoday: 'true'};
  
} else{
  
  return {value: 'false', createistoday: 'false'};
   
};
