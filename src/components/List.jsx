var React = require('react');
var Reflux = require('reflux');
var IngredientsStore = require('../stores/IngredientsStore');
var IngredientsActions = require('../actions/IngredientsActions');
var ListItem = require('./ListItem.jsx');

var List = React.createClass({

    //mixins:[Reflux.listenTo(IngredientsStore, 'handleChange')],

    getInitialState : function(){
        return {'ingredients' : [], 'newText' : ''};
    },

    componentDidMount : function(){
        this.unsubscribe = IngredientsStore.listen(this.handleChange);
        IngredientsActions.getIngredients();
    },

    componentWillUnmount : function(){
        this.unsubscribe();
    },

    handleChange : function(event, data){
        this.setState({'ingredients' : data});
    },

    addIngredient : function(e){
        if(this.state.newText){
            IngredientsActions.addIngredient({text: this.state.newText});
            this.state.newText = '';
            this.setState(this.state);
        }
    },

    onInputChange : function(e){
        this.state.newText = e.target.value;
        this.setState(this.state);
    },

    render : function(){

        var listItems = this.state.ingredients.map(function(item){
            return <ListItem key={item.id} id={item.id} ingredient={item.text} />;
        });

        var buttonDisabled = !this.state.newText;

        return (
            <div className="row">
                <div className="col-md-5 col-md-offset-3">
                    <input
                        className="form-control"
                        value={this.state.newText}
                        onChange={this.onInputChange} type="text" placeholder="Add new ingredient" />
                    <button disabled={buttonDisabled} className="btn btn-primary" onClick={this.addIngredient}>add ingredient</button>
                    <ul className="list-group">{listItems}</ul>
                </div>
            </div>
        );
    }
});

module.exports = List;