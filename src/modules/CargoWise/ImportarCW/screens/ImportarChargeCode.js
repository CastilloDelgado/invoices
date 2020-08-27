import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { ImportSheet } from '../../../ExcelSheets'
import { importarCWActions } from '../'

class ImportarChargeCode extends React.Component {
  render(){
    return(
      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Header size="tiny">Importa tu relación CHARGE CODE - CLAVE PRODUCTO SERVICIO (SAT) </Header>
            <ImportSheet callback={importarCWActions.createImport}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default ImportarChargeCode
