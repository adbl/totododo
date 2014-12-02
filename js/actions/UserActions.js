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
        Api.discover();
    },

    loadTodos: function() {
        todosUrl = TodoStore.getTodosURL();
        if (todosUrl) {
            Api.getTodos(todosUrl);
        }
    },

    createTodo: function(text) {
        todosUrl = TodoStore.getTodosURL();
        if (todosUrl) {
            // TODO add optimisticly
            Api.createTodo(todosUrl, TodoStore.getCreateTodoData(text));
        }
    },

    completeTodo: function(todo, isComplete) {
        todosUrl = TodoStore.getTodosURL();
        if (todosUrl) {
            todo = TodoStore.setCompleted(todo, isComplete);
            dispatch(Constants.TODO_UPDATED, {todo: todo});
            Api.updateTodo(todosUrl, TodoStore.getTodoData(todo))
        }
    },

};

module.exports = UserActions;
