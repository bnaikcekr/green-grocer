//  server.js

var express = require('express');  
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports.start = (options) => {

  return new Promise((resolve, reject) => {

    //  Make sure we have a repository and port provided.
    if(!options.repository) throw new Error("A server must be started with a connected repository.");
    if(!options.port) throw new Error("A server must be started with a port.");

    console.log(" Server.js - creating the app");
    //  Create the app, add some logging.
    var app = express();
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    //  Add the APIs to the app.
    console.log(" Server.js- adding ../api/recipes");
    require('../api/recipes')(app, options);

    //  Start the app, creating a running server which we return.
    var server = app.listen(options.port, () => {
      resolve(server);
    });

  });
};
