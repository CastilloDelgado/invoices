import React from 'react'
import { Tab, Header, Container, Icon } from 'semantic-ui-react'
import { ImportarCuentas, ListarCuentas } from '.';

const panes = [
  { menuItem: 'Importar', render: () => <Tab.Pane><ImportarCuentas/></Tab.Pane> },
  { menuItem: 'Listar', render: () => <Tab.Pane><ListarCuentas/></Tab.Pane> },
  { menuItem: 'Crear', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]

const CuentasMainScreen = () => (
  <Container fluid >
    <Header size='small' dividing>
      <Icon name='book'/>
      <Header.Content>
        Cuentas
        <Header.Subheader>Relacione catálogo de RFC y cuentas</Header.Subheader>
      </Header.Content>
    </Header>
    <Tab 
      menu={{ fluid: true, vertical: true, tabular: 'right' }} 
      grid={{paneWidth: 14, tabWidth: 2}} panes={panes} 
    />
  </Container>
  
)

export default CuentasMainScreen