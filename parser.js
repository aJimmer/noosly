let Feed = require('rss-to-json');

var parseRssToJson = function (url) {
	var source = []
	Feed.load(url, function (err, rss) {
		for(item of rss.items) {
			source.push(item);
		}
	});
	return source;
};
module.exports = parseRssToJson;