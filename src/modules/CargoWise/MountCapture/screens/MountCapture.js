import React from 'react'
import {Header, Icon, Container} from 'semantic-ui-react'
import {InvoiceList} from "."

class MountCapture extends React.Component {
    render(){
        return(
            <Container fluid>
                <Header size="small" dividing>
                    <Icon name="money"/>
                    <Header.Content>
                        Capturar Montos para Facturas con Multiples Files (Jobs)
                        <Header.Subheader>Aquí puedes capturar los montos asignados a las facturas con varios files.</Header.Subheader>
                    </Header.Content>
                </Header>
                <InvoiceList />
            </Container>
        )
    }
}

export default MountCapture