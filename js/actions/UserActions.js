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
        // TODO add optimisticly
        todosUrl = TodoStore.getTodosURL();
        if (todosUrl) {
            Api.createTodo(todosUrl, TodoStore.getCreateTodoData(text));
        }
    },

    completeTodo: function(todo, isComplete) {
        todo = TodoStore.setCompleted(todo, isComplete);
        dispatch(Constants.TODO_CHANGED, {todo: todo});
        todosUrl = TodoStore.getTodosURL();
        if (todosUrl) {
            Api.updateTodo(todosUrl, TodoStore.getTodoData(todo))
        }
    },

    completeAllTodos: function() {
        todosUrl = TodoStore.getTodosURL();
        if (todosUrl) {
            _.forEach(TodoStore.getTodos(), function(todo) {
                if (!todo.completed) {
                    UserActions.completeTodo(todo, true);
                }
            })
        }
    },

    setTodosOrder: function(todos) {
        dispatch(Constants.TODOS_ORDER_CHANGED, {todos: todos});
        todosUrl = TodoStore.getTodosURL();
        if (todosUrl) {
            Api.updateTodosOrder(todosUrl, todos);
        }
    }

};

module.exports = UserActions;
