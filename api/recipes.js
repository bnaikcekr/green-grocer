//  recipes.js
//
//  Defines the recipes api. Add to a server by calling:
//  require('./recipes')
'use strict';

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.get('/recipes', (req, res, next) => {
    console.log('Recipes.js - GET /recipes');
    options.repository.getRecipes().then((recipes) => {
      res.status(200).send(recipes);
    })
    .catch(next);
  });

  app.get('/recipes/search', (req, res, next) => {
    console.log('Recipes.js - GET /recipes/search');
    var name = req.query.name;
    if (!name) {
      throw new Error("Recipes.js - When searching for a recipe, the name must be specified, e.g: 'recipes/search?name=Risotto'.");
    }
    options.repository.getRecipeByName(name).then((recipe) => {

      if(!recipe) { 
        res.status(404).send('Recipe not found.');
      } else {
        res.status(200).send(recipe);
      }
    })
    .catch(next);
  });

  app.post('/recipes/post', (req, res, next) =>{
    console.log('Recipes.js - POST /recipes/post');
    if(!req.body){
      throw new Error("Recipes.js - Error when creating recipe, please check data...");
    }
    console.log("   req.body: " + JSON.stringify(req.body));
    options.repository.saveRecipe(req.body).then((result)=>{
      if(!result) { 
        res.status(404).send('Recipe not found.');
      } else {
        res.status(200).send(result);
      }
    })
    .catch(next);
  });
};