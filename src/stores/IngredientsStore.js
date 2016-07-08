var HttpService = require('../services/httpService');
var Reflux = require('reflux');
var IngredientsActions = require('../actions/IngredientsActions');

var IngredientsStore = Reflux.createStore({

    listenables: [IngredientsActions],

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