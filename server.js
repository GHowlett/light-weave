var express = require('express');

var app = express()
	.use(express.static(__dirname + '/public'))
	.use(express.bodyParser());

var port = process.env.PORT || 3000;
app.listen(port);
console.log(__filename + ' is now listening on port ' + port);

