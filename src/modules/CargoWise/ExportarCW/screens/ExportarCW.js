import React from 'react'
import { Tab, Container, Icon, Header } from 'semantic-ui-react'
import { ExportarCSV } from '.'

class ExportarCW extends React.Component {
  render(){
    const panes = [
      { menuItem: 'Facturas CSV', render: () => <Tab.Pane><ExportarCSV/></Tab.Pane> },
      { menuItem: 'Reportes', render: () => <Tab.Pane></Tab.Pane> },
    ]

    return(
      <Container fluid>
        <Header size="small" dividing>
          <Icon name="cloud upload"/>
          <Header.Content>
            Exportar a CargoWise
            <Header.Subheader>Aquí podras expotar la información necesaria para actualizar el sistema CargoWise</Header.Subheader>
          </Header.Content>
        </Header>
        <ExportarCSV />
      </Container>
    )
  }
}

export default ExportarCW
