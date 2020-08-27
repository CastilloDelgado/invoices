import React from 'react'
import { connect } from 'react-redux';
import { Header, Divider, Grid, Button, Modal, GridRow,Label} from 'semantic-ui-react';
//import Currency from 'react-currency-formatter';
import XLSX from 'xlsx';

const square = { width: '100%' }


const CorteResponse = ({csv}) => {

     const handleClick=() =>{
      /* convert from array of arrays to workbook */
      var worksheet = XLSX.utils.aoa_to_sheet(csv);
      var new_workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
      let tempDate =  new Intl.DateTimeFormat('es-MX').format(new Date());
      XLSX.writeFile(new_workbook, 'Poliza '+tempDate+'.csv');
    };

    return (
        <Grid centered padded style={square}>
          <Grid.Column>
            <Header as='h2' icon textAlign='center'>
              <GridRow>
                <Label> Corte creado correctamente</Label>
              </GridRow>
                <Divider horizontal> </Divider>
                {/*
                <Button size='big' positive onClick={()=>handleClick()}>Descargar</Button>*/ }
                <Button size='big' href="./corte">Regresar</Button>
            </Header>
          </Grid.Column>
        </Grid>
    );
}

const mapStateToProps = (state) => {
  return {
    csv: state.corte.csv
  }
}

export default connect(mapStateToProps)(CorteResponse)

