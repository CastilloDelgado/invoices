import React from 'react'
import { Tab, Header, Container, Icon } from 'semantic-ui-react'
import { ImportarAgentes, ListarAgentes } from '.';

const panes = [
  { menuItem: 'Catálogo', render: (props) => <Tab.Pane><ListarAgentes match={props.match}/></Tab.Pane> },
  { menuItem: 'Importar archivo', render: () => <Tab.Pane><ImportarAgentes/></Tab.Pane> },
  { menuItem: 'Crear nuevo', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  /* { menuItem: 'Tipos de agente', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }, */
]

const AgentesMainScreen = ({match}) => (
  <Container fluid >
    <Header size='small' dividing>
      <Icon name='archive' />
      <Header.Content>
        Proveedores
        <Header.Subheader>Administre su catálogo de Proveedores</Header.Subheader>
      </Header.Content>
    </Header>
    <Tab 
      menu={{ fluid: true, vertical: true, tabular: 'right' }} 
      grid={{paneWidth: 14, tabWidth: 2}} panes={panes} 
    />
  </Container>
  
)

export default AgentesMainScreen