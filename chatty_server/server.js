const express = require('express')
const SocketServer = require('ws').Server
const WebSocket = require("ws")
const uuid = require('uuid/v4')
const randomColor = require('random-color')
// chatty_server------------------------------
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const clients = {}
const userCount = {
  type:"userUpdate",
  count: 0
};

function clientConnected(client, clientId, clientColor) {
  clients[clientId] = {
    client: client,
    clientColor: clientColor
  }
};

function broadcast(client, pkge) {
  for (cltId in clients) {
    if (cltId !== client && clients[cltId].client.readyState === WebSocket.OPEN) {
      clients[cltId].client.send(JSON.stringify(pkge));
    }
  }
};
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (client) => {
  console.log('Client connected');
  const clientId = uuid();
  const clientColor = randomColor().hexString();
  clientConnected(client, clientId, clientColor);

  userCount.count ++;
  console.log(userCount);
  broadcast(client, userCount);

  client.on('message', function incoming(message) {
    let mes = JSON.parse(message)
    // console.log("clients:", clients);
    console.log("received:", mes);
    if (mes.type === "postMessage") {
      mes.type = "incomingMessage"
    }
    else if (mes.type === "postNotification") {
      mes.type = "incomingNotification"
    }
    mes.id = clientId;
    console.log("test", clients[clientId].clientColor);
    mes.clientColor = clients[clientId].clientColor;
    broadcast(client, mes);

  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on('close', () => {
    userCount.count --;
    broadcast(client, userCount);
    console.log('Client disconnected');
  });
});
