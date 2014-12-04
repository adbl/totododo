var React = require('react');
var bs = require('react-bootstrap');
var Panel = bs.Panel;
var Table = bs.Table;

var UserActions = require('../actions/UserActions');

var TodoItem = require('./TodoItem');

var TodoStore = require('../stores/TodoStore');

var TodoList = React.createClass({

    // TODO set from props?
    getInitialState: function() {
        return {
            todos: TodoStore.getTodos(),
            dragging: undefined
        }
    },

    _onChange: function() {
        // TODO abort ongoing drag operation?
        this.setState(this.getInitialState());
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    _setDragOrder: function(todos, dragging) {
        this.setState({
            todos: todos,
            dragging: dragging
        });
    },

    _handleItemDragEnd: function() {
        this._setDragOrder(this.state.todos, undefined);
        UserActions.setTodosOrder(this.state.todos);
    },

    _handleItemDragStart: function(e) {
        this.dragged = Number(e.currentTarget.dataset.id);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("text/html", null); // for firefox
    },

    _handleItemDragOver: function(e) {
        // FIXME can't drag #2 -> #1
        e.preventDefault();
        var over = e.currentTarget
        var dragging = this.state.dragging;
        var from = isFinite(dragging) ? dragging : this.dragged;
        var to = Number(over.dataset.id);
        if((e.clientY - over.offsetTop) > (over.offsetHeight / 2)) to++;
        if(from < to) to--;

        var items = this.state.todos;
        items.splice(to, 0, items.splice(from,1)[0]);
        this._setDragOrder(items, to);
    },

    render: function() {
        if (!this.state.todos.length) {
            return null;
        }
        todos =  _.map(this.state.todos, function(todo, index) {
            var isDragging = (index == this.state.dragging);
            return (
                <TodoItem key={todo.id} todo={todo} dataId={index}
                  isDragging={isDragging}
                  onDragOver={this._handleItemDragOver}
                  onDragStart={this._handleItemDragStart}
                  onDragEnd={this._handleItemDragEnd} />
            );
        }, this);

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
