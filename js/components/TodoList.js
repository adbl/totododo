var React = require('react');
var bs = require('react-bootstrap');
var Panel = bs.Panel;
var Table = bs.Table;

var TodoStore = require('../stores/TodoStore');

var TodoList = React.createClass({

    propTypes: {
        todos: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    _renderTodos: function() {
        return _.map(this.props.todos, function(todo) {
            return (
                <tr key={todo.id}>
                  <td>{todo.text}</td>
                </tr>
            )
        })
    },

    render: function() {
        if (!this.props.todos.length) {
            return null;
        }

        return (
          <div className="panel panel-default">
            <Table striped hover>
              <tbody>
                {this._renderTodos()}
              </tbody>
            </Table>
          </div>
        );
    }

});

module.exports = TodoList;
