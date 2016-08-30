var mymodule = require('./ex6_module');

mymodule(process.argv[2], process.argv[3], printArray);

function printArray(err, result){
	for(var i in result){
		console.log(result[i]);
	}
}