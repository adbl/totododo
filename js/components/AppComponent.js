var React = require('react');
var bs = require('react-bootstrap');
var PageHeader = bs.PageHeader;
var Grid = bs.Grid;
var Col = bs.Col;

var AddForm = require('./AddForm');

var TodoStore = require('../stores/TodoStore');

var AppComponent = React.createClass({

    getInitialState: function() {
        return {isReady: TodoStore.isReady()}
    },

    _onChange: function() {
        this.setState(this.getInitialState());
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var content;
        if (this.state.isReady) {
            content = <AddForm/>;
        }

        return (
            <Grid>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <PageHeader>totododo</PageHeader>
              </Col>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                {content}
              </Col>
            </Grid>
        )
    }

});

module.exports = AppComponent;
