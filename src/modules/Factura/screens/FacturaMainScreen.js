import React from 'react'
import { Tab, Header, Container, Icon } from 'semantic-ui-react'
import { ImportarFactura, CrearFacturas } from '.';

const panes = [
  { menuItem: 'Importar catálogo', render: () => <Tab.Pane><ImportarFactura/></Tab.Pane> },
  { menuItem: 'Facturas masivas', render: () => <Tab.Pane><CrearFacturas/></Tab.Pane> }
]

const FacturaMainScreen = () => (
  <Container fluid >
    <Header size='small' dividing>
      <Icon name='money bill alternate'/>
      <Header.Content>
        Facturas
        <Header.Subheader>Facturas relacionadas con sus clientes/proveedores</Header.Subheader>
      </Header.Content>
    </Header>
    <Tab 
      menu={{ fluid: true, vertical: true, tabular: 'right' }} 
      grid={{paneWidth: 14, tabWidth: 2}} panes={panes} 
    />
  </Container>
  
)

export default FacturaMainScreen