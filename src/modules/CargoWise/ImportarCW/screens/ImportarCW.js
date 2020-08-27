import React from 'react'
import { Tab, Container, Icon, Header } from 'semantic-ui-react'
import { ImportarChargeCode } from '.'

class ImportarCW extends React.Component {
  render(){
    const panes = [
      { menuItem: 'Charge Code(s)', render: () => <Tab.Pane><ImportarChargeCode/></Tab.Pane> },
      { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
      { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
    ]

    return(
      <Container fluid>
        <Header size="small" dividing>
          <Icon name="cloud download"/>
          <Header.Content>
            Importar Información de CargoWise
            <Header.Subheader>Importar</Header.Subheader>
          </Header.Content>
        </Header>
        <Tab
          menu={{fluid: true, vertical: true, tabular: true}}
          panes={panes}
          grid={{paneWidth: 14, tabWidth: 2}}
        />
      </Container>
    )
  }
}

export default ImportarCW
