import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { ImportSheet } from '../../ExcelSheets';
import { agentesActions } from '..';
import { ImportStatus } from '.'


const ImportarAgentes = () => (
    <Grid columns={1} style={{ marginLeft: "0.5vw" }}>
        <Grid.Row>
            <Grid.Column>
                <Header size='tiny'>Importar desde excel</Header>
                <ImportSheet callback={agentesActions.createImport}/>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <ImportStatus/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
    
);

export default ImportarAgentes;
