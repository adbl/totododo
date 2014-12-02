var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var CHANGE_EVENT = 'change';

var _todo_url = null;
var _todos = {};
var _order = [];

function _setTodoURL(url) {
    _todo_url = url;
}

function _setTodos(rawTodos) {
    _order = _.pluck(rawTodos, 'id');
    _todos = _.zipObject(_order, rawTodos);
}

function _addTodo(data) {
    todo = data.todos;
    _todos[todo.id] = todo;
    _order.push(todo.id);
}

var TodoStore = assign({}, EventEmitter.prototype, {

    getCreateTodoData: function(todoText) {
        return {
            todos: {text: todoText}
        }
    },

    isReady: function() {
        return _todo_url !== null;
    },

    getTodosURL: function() {
        return _todo_url;
    },

    getTodos: function() {
        return _.map(_order, function(todoId) {
            return _todos[todoId];
        })
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.actionType) {
    case Constants.DISCOVER_API:
        // TODO set some state to allow UI feedback
        // TodoStore.emitChange();
        break;
    case Constants.TODOS_DISCOVER_SUCCESS:
        _setTodoURL(action.url);
        TodoStore.emitChange();
        break;
    case Constants.ADD_TODO:
        // TODO set some state to allow UI feedback
        // TodoStore.emitChange();
        break;
    case Constants.ADD_TODO_SUCCESS:
        _addTodo(action.data);
        TodoStore.emitChange();
        break;
    case Constants.TODOS_RECEIVED:
        _setTodos(action.rawTodos)
        TodoStore.emitChange();
        break;
    }
    return true;
});

module.exports = TodoStore;
