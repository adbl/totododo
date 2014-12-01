var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var TodoStore = require('../stores/TodoStore');

var Api = require('../services/Api');

function dispatch(actionType, data) {
    AppDispatcher.handleViewAction(_.extend({
        actionType: actionType
    }, data))
}

var UserActions = {

    discoverApi: function() {
        dispatch(Constants.DISCOVER_API);
        Api.discover();
    },

    addTodo: function(text) {
        todosUrl = TodoStore.getTodosURL();
        if (todosUrl) {
            dispatch(Constants.ADD_TODO)
            Api.addTodo(todosUrl, TodoStore.getCreateTodoData(text));
        }
    }

};

module.exports = UserActions;
