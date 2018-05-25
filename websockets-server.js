var WebSocket = require('ws');
var rss = require('./parser');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
	port: port
});

const URL_NPR = 'http://www.npr.org/rss/rss.php?id=1001';
const URL_BBC = 'http://feeds.bbci.co.uk/news/rss.xml';
const URL_CNN = 'http://rss.cnn.com/rss/cnn_topstories.rss';

var messages = []
var rssFeed1 = rss(URL_NPR);
var rssFeed2 = rss(URL_BBC);
var rssFeed3 = rss(URL_CNN);

console.log('Websockets server started...');

// a callback for any connection events
ws.on('connection', function (socket) {
	console.log('Client connection established...');

	messages.forEach(function (msg) {
		socket.send(msg);
	})
	
	;
	// Not needed but, repeats any messages sent to it. Commonly known as an 'echo server'.
	socket.on('message', function (keyword) {
    	console.log('message received: ' + keyword);
    	searchKeyword(socket, keyword = keyword.substring(1, keyword.length - 1));
	});
});

function searchKeyword (socket, keyword){
	keyword = keyword.toUpperCase();

	rssFeed1.forEach(function (item) {
		if (item.title.toUpperCase().includes(keyword) || item.description.toUpperCase().includes(keyword)){
			socket.send(JSON.stringify(item));
			console.log('1: ', item);
		}
	});

	rssFeed2.forEach(function (item) {
		if (item.title.toUpperCase().includes(keyword) || item.description.toUpperCase().includes(keyword)){
			socket.send(JSON.stringify(item));
			console.log('2: ', item);
		}
	});

	rssFeed3.forEach(function (item) {
		if (item.title.toUpperCase().includes(keyword) || item.description.toUpperCase().includes(keyword)){
			item.description = item.description.replace(/<(?:.|\n)*?>/g, '');
			console.log(item.description);
			socket.send(JSON.stringify(item));
			console.log('3: ', item);
		}
	});
}








