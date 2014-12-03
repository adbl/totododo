var React = require('react');
var Input = require('react-bootstrap').Input;

var UserActions = require('../actions/UserActions');

var TodoItem = React.createClass({

    propTypes: {
        todo: React.PropTypes.object.isRequired,
        dataId: React.PropTypes.number.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
        onDragStart: React.PropTypes.func.isRequired,
        onDragEnd: React.PropTypes.func.isRequired,
        onDragOver: React.PropTypes.func.isRequired
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
          <tr data-id={this.props.dataId}
              className={this.props.isDragging ? "info" : ""}
              draggable="true"
              onDragStart={this.props.onDragStart}
              onDragEnd={this.props.onDragEnd}
              onDragOver={this.props.onDragOver}>
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
