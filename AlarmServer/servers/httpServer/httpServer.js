const httpServer = require('http');
const fs = require('fs');
const express = require('express');

const expressApp = express();

const httpServerPort=2001;
const serverIP='192.168.1.13';


  
expressApp.use((req, res, next) => {
  console.log(`Received request for: ${req.method} ${req.url}`);
  next();
});

// Route handling
expressApp.get('/', (req, res) => {
  res.send('Hello, this is your Express HTTP server!');
});

expressApp.get('/about', (req, res) => {
  res.send('About page');
});

// Handling 404 errors
expressApp.use((req, res) => {
  res.status(404).send('404: Page not found');
});

// Start the HTTP server
const HTTPRun=()=>{
  httpServer.createServer(expressApp).listen(httpServerPort, ()=>{
    console.log(`HTTP on port ${httpServerPort}`);
  });
}
  



module.exports = {HTTPRun};