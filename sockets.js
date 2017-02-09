var utils = require("bolt-internal-utils");

var __nameToSocketsMap = new Map();

module.exports = {
	createSocket: function(name, server){
		var io = require('socket.io').listen(server);
		io.sockets.on("connection", function (socket) {
			socket.join(name);

			//*socket.on('message', function(message){});
			
			socket.on('disconnect', function() {
				var name;
				for (var entry of __nameToSocketsMap) {
					if (entry[1].id === socket.id) { //value === socket.id
						name = entry[0]; //name = key
						break;
					}
				}
				if(!utils.Misc.isNullOrUndefined(name)) __nameToSocketsMap.delete(name);
			});

			__nameToSocketsMap.set(name, socket);
		});
	},
	getSocket: function(name){
		return __nameToSocketsMap.get(name);
	}
};
