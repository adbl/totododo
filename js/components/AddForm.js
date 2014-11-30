var React = require('react');
var bs = require('react-bootstrap');
var Input = bs.Input;
var Button = bs.Button;

var AddForm = React.createClass({

    getInitialState: function() {
        return {
            inputText: ""
        }
    },

    _submit: function() {
        // Actions.addTodo(this.state.inputText.trim())
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
            <div>
              <Input type="text" value={this.state.inputText}
                onInput={this._handleInput} onKeyDown={this._handleKeyDown}
                placeholder="What needs to be done?"
                className="input-lg" wrapperClassName="col-xs-8" />
              <Button bsSize="large" className="col-xs-4"
                bsStyle={this._allowSubmit() ? "primary" : "default"}
                disabled={!this._allowSubmit()}
                onClick={this._handleClick}>
                Add Todo
              </Button>
            </div>
        )
    }

});

module.exports = AddForm;
