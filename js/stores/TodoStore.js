var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var CHANGE_EVENT = 'change';

var _todo_url = null;

function _setTodoURL(url) {
    _todo_url = url;
}

var TodoStore = assign({}, EventEmitter.prototype, {

    isReady: function() {
        return _todo_url !== null;
    },

    getTodosURL: function() {
        return _todo_url;
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
    }
    return true;
});

module.exports = TodoStore;