var fs = require('fs');
var http = require('http');
var URL = require('url');
var file = __dirname + '/favs.json';

var PORT = 41057;

var data;
fs.readFile(file, 'utf8', function(err, jsondata) {
	if (err) {
		console.log('Error: ' + err);
		return;
	}
	data = JSON.parse(jsondata);
});

http.createServer(function(req, res) {
	if (req.url == '/') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(fs.readFileSync('index.html'));
	} else if (req.url == '/tweets') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		//console.log(JSON.stringify(data));
		var text = '';
		var id = '';
		var tweet = {};
		for (object in data) {
			for (key in data[object]) {
				if (key == 'text') {
					text = data[object][key];
				} else if (key == 'id') {
					id = data[object][key];
				}
			}
			tweet[id] = text;
			//console.log(id + ': ' + text);
		}
		//console.log(tweet);
		res.end(JSON.stringify(tweet));
	} else if (req.url == '/users') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		var users = [];
		for (object in data) {
			for (key in data[object]) {
				if (key == 'user') { 
					for (info in data[object][key]) {
						if (info == 'screen_name') {
							users.push(data[object][key][info]);
						}
					}
				}
			}
		}
		res.end(JSON.stringify({ 'users' : users }));
	} else if (req.url == '/external_urls') {
		res.writeHead(200, {'Content-Type': 'application/json'});
		var urls = [];
		for (object in data) {
			for (key in data[object]) {
				if (key == 'entities') {
					for (info in data[object][key]) {
						if (info == 'urls') {
							urls.push(data[object][key][info][0]['expanded_url']);
						}
					}
				}
			}
		}
		//console.log(urls);
		res.end(JSON.stringify({ 'external_urls' : urls}));
	} else {
		url = URL.parse(req.url);
	
		if (req.method == 'GET') {
			path = url.pathname.split('/');
			resources = path[path.length - 2];
			id = path[path.length - 1];
		
			if (resources == 'tweet') {
				var result = {};
				for (object in data) {
					if (data[object]['id'] == id) {
						result['created_at'] = data[object]['created_at'];
						result['name'] = data[object]['user']['name'];
						result['screen_name'] = data[object]['user']['screen_name'];
					}
				}
			} else if (resources == 'user') {
				var result = {};
				for (object in data) {
					if (data[object]['user']['screen_name'] == id) {
						result['id'] = data[object]['user']['id'];
						result['name'] = data[object]['user']['name'];
						result['location'] = data[object]['user']['location'];
						result['description'] = data[object]['user']['description'];
					}
				}
			}
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(result));
		}
	}
	
	
}).listen(PORT);
console.log('Server running at http://127.0.0.1:' + PORT + '/');
