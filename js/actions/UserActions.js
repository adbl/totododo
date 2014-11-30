var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var TodoStore = require('../stores/TodoStore');

var Api = require('../services/Api');

var UserActions = {

    discoverApi: function() {
        AppDispatcher.handleViewAction({
            actionType: Constants.DISCOVER_API
        });
        Api.discover();
    }

};

module.exports = UserActions;
