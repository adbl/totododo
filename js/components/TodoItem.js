var React = require('react');
var bs = require('react-bootstrap');
var Input = bs.Input;

var TodoItem = React.createClass({

    propTypes: {
        todo: React.PropTypes.object.isRequired
    },

    render: function() {
        return (
          <tr>
            <td>
              <Input type="checkbox" label={this.props.todo.text} />
            </td>
          </tr>
        )
    },

});

module.exports = TodoItem;
