/****** Goal ******
 * Read a file and print the number of
 * '\n' it contains to stdout ( asynchronously )
 ******************/

 var fs = require('fs');
 var result = undefined;

//Much complication here. 
// Pass the callback function as parameter, and call it when file is done reading 
 function readNewLinesFromFile(callback){
 	fs.readFile(process.argv[2], function doneReading(err, contents){
 		stringified = contents.toString();
 		result = stringified.split('\n').length;
 		result = result-1;
 		callback();
 	})

 }

 function logResult(){
 	console.log(result);
 }

 readNewLinesFromFile(logResult);


 /* Oficial solution ( Simpler )

      var fs = require('fs')  
     var file = process.argv[2]  
       
     fs.readFile(file, function (err, contents) {  
       // fs.readFile(file, 'utf8', callback) can also be used  
       var lines = contents.toString().split('\n').length - 1  
       console.log(lines)  
     })

 */