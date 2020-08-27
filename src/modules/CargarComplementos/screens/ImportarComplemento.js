import React from 'react'
import { Grid, Container, Header, Icon } from 'semantic-ui-react'
import { InputComplemento, ValidarComplemento } from '.'
import { connect } from 'react-redux'

class ImportarComplemento extends React.Component {
  render(){
    return(
      <Container fluid>
        <Header size="small" dividing>
          <Icon name="file"/>
          <Header.Content>
            Importar Complementos (XML)
            <Header.Subheader>Aquí podrás importar tus complementos de pago.</Header.Subheader>
          </Header.Content>
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width="5">
              <InputComplemento />
            </Grid.Column>
            <Grid.Column width="10">
              <ValidarComplemento />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

    );
  }
}

export default ImportarComplemento
