var ServerActions = require('../actions/ServerActions');

var CONTENT_TYPE = 'application/vnd.api+json';

function get(url, options) {
    return $.get(url, _.assign({
        url: url,
        accepts: CONTENT_TYPE
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
    }

};

module.exports = Api;
