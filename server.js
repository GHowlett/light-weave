var express = require('express');
var fs = require('fs');

var synonyms = {}, tags = {};
var tagData = fs.readFileSync('tagData.txt').toString();

// parses tagData into synonyms and tag relations
tagData.split(/\r?\n/).map(function(str) {
	var tag = str.split('\t');

	tag[0] = tag[0].replace(/.*_/, ''); //TODO: actually create sub-tags
	tag[0] = tag[0].replace(/(?:[a-z])([A-Z])/g, function(match){ 
		return match[0] + ' ' + match[1]; // remove camel case
	});
	tags[tag[0]] = tag[2].split('; ');

	tag[1].split('; ').forEach(function(syn) {
		synonyms[syn] = tag[0];
	});
});

var server = express()
	.use(express.static(__dirname + '/public'))
	.use(express.bodyParser());
	
var port = process.env.PORT || 3000;
server.listen(port);
console.log(__filename + ' is now listening on port ' + port);

