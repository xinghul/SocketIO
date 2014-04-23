var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8000);

var sockets = [];

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/client.html');
});

io.sockets.on('connection', function (socket) {
	sockets.push(socket);
	for (var i = 0; i < sockets.length; i ++)
		sockets[i].emit('news', { hello: 'world' , length: sockets.length});
	socket.on('my other event', function (data) {
		console.log(data);
	});
	socket.on('disconnect', function() {
		var index = sockets.indexOf(socket);
		console.log('remove ' + index);
		sockets.splice(index, 1);
	});
});

