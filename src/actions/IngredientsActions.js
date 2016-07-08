var Reflux = require('reflux');

var IngredientsActions = Reflux.createActions(['getIngredients', 'addIngredient']);

// ---- setup hooks ------
IngredientsActions.getIngredients.preEmit = function(){
    console.log('pre emit of get ingredients');
};

IngredientsActions.addIngredient.shouldEmit = function(ingredient){
    if(ingredient.text === 'Hold the phone!'){
        console.log('yup, it says "hold the phone", so we will continue');
    }
    return ingredient.text === 'Hold the phone!';
};

IngredientsActions.addIngredient.preEmit = function(){
    console.log('pre emit of add ingredients');
};

module.exports = IngredientsActions;