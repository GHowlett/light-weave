var fs = require('fs');
var _ = require('lodash');

var newFile = fs.open(process.argv[1], 'r', function(err, data) {
	//_.map(data, _.invert);
	_.each(data, console.log);
	});

console.log(newFile);
