var ServerActions = require('../actions/ServerActions');

var CONTENT_TYPE = 'application/vnd.api+json';

function ajax(url, options) {
    return $.ajax(url, _.assign({
        url: url,
        headers: {
            Accept: CONTENT_TYPE
        }
    }, options))
}

function get(url, options) {
    return ajax(url, _.assign({
        type: 'GET'
    }, options ? options : {}))
}

function post(url, data, options) {
    return ajax(url, _.assign({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: CONTENT_TYPE
    }, options ? options : {}))
}

function _getTodo(todosUrl, id) {
    return get(todosUrl + "/" + id)
        .then(function(data) {
            return JSON.parse(data).todos
        })
}

function _getTodos(todosUrl, todoIds) {
    return $.when.apply($, _.map(todoIds, function(todoId) {
        return _getTodo(todosUrl, todoId)
    }))
}


var Api = {

    discover: function() {
        // TODO handle discovery failure
        get('/api')
            .done(function(data) {
                if (data.todos) {
                    ServerActions.todosDiscoverySuccess(data.todos.href);
                }
            })
    },

    loadTodos: function(todosUrl) {
        // TODO handle fail
        get(todosUrl)
            .then(function(data) {
                todoIds = JSON.parse(data).todos;
                return _getTodos(todosUrl, todoIds)
            })
            .done(function() {
                rawTodos = arguments;
                ServerActions.receiveTodos(rawTodos);
            })
    },

    addTodo: function(todosUrl, data) {
        // TODO handle failure
        post(todosUrl, data)
            .done(function(data) {
                ServerActions.addTodoSuccess(JSON.parse(data));
            })
    }

};

module.exports = Api;
