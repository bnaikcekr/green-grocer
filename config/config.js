//  config.js
//
//  Simple application configuration. Extend as needed.
module.exports = {  
    port: process.env.PORT || 8345,
  db: {
    host: process.env.DATABASE_HOST || '0.0.0.0',
    database: 'green_grocer',
    port: 28017
  }
};