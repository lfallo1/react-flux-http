var Reflux = require('reflux');

var IngredientsActions = Reflux.createActions(['getIngredients', 'addIngredient']);

// ---- setup hooks ------
IngredientsActions.getIngredients.preEmit = function(){
    console.log('pre emit of get ingredients');
};

IngredientsActions.addIngredient.shouldEmit = function(ingredient){
    if(ingredient.text.length > 10){
        console.log('the new ingredient is longer than 10 characters.... hmmmmmm');
    }
    return true;
};

IngredientsActions.addIngredient.preEmit = function(){
    console.log('pre emit of add ingredients');
};

module.exports = IngredientsActions;