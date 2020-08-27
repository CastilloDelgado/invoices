import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { ImportSheet } from '../../ExcelSheets';
import { facturaActions } from '..';
import { ImportMassiveStatus } from '.';

class ImportarFacturaMasiva extends Component{


  render(){
    return(

      <Grid colums={1} style={{marginLeft: "0.5vw"}}>
        <Grid.Row>
          <Grid.Column>
            <ImportSheet callback={facturaActions.showMassiveImport} />
            <ImportMassiveStatus/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ImportarFacturaMasiva;
