var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var moment = require('moment');

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
    _todos = {};
    _order = [];
    _.forEach(rawTodos, function(rawTodo) {
        _addTodo(rawTodo);
    })
}

function _setOrder(todos) {
    _order = [];
    _.forEach(todos, function(todo) {
        _order.push(todo.id);
    })
    // TODO handle possibly added todo between order call and response
}

function _updateTodo(todo) {
    _todos[todo.id] = todo;
}

function _addTodo(rawTodo) {
    if (rawTodo.complete) {
        rawTodo.complete = moment.utc(rawTodo.complete);
    }
    _order.push(rawTodo.id);
    _todos[rawTodo.id] = rawTodo;
}

var TodoStore = assign({}, EventEmitter.prototype, {

    getCreateTodoData: function(todoText) {
        return {
            text: todoText
        }
    },

    getTodoData: function(todo) {
        return todo;
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

    setCompleted: function(todo, isComplete) {
        todo.completed = isComplete ? moment() : null;
        return todo;
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
    case Constants.TODOS_DISCOVERED:
        _setTodoURL(action.url);
        TodoStore.emitChange();
        break;
    case Constants.TODO_CREATED:
        _addTodo(action.rawTodo);
        TodoStore.emitChange();
        break;
    case Constants.TODOS_RECEIVED:
        _setTodos(action.rawTodos)
        TodoStore.emitChange();
        break;
    case Constants.TODO_UPDATED:
        // TODO mark dirty
        _updateTodo(action.todo);
        TodoStore.emitChange();
        break;
    case Constants.TODOS_ORDER_SYNCED:
        _setOrder(action.todos);
        TodoStore.emitChange();
        break;
    }
    return true;
});

module.exports = TodoStore;
