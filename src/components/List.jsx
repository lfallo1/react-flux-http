var React = require('react');
var Reflux = require('reflux');
var IngredientsStore = require('../stores/IngredientsStore');
var IngredientsActions = require('../actions/IngredientsActions');
var ListItem = require('./ListItem.jsx');

var List = React.createClass({

    getInitialState : function(){
        return {'ingredients' : []};
    },

    componentDidMount : function(){
        //Reflux.listenTo(IngredientsStore, 'onChange');
        IngredientsStore.listen(this.handleChange);
        IngredientsActions.getIngredients();
    },

    handleChange : function(event, data){
        this.setState({'ingredients' : data});
    },

    addIngredient : function(){
      IngredientsActions.addIngredient({text: 'Hold the phone!'});
    },

    render : function(){

        var listItems = this.state.ingredients.map(function(item){
            return <ListItem key={item.id} id={item.id} ingredient={item.text} />;
        });

        return (
            <div className="row">
                <div className="col-md-5 col-md-offset-3">
                    <ul className="list-group">{listItems}</ul>
                    <button className="btn btn-primary" onClick={this.addIngredient}>add ingredient</button>
                </div>
            </div>
        );
    }
});

module.exports = List;