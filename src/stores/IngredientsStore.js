var HttpService = require('../services/httpService');
var Reflux = require('reflux');
var IngredientsActions = require('../actions/IngredientsActions');

var IngredientsStore = Reflux.createStore({

    listenables: [IngredientsActions],

    /**
     * longhand version that explicitly sets up listener.
     * The shorthand version above, automatically sets up the store to listen on the given Actions object.
     * The callbacks are by defaul the name of the action
     */
    //init : function(){
    //    this.listenTo(IngredientsActions.getIngredients, this.getIngredients());
    //    this.listenTo(IngredientsActions.addIngredient, this.addIngredient());
    //},

    getIngredients : function(){
        HttpService.get("/ingredients").then(function(data) {
            this.ingredients = data;
            this.fireUpdate();
        }.bind(this), function(err){
            //TODO how to handle errors inside stores?
        });
    },

    addIngredient : function(ingredient){
      HttpService.post('/ingredients', ingredient).then(function(newIngredient){
          this.ingredients.push(newIngredient);
          this.fireUpdate();
      }.bind(this));
    },

    fireUpdate : function(){
        this.trigger('change', this.ingredients);
    }

});

module.exports = IngredientsStore;