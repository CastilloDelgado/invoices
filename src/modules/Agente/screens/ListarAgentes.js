import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import AgentesList from './AgentesList';


const ListarAgentes = ({match}) => (
    <Grid columns={1} style={{ marginLeft: "0.5vw" }}>
        <Grid.Row>
            <Header as='h4'>Listar Proveedores</Header>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <AgentesList match={match}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    
);

export default ListarAgentes;
