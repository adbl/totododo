var React = require('react');
var bs = require('react-bootstrap');
var PageHeader = bs.PageHeader;
var Grid = bs.Grid;
var Col = bs.Col;

var AddForm = require('./AddForm');

var AppComponent = React.createClass({

    render: function() {
        return (
            <Grid>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <PageHeader>totododo</PageHeader>
              </Col>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <AddForm/>
              </Col>
            </Grid>
        )
    }

});

module.exports = AppComponent;
