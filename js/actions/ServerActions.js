var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

function dispatch(actionType, data) {
    AppDispatcher.handleServerAction(_.assign({
        actionType: actionType
    }, data))
}

var ServerActions = {

    todosDiscoverySuccess: function(href) {
        dispatch(Constants.TODOS_DISCOVERED, {url: href});
    },

    receiveTodos: function(rawTodos) {
        dispatch(Constants.TODOS_RECEIVED, {rawTodos: rawTodos})
    },

    createdTodo: function(rawTodo) {
        dispatch(Constants.TODO_CREATED, {rawTodo: rawTodo})
    },

    updatedTodo: function(todoId) {
        dispatch(Constants.TODO_SYNCED, {todoId: todoId})
    },

    syncedTodosOrder: function(todos) {
        dispatch(Constants.TODOS_ORDER_SYNCED, {todos: todos});
    },
};

module.exports = ServerActions;
