// server.js
const express = require('express');
const http = require('http');
const Database = require('./database');
const WebSocketServer = require('./websocketServer');

const app = express();
const server = http.createServer(app);

const database = new Database('data');


//const user1 = database.addToCollection('users', { name: 'John', age: 25, city: 'New York' });
//const user2 = database.addToCollection('users6', { name: 'Alice', age: 30, city: 'Los Angeles' });

///console.log('User 1:', user1);
//console.log('User 2:', user2);

//console.log(database.findOneAndUpdate('users',{ _id : 'd9c06eb3-c85f-422f-9a3a-48d0fd626320'},{ status: 'updated', updatedAt: new Date() }))

const wsServer = new WebSocketServer(server);
//wsServer.setDatabase(database);

app.use(express.json());

// Express route for inserting data
app.get('/api/insert', (req, res) => {
  //const { data } = req.body;
  
  ///const user2 = database.updateCollectionItem('users6', { name: 'Alice', age: 30, city: 'Los Angeles' });
  const user1 = database.addToCollection('trads', { 
    pair: 'BTC/USD',
    price: 40000,
    quantity: 1,
    timestamp: Date.now(),
   });

  //database.writeDatabase(databaseData);
  //wsServer.broadcastUpdate();

  res.json({ success:user1, message: 'Data inserted successfully' });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});


setInterval(() => {
  const trads =  database.addToCollection('trads', { 
    pair: 'BTC/USD',
    price: Math.random() * 40000,
    quantity: Math.random(),
    timestamp: Date.now(),
   });
   wsServer.broadcastPayload({ type : 'insert' , trads });
   const oders =  database.addToCollection('orders', { 
    pair: 'BTC/USD',
    price: Math.random() * 40000,
    quantity: Math.random(),
    timestamp: Date.now(),
   });
   wsServer.broadcastPayload({ type : 'insert' , oders })
}, 1000);

  
