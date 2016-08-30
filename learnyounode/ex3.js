/****** Goal ******
 * Read a file and print the number of
 * '\n' it contains to stdout
 ******************/

// Load the fs module from node core 
// for filesystem operations
var fs = require('fs');

//Read the 2nd argument as a file into buffer
var bufferedFile = fs.readFileSync(process.argv[2]);

//Convert the buffer to a string
var stringifiedFile = bufferedFile.toString();

//Split the last string into an array of elements 
//using '\n' as the delimiter and get the nb of elements
var result = stringifiedFile.split('\n').length;

//Remove one because there is no newline at the end of file
console.log(result-1);









