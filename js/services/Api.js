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

    addTodo: function(todosUrl, data) {
        // TODO handle failure
        post(todosUrl, data)
            .done(function(data) {
                ServerActions.addTodoSuccess(JSON.parse(data));
            })
    }

};

module.exports = Api;
