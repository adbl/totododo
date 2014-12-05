var React = require('react');
var bs = require('react-bootstrap');
var PageHeader = bs.PageHeader;
var Grid = bs.Grid;
var Col = bs.Col;

var AddForm = require('./AddForm');
var TodoList = require('./TodoList');
var TodoFooter = require('./TodoFooter');

var TodoStore = require('../stores/TodoStore');
var UserActions = require('../actions/UserActions');

var AppComponent = React.createClass({

    getInitialState: function() {
        return {
            isReady: TodoStore.isReady(),
            isDirty: TodoStore.isDirty(),
            todos: TodoStore.getTodos(),
        }
    },

    _checkLoadTodos: function() {
        isReady = TodoStore.isReady();
        if (!this.state.isReady && isReady) {
            UserActions.loadTodos();
        }
    },

    _onChange: function() {
        this._checkLoadTodos();
        this.setState(this.getInitialState());
    },

    componentDidMount: function() {
        this._checkLoadTodos();
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    _renderContent: function() {
        if (this.state.isReady) {
            return (
                <div>
                  <div className="clearfix">
                    <AddForm/>
                  </div>
                  <TodoList/>
                  <h1/>
                  <TodoFooter todos={this.state.todos} 
                      isDirty={this.state.isDirty}/>
                </div>
            );
        }
    },

    render: function() {
        return (
            <Grid>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <PageHeader>totododo</PageHeader>
              </Col>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                {this._renderContent()}
              </Col>
            </Grid>
        )
    }

});

module.exports = AppComponent;
