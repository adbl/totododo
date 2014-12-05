var React = require('react');
var Glyphicon = require('react-bootstrap').Glyphicon;

var UserActions = require('../actions/UserActions');

var TodoFooter = React.createClass({

    propTypes: {
        todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        isDirty: React.PropTypes.bool
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
        dirtyStyle = {
            opacity: this.props.isDirty ? 0.15 : 0
        }

        return (
          <div>
            <div className="col-xs-5">
              <span>
                {this._itemsLeft()} items left
              </span>
            </div>
            <div className="col-xs-2" style={dirtyStyle}>
            <Glyphicon glyph="asterisk" />
            </div>
            <div className="col-xs-5">
              <span className="pull-right">
                <a href="" onClick={this._handleClick}>Mark all as complete</a>
              </span>
            </div>
          </div>
        );
    }

});

module.exports = TodoFooter;
