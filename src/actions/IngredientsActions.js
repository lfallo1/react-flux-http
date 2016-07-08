var Reflux = require('reflux');

var IngredientsActions = Reflux.createActions([
    'getIngredients',
    'addIngredient'
]);

module.exports = IngredientsActions;