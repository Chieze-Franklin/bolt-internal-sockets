var utils = require("bolt-internal-utils");

var __nameToSocketsMap = new Map();

module.exports = {
	createSocket: function(name, server){
		var io = require('socket.io').listen(server);
		io.sockets.on("connection", function (socket) {
			socket.join(name);

			//*socket.on('message', function(message){});

			//send connection event
			var event = {
				body: {},
				name: 'server-connected',
				publisher: 'bolt',
				time: new Date(),
				dispatchTime: new Date()
			};
			socket.send(JSON.stringify(event));
			
			socket.on('disconnect', function() {
				var name;
				for (var entry of __nameToSocketsMap) {
					var breakOuterLoop = false;
					var sockets = entry[1] || []; //the value, which is expected to be an array

					for (index = 0; index < sockets.length; index++) {
						if (sockets[index].id === socket.id) {
							sockets.splice(index, 1);
							name = entry[0]; //name = key
							breakOuterLoop = true;
							break;
						}
					}

					if (breakOuterLoop) {
						__nameToSocketsMap.set(name, sockets);
						break;
					}
				}
			});

			//get existing array
			var sockets = __nameToSocketsMap.get(name) || [];
			sockets.push(socket);
			__nameToSocketsMap.set(name, sockets);
		});
	},
	getSockets: function(name){
		return __nameToSocketsMap.get(name) || [];
	}
};
