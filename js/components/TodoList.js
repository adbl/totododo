var React = require('react');
var bs = require('react-bootstrap');
var Panel = bs.Panel;
var Table = bs.Table;

var TodoItem = require('./TodoItem');

var TodoList = React.createClass({

    propTypes: {
        todos: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render: function() {
        if (!this.props.todos.length) {
            return null;
        }
        todos =  _.map(this.props.todos, function(todo) {
            return <TodoItem key={todo.id} todo={todo} />;
        });

        return (
          <div className="panel panel-default">
            <Table striped hover>
              <tbody>
                {todos}
              </tbody>
            </Table>
          </div>
        );
    }

});

module.exports = TodoList;
