import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { ImportSheet } from '../../ExcelSheets';
import { facturaActions } from '..';
import { ImportStatus } from '.'
import ImportarFacturaMasiva from './ImportarFacturaMasiva'



const CrearFacturas = () => (
    <Grid columns={1} style={{ marginLeft: "0.5vw" }}>
        <Grid.Row>
            <Header as='h4'>Generar CFDi's masivamente</Header>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
              <ImportarFacturaMasiva />
            </Grid.Column>
        </Grid.Row>
    </Grid>

);

export default CrearFacturas;
