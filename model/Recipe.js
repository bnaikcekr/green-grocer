// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Ingredient   = new Schema({
    name: String,
    amount: String,
    amountUnit: String
});

var RecipeSchema   = new Schema({
    name: String,
    genre: String, //like Mexican, Chinese, Italian
    ingredientList: [Ingredient]
});

RecipeSchema.methods.findByName = function(cb) {
  return this.model('Recipe').find({ name: this.name }, cb);
}

module.exports = mongoose.model('Recipe', RecipeSchema);