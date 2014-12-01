var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

function dispatch(actionType, data) {
    AppDispatcher.handleServerAction(_.assign({
        actionType: actionType
    }, data))
}

var ServerActions = {

    todosDiscoverySuccess: function(href) {
        dispatch(Constants.TODOS_DISCOVER_SUCCESS, {url: href});
    },

    addTodoSuccess: function(data) {
        dispatch(Constants.ADD_TODO_SUCCESS, {data: data})
    }
};

module.exports = ServerActions;
