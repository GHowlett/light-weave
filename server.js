var express = require('express');
var fs = require('fs');
var request = require('request');

var synonyms = {}, verses = {};
var tagData = fs.readFileSync('tagData.txt').toString();

// parses tagData into synonyms and tag relations
tagData.split(/\r?\n/).map(function(str) {
	var tag = str.split('\t');

	tag[0] = tag[0].replace(/.*_/, ''); //TODO: actually create sub-tags
	tag[0] = tag[0].replace(/(?:[a-z])([A-Z])/g, function(match){ 
		return match[0] + ' ' + match[1]; // remove camel case
	});
	verses[tag[0]] = tag[2].split('; ');

	tag[1].split('; ').forEach(function(syn) {
		synonyms[syn] = tag[0];
	});
});

var server = express()
	.use(express.static(__dirname + '/public'))
	.use(express.bodyParser());

server.get('/search', function(req,res) {
	var lvlCount = parseInt(req.param('l')) || 3;
	var verse = req.param('v');
	var question = req.param('q');
	var tags = req.param('t').split('+');

	// TODO: actually take levels & verses & questions into account
	res.json(tags.map(function(tag) {
		// TODO: make keys / tags more fuzzy
		return verses[tag];
	})); 
	
});

server.get('/tags.json', function(req,res) {
	res.json(Object.keys(tags));
});

// request({
// 	url: 'https://bibles.org/v2/tags/31.js',
// 	auth: {
// 		user: '5Ydn5PkX5Uke1V8UtLQw0oxFlMXB6u7ZFJG4sqlm',
// 		pass: '', sendImediately: false }}, 
		
// 	function(err, res, body) {
// 		console.log(body);
// });

var port = process.env.PORT || 3000;
server.listen(port);
console.log(__filename + ' is now listening on port ' + port);

