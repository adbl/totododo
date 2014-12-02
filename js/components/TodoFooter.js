var React = require('react');

var UserActions = require('../actions/UserActions');

var TodoFooter = React.createClass({

    propTypes: {
        todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    _itemsLeft: function() {
        return _.filter(this.props.todos, function(todo) {
            return !todo.completed
        }).length
    },

    _handleClick: function(e) {
        e.preventDefault();
        UserActions.completeAllTodos();
    },

    render: function() {
        return (
            <div>
              <span>
                {this._itemsLeft()} items left
              </span>
              <span className="pull-right">
                <a href="" onClick={this._handleClick}>Mark all as complete</a>
              </span>
            </div>
        );
    }

});

module.exports = TodoFooter;
