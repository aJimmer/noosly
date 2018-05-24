var path = require('path');

var extractFilePath = function (url) {
	var filePath;
	var fileName = 'index.html';
	
	// Strip off the first character, which will be a '/'
	if (url.length > 1) {
    fileName = url.substring(1);
  }
  console.log('The fileName is: ' + fileName);
  filePath = path.resolve(__dirname, 'app', fileName);
  return filePath;
};

// This new line tells Node that when you import the extract module by calling 
// require('./extract'), the value returned is the extractFilePath function.

module.exports = extractFilePath;