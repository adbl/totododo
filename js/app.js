var React = require('react');
var AppComponent = require('./components/AppComponent');
var UserActions = require('./actions/UserActions');

UserActions.discoverApi();

React.render(
    <AppComponent/>,
    document.getElementById('main')
);
