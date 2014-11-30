var React = require('react');
var bs = require('react-bootstrap');
var PageHeader = bs.PageHeader;
var Grid = bs.Grid;
var Col = bs.Col;

var AppComponent = React.createClass({

    render: function() {
        return (
            <Grid>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <PageHeader>totododo</PageHeader>
              </Col>
              <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                <p>Etiam sed venenatis ex. Suspendisse potenti. Aliquam tincidunt tincidunt euismod. Duis et interdum ante. Etiam finibus et orci ut venenatis. Vivamus et ullamcorper sem. Nulla non arcu massa. Morbi ligula dui, blandit vitae porta quis, dictum sed lectus. Integer condimentum vitae magna eu hendrerit.</p>

                <p>Aliquam non molestie massa. Proin tincidunt eget orci eget blandit. Ut velit tellus, tempus sit amet tortor sed, sodales cursus felis. Nunc fringilla cursus aliquam. Donec ac felis nunc. Nam sollicitudin auctor nibh, eget pellentesque lectus molestie sed. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus tincidunt metus sit amet sem pulvinar interdum.</p>

                <p>Mauris dui turpis, tempor vitae est et, luctus efficitur mi. Duis condimentum posuere mollis. Sed quis leo vehicula ante mattis laoreet. Quisque tempus risus leo. Aenean iaculis porttitor lacus. Donec rutrum, mauris a consectetur sollicitudin, purus enim tempus justo, non tincidunt libero lacus sed mi. Phasellus eget lacinia dui, quis bibendum massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

                <p>Sed lacinia, nunc id consectetur laoreet, ipsum lectus auctor nibh, quis auctor enim dui luctus enim. Suspendisse vel enim non velit ullamcorper lobortis. Maecenas ut est sit amet felis ultrices commodo ac ac tellus. Vestibulum a volutpat dolor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer nec volutpat nisl, aliquet tempor massa. Donec pharetra, lectus sed vestibulum ultrices, libero sapien cursus libero, id accumsan justo mi et dolor. Proin dictum erat et odio ullamcorper, vitae volutpat ligula tristique. Sed tincidunt neque ac efficitur vehicula. Vivamus accumsan dui varius eros efficitur finibus. Duis aliquet molestie sapien tincidunt scelerisque. In sollicitudin non nisl id aliquam.</p>
              </Col>
            </Grid>
        )
    }

});

module.exports = AppComponent;
