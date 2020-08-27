import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { ImportSheet } from '../../ExcelSheets';
import { cuentasActions } from '..';
import { ImportStatus } from '.'


const ImportarCuentas = () => (
    <Grid columns={1} style={{ marginLeft: "0.5vw" }}>
        <Grid.Row>
            <Header as='h4'>Importar Cuentas</Header>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <ImportSheet callback={cuentasActions.createImport}/>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <ImportStatus/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    
);

export default ImportarCuentas;
