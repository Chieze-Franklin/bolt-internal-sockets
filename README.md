# bolt-internal-sockets

Internal Bolt module used for managing apps' sockets for real time operations.

## Installation

```sh
$ npm install bolt-internal-sockets
```

## Use

```js
var sockets   = require('bolt-internal-sockets');

var socket = sockets.getSocket("my-app-name");
if (socket) socket.send(JSON.stringify({hello: "world"}));

```