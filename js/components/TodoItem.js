var React = require('react');
var moment = require('moment');

var bs = require('react-bootstrap');
var Input = bs.Input;
var Glyphicon = bs.Glyphicon;

var UserActions = require('../actions/UserActions');

var TodoItem = React.createClass({

    propTypes: {
        todo: React.PropTypes.object.isRequired,
        dataId: React.PropTypes.number.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
        onDragStart: React.PropTypes.func.isRequired,
        onDragEnd: React.PropTypes.func.isRequired,
        onDragOver: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {hover: false}
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.isDragging) {
            this.setState({hover: false});
        }
    },

    _handleChange: function() {
        UserActions.completeTodo(this.props.todo, !this.props.todo.completed);
    },

    _handleMouseEnter: function(event) {
        if (event.target == this.refs.cell.getDOMNode()) {
            this.setState({hover: true});
        }
        event.stopPropagation();
    },

    _handleMouseLeave: function(event) {
        if (event.target == this.refs.cell.getDOMNode()) {
            this.setState({hover: false});
        }
        event.stopPropagation();
    },

    render: function() {
        var label = this.props.todo.text;
        if (this.props.todo.completed) {
            label = <del>{label}</del>;
        }

        hoverStyle = {
            opacity: this.state.hover ? 0.5 : 0
        }

        var statusText = "";
        if (this.props.todo.completed) {
            statusText = "done " + this.props.todo.completed.fromNow();
        }

        return (
          <tr data-id={this.props.dataId}
              className={this.props.isDragging ? "info" : ""}
              draggable="true"
              onDragStart={this.props.onDragStart}
              onDragEnd={this.props.onDragEnd}
              onDragOver={this.props.onDragOver}>
            <td ref="cell"
                onMouseEnter={this._handleMouseEnter}
                onMouseLeave={this._handleMouseLeave}>

              <div className="todo-checkbox col-xs-6">
                <div className="checkbox">
                  <label>
                    <input type="checkbox"
                      checked={this.props.todo.completed}
                      onChange={this._handleChange} />
                    <span>{label}</span>
                  </label>
                </div>
              </div>
              <div className="todo-right col-xs-5">
                <small style={hoverStyle}>
                  {statusText}
                </small>
              </div>
              <div className="todo-right col-xs-1" style={hoverStyle}>
                <Glyphicon className="todo-move-icon" glyph="resize-vertical" />
              </div>
            </td>
          </tr>
        )
    },

});

module.exports = TodoItem;
