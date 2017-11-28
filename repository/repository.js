
//  repository.js
//
//  Exposes a single function - 'connect', which returns
//  a connected repository. Call 'disconnect' on this object when you're done.
'use strict';

var mongoose = require('mongoose');
var Recipe   = require('../model/Recipe');

//  Class which holds an open connection to a repository
//  and exposes some simple functions for accessing data.
class Repository {  
  constructor(connectionSettings) {
  	mongoose.connect('mongodb://' + connectionSettings.host + '/' + connectionSettings.database); // connect to our database
  }

  getRecipes() {
    return new Promise((resolve, reject) => {
    	Recipe.find(function(err, results) {
      		if (err){
        		return reject(new Error("An error occurred getting the recipes - " + err));
        	}
        	return resolve(results || []);
      	});
     });
  }

  getRecipeByName(name) {
    return new Promise((resolve, reject) => { 	
    	var recipe = new Recipe();
    	recipe.name = name;
    	recipe.findByName(function(err, results) {
    		if (err){
        		return reject(new Error("An error occurred getting the recipe: " + name +" - "+ err));
        	} if(results.length === 0) {

          		resolve(undefined);
          	} else {
          		resolve(results[0]);
        	}
      	});
    });
  }

  saveRecipe(postRecipe){
  	return new Promise((resolve, reject) => {
  		var recipe = new Recipe(postRecipe);
  		var foundRecipe = recipe.findByName(function(err, results) {
    		if (err){
        		return reject(new Error("An error occurred checking the recipe: " + postRecipe.name +" - "+ err));
        	} if(results.length != 0) {
          		return reject(new Error("Recipe already exists: " + postRecipe.name));
          	} else {
          		recipe.save(function(err) {
      				if (err){
        				console.log("Error: " + err)
        				return reject(new Error("An error occurred saving the recipe: " + postRecipe.name + err));
      				}
      				resolve({ message: 'Recipe created!', value: recipe });
    			});
        	}
      	});
  	});
  }

  disconnect() {
    this.connection.end();
  }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {  
  console.log("Repository.js - Connecting to repository.");
  return new Promise((resolve, reject) => {
    if(!connectionSettings.host) throw new Error("A host must be specified.");
    if(!connectionSettings.database) throw new Error("A database must be specified.");
	
	console.log("Repository.js.js - Connection host - " + connectionSettings.host);
	console.log("Repository.js - Connection database - " + connectionSettings.database);

	//connectionSettings.host is passed from index.js and is taken form config.js to be process.env.DATABASE_HOST from docker-compose.yml
    console.log('Repository.js - mongodb://' + connectionSettings.host + '/' + connectionSettings.database);
    resolve(new Repository(connectionSettings));
    
	console.log("Repository.js - repo resolved...");
  });
};
