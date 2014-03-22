var express = require('express');
var fs = require('fs');
var request = require('request');

var synonyms = {}, verses = {};

// parses tagData into synonyms and tag relations
var tagData = fs.readFileSync('tagData.txt').toString();
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

// parses topical_list
var topicalData = fs.readFileSync('topicalList.csv').toString();
topicalData.split(/\r?\n/).forEach(function(line){
	var parts = line.split(',');
	if (parseInt(parts[2]) > 10) {
		if (!verses[parts[0]]) verses[parts[0]] = [];
		verses[parts[0]].push(parts[1]);
	}
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
	// TODO: make keys / tags more fuzzy
	var response = {};
	var loadCount = 0;

	tags.forEach(function(tag) {
		loadCount += verses[synonyms[tag] || tag].length;
		response[tag] = [];

		verses[(synonyms[tag] || tag)].forEach(function(verse) {
			var i = response[tag].push({ref:verse}) -1;
			getVerse(verse, function(err, req, body){
				response[tag][i].content = body;
				if (!--loadCount) res.json(response);
			});
		});
	});
});

server.get('/tags.json', function(req,res) {
	res.json(Object.keys(tags));
});

function bibleSearch(query, callback){ request({
	url: 'https://bibles.org/v2/search.js?query=' + query,
	auth: {
	user: '5Ydn5PkX5Uke1V8UtLQw0oxFlMXB6u7ZFJG4sqlm',
	pass: '', sendImediately: false }}, 
	callback
);}

function getVerse(verse, callback){ request(
	'http://api.biblia.com/v1/bible/content/LEB.html?formatting=none&passage=' +
	verse + '&key=fd37d8f28e95d3be8cb4fbc37e15e18e',
	callback
);}

var port = process.env.PORT || 3000;
server.listen(port);
console.log(__filename + ' is now listening on port ' + port);
