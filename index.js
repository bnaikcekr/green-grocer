//    index.js
//
//  Entrypoint to the application. Opens a repository to the MongoDB
//  server and starts the server.
var server = require('./server/server');  
var repository = require('./repository/repository');  
var config = require('./config/config');

//  Lots of verbose logging when we're starting up...
console.log("Index.js --- Recipes Service---");  
console.log("Index.js - Connecting to recipes repository...");

//  Log unhandled exceptions.
process.on('uncaughtException', function(err) {  
  console.error('Unhandled Exception', err);
});
process.on('unhandledRejection', function(err, promise){  
  console.error('Unhandled Rejection', err);
});

repository.connect({  
  host: config.db.host,
  database: config.db.database,
}).then((repo) => {
  console.log("Index.js - Connected to Repo...");
  console.log("Index.js - Starting server...");

  return server.start({
    port: config.port,
    repository: repo
  });
  console.log("Index.js - Server started...");
  
}).then((app) => {
  console.log("Index.js - Running on port " + config.port + ".");
  console.log("Index.js - Full path is - " + process.env.IP +":"+ config.port);
  app.on('close', () => {
    repository.disconnect();
  });
});
