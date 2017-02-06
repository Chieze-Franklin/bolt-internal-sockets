var __nameToSocketsMap = new Map();

module.exports = {
	createSocket: function(name, server){console.log("got here")
		var io = require('socket.io').listen(server);
		io.sockets.on("connection", function (socket) {
			console.log("/////////////////////////Successfully connected to socket!!!");

			socket.send(JSON.stringify({
				type: 'serverMessage',
				message: 'Hello World'
			}));
			socket.on('message', function(message){
				console.log("/////////////////////////Successfully received message!!!");
				message = JSON.parse(message);
				if(message.type == 'userMessage') {
					socket.broadcast.send(JSON.stringify(message));
					message.type = 'myMessage';
					socket.send(JSON.stringify(message));
				}
			});
			socket.on('disconnect', function() {console.log("/////////////////////////Successfully disconnected from socket!!!");});

			__nameToSocketsMap.set(name, socket);
		});
	},
	getSocket: function(name){
		return __nameToSocketsMap.get(name);
	}
};
