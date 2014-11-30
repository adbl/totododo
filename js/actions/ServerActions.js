var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ServerActions = {

    todosDiscoverySuccess: function(href) {
        AppDispatcher.handleServerAction({
            actionType: Constants.TODOS_DISCOVER_SUCCESS,
            url: href
        });
    }
};

module.exports = ServerActions;
