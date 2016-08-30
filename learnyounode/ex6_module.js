module.exports = function(path, ext, callback){

	var fs = require('fs');
	var p = require('path');
	var result = [];
	// var path = process.argv[2];
	//ext = "."+ext //process.argv[3];

	fs.readdir(path, function(err, files){
		if(err){
			return callback(err);
		}
		for(var i in files){
			if(p.extname(files[i]) == ("."+ext)){
				result[i] = files[i];
			}
		}
	callback(null, result);
	})

}