var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');

/* When a file cannot be found, return an error code by detecting when 
 * 'fs.readFile' returns an error instead of a file. 
 */
var handleError = function (err, res) {
	res.writeHead(404);
	res.end();
}

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');
  
  var filePath = extract(req.url);
  
  fs.readFile(filePath, function (err, data) {
  	
  	/* Callbacks typically take in an error as their first argument. Because the error comes 
     * before the result, you are forced to at least see the error, whether or not you handle it.
     * This pattern – “errors first, return early” – is one of the best practices that is a part 
     * of the Node ecosystem. All of the modules that come with Node follow this pattern, as do 
     * most open-source modules. */
     
  	if (err) {
  		handleError(err, res);
  		return;
  	} else {
  		res.end(data);
  	}
  });
});

server.listen(3000);