var React = require('react');

var ListItem = React.createClass({

    render: function(){
        return (
          <li className="list-group-item">
              {this.props.id} {this.props.ingredient}
          </li>
        );
    }

});

module.exports = ListItem;