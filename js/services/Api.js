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

function put(url, data, options) {
    return ajax(url, _.assign({
        type: 'PUT',
        data: JSON.stringify(data),
        contentType: CONTENT_TYPE
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
        .then(function(json) {
            return json.todos;
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
            .done(function(json) {
                if (json.todos) {
                    ServerActions.todosDiscoverySuccess(json.todos.href);
                }
            })
    },

    loadTodos: function(todosUrl) {
        // TODO handle fail
        get(todosUrl)
            .then(function(json) {
                return _getTodos(todosUrl, json.todos)
            })
            .done(function() {
                rawTodos = arguments;
                ServerActions.receiveTodos(rawTodos);
            })
    },

    addTodo: function(todosUrl, data) {
        // TODO handle failure
        post(todosUrl, data)
            .done(function(json) {
                ServerActions.createdTodo(json.todos);
            })
    },

    updateTodo: function(todosUrl, object) {
        // TODO handle feedback done/fail
        data = {
            todos: object
        };
        put(todosUrl + "/" + object.id, data)
            .done(function(json, textStatus, jqXHR) {
                // ServerActions.updatedTodo(object.id)
            })
            .fail(function() {
                // ServerActions.updatedTodoFailed(reason)
                // Api.getTodo(todosUrl, object.id)
            })
    }

};

module.exports = Api;
