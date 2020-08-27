import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { ImportSheet } from '../../ExcelSheets';
import { facturaActions } from '..';
import { ImportStatus } from '.'


const ImportarFactura = () => (

    <Grid columns={1} style={{ marginLeft: "0.5vw" }}>
        <Grid.Row>
            <Header as='h4'>Importar facturas de agentes</Header>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <ImportSheet callback={facturaActions.createImport}/>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <ImportStatus />
            </Grid.Column>
        </Grid.Row>
    </Grid>

);

export default ImportarFactura;
