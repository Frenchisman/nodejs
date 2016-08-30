/*****************************************
Create a program that prints a list of files 
in a given directory, filtered by the 
extension of the files. 

You will be provided a directory  
name as the first argument to your program 
(e.g. '/path/to/dir/') and a file extension 
to filter by as the second argument.  
*****************************************/

var fs = require('fs');
var p = require('path');

var path = process.argv[2];
var ext = "."+process.argv[3];

fs.readdir(path, function(err, files){
	for(var i in files){
		if(p.extname(files[i]) == ext){
			console.log(files[i]);
		}
	}
})