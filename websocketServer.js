// websocketServer.js
const WebSocket = require('ws');

class WebSocketServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.wss.on('connection', this.handleConnection.bind(this));
  }

  handleConnection(ws) {
    ws.on('message', (message) => {
      const data = JSON.parse(message);

      switch (data.type) {
        case 'insert':
          this.handleInsert(ws, data);
          break;
        case 'update':
          this.handleUpdate(ws, data);
          break;
        // Add more cases as needed
        default:
          break;
      }
    });
  }

  handleInsert(ws, data) {
    //const databaseData = this.database.readDatabase();
    //databaseData.push(data.payload);
    //this.database.writeDatabase(databaseData);

    this.broadcastUpdate();
  }

  handleUpdate(ws, data) {
    // Implement update logic here
    // You may need to find the item in the databaseData array and update it
  }

  broadcastPayload(payload) {
 
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload));
      }
    });
  }

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = WebSocketServer;
