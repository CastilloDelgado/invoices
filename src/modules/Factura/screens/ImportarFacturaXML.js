import React from 'react';
import { Grid, Container, Header, Icon } from 'semantic-ui-react';
import { ValidarFacturaXML, XmlFacturaInput } from '.';
import { connect } from 'react-redux';

class ImportarFacturaXML extends React.Component{
  render(){
    return(
      <Container fluid>
        <Header size="small" dividing>
          <Icon name="file"/>
          <Header.Content>
            Importar Facturas Masivas(XML)
            <Header.Subheader>Aquí puedes cargar tus facturas en formato XML</Header.Subheader>
          </Header.Content>
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width="5">
              <XmlFacturaInput />
            </Grid.Column>
            <Grid.Column width="10">
              <ValidarFacturaXML/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  };
}

export default connect()(ImportarFacturaXML)
