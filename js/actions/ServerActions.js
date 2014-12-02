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
    }
};

module.exports = ServerActions;
