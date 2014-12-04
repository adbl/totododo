var React = require('react');
var bs = require('react-bootstrap');
var Grid = bs.Grid;
var Row = bs.Col;
var Col = bs.Col;
var Input = bs.Input;
var Button = bs.Button;
var Glyphicon = bs.Glyphicon;

var UserActions = require('../actions/UserActions');

var AddForm = React.createClass({

    getInitialState: function() {
        return {
            inputText: ""
        }
    },

    _submit: function() {
        UserActions.createTodo(this.state.inputText.trim())
        this.setState(this.getInitialState());
    },

    _handleInput: function(event) {
        this.setState({inputText: event.target.value})
    },

    _handleKeyDown: function(event) {
        if (event.key == "Enter" && this._allowSubmit()) {
            this._submit();
        }
    },

    _handleClick: function(event) {
        this._submit();
    },

    _allowSubmit: function() {
        return this.state.inputText.trim();
    },

    render: function() {
        return (
          <Row>
            <Col xs={9}>
              <Input type="text" value={this.state.inputText}
                onChange={this._handleInput} onKeyDown={this._handleKeyDown}
                placeholder="What needs to be done?"
                className="input-lg" />
            </Col>
            <Col xs={3}>
              <Button bsSize="large" block
                  bsStyle="primary"
                  disabled={!this._allowSubmit()}
                  onClick={this._handleClick}>
                <Glyphicon glyph="plus" />
              </Button>
            </Col>
          </Row>
        )
    }

});

module.exports = AddForm;
