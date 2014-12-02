var React = require('react');
var bs = require('react-bootstrap');
var Input = bs.Input;

var UserActions = require('../actions/UserActions');

var TodoItem = React.createClass({

    propTypes: {
        todo: React.PropTypes.object.isRequired
    },

    _handleChange: function() {
        UserActions.completeTodo(this.props.todo, !this.props.todo.completed);
    },

    render: function() {
        label = this.props.todo.text;
        if (this.props.todo.completed) {
            label = <del>{label}</del>;
        }

        return (
          <tr>
            <td>
              <Input type="checkbox" label={label}
                checked={this.props.todo.completed}
                onChange={this._handleChange} />
            </td>
          </tr>
        )
    },

});

module.exports = TodoItem;
