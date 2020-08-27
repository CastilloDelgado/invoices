import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import CuentasList from './CuentasList';


const ListarCuentas = () => (
    <Grid columns={1} style={{ marginLeft: "0.5vw" }}>
        <Grid.Row>
            <Header as='h4'>Listar Cuentas</Header>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <CuentasList/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    
);

export default ListarCuentas;
