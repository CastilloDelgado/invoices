import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Modal, Icon} from 'semantic-ui-react';
import Currency from 'react-currency-formatter';
import { CustomLoader } from '../../_custom';
import { facturaActions } from '..';

const columnasNecesarias = [
  'Receptor',
  'Cantidad',
  'Descripcion',
  'ValorUnit',
  'FormaDePago',
  'MetodoDePago',
];

const columnasResultado = [
  'Receptor',
  'Cantidad',
  'Descripcion',
];

class ImportMassiveStatus extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      modalStatus: false
    }
  }

  onSubmit = () => {
    const {cols, data} = this.props;
    let idCompany = JSON.parse(localStorage.getItem('company')).id;
    let table = {
      ...this.state,
      idCompany
    }
    this.props.createMassiveImport({cols, data, idCompany});
  }

  onClick = () => {
    this.props.clearMassiveImport();
  }

  render(){
    const {data, cols, requesting, response, status} = this.props;
    var created = false;

    if(status && cols && data){
      this.state.modalStatus = true;
      let direcciones = [];
      for(let x=0; x<columnasResultado.length; x++){
        for(let i=0; i<(cols.length-1); i++){
          if(cols[i].name === columnasResultado[x]){
            direcciones.push(i);
          }
        }
      }
      return(
        <Modal size='large' open={this.state.modalStatus}>
          <Modal.Header>Resultado de las facturas</Modal.Header>
          <Modal.Content scrolling>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  {showHeaders(columnasResultado, response.data)}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {showData(data, direcciones, response.data)}
              </Table.Body>
            </Table>
            <p> *** Nota: Si hay errores en tus facturas es necesario corregirlas y volver a cargar unicamente las que no fueron timbradas. *** </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
            primary
            onClick = {this.onClick}
            >
              Cerrar
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }

    else if(requesting && cols && data && this.state.modalStatus){
      created = true;
      return(
        <Modal size='large' open={this.state.modalStatus}>
          <CustomLoader />
        </Modal>
      );
    }

    else if(requesting){
      return <CustomLoader />
    }

    else if(cols && data){
      this.state.modalStatus = true;
      let direcciones = [];
      for(let x=0; x<columnasNecesarias.length; x++){
        for(let i=0; i<(cols.length-1); i++){
          if(cols[i].name === columnasNecesarias[x]){
            direcciones.push(i);
          }
        }
      }
      if(requesting){
        return(null);
      } else{
        return(
          <Modal size='large' open={this.state.modalStatus}>
            <Modal.Header>Valida los datos necesarios: </Modal.Header>
            <Modal.Content scrolling>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    {showHeaders(columnasNecesarias)}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {showData(data, direcciones)}
                </Table.Body>
              </Table>
            </Modal.Content>
            <Modal.Actions>
              <Button
              primary
              onClick = {this.onSubmit}>
                Crear facturas
              </Button>
            </Modal.Actions>
          </Modal>
        );
      }
    }
    else{ return(null); }
  };
};

const mapStateToProps = (state) => {
  return{
    cols: state.factura.cols,
    data: state.factura.data,
    requesting: state.factura.requesting,
    response: state.factura.response,
    status: state.factura.status
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createMassiveImport : (table) => dispatch(facturaActions.createMassiveImport(table)),
        clearMassiveImport : () => dispatch(facturaActions.clearMassiveImport())
    }
}

// TABLA PARA MOSTRAR LOS DATOS NECESARIOS DE LA FACTURA
// EN UN MODAL. PRESIONAS  CONTINUAR  PARA  TIMBRAR  LAS
// FACTURAS Y MOSTRAMOS EL  RESULTADO  EN  OTRA  COLUMNA.

function showHeaders(array, result){
  if(result){
    var headers = array.map(function(x){
      return(<Table.HeaderCell key={x}>{x}</Table.HeaderCell>);
    });
    headers.push(<Table.HeaderCell key="1">Resultados</Table.HeaderCell>);
    return headers;
  } else{
    var headers = array.map(function(x){
      return(<Table.HeaderCell key={x}>{x}</Table.HeaderCell>);
    });
    return headers;
  }
}

function showData(arregloDatos, direcciones, result){
  if(result){
    const resultados = [];
    for(let i=0; i<result.length; i++){
      resultados.push(
        <Table.Row key={arregloDatos[i]} className={result[i].timbrado ? "" : "negative"}>
          <Table.Cell key={arregloDatos[i][direcciones[0]]}>{arregloDatos[i][direcciones[0]]}</Table.Cell>
          <Table.Cell key={arregloDatos[i][direcciones[1]]}>{arregloDatos[i][direcciones[1]]}</Table.Cell>
          <Table.Cell key={arregloDatos[i][direcciones[2]]}>{arregloDatos[i][direcciones[2]]}</Table.Cell>
          {result[i].timbrado
            ?
              <Table.Cell>
                <Icon name="check" color="green"></Icon>
                Factura Timbrada
              </Table.Cell>
            :
              <Table.Cell>
                <Icon name="times" color="red"></Icon>
                Factura rechazada:
                {" " + result[i].EFMessageError}
              </Table.Cell>
           }
        </Table.Row>
      );
    }

    return resultados;
  } else{
    const data = arregloDatos.map(function(x){
      return(
        <Table.Row key={x}>
          <Table.Cell key={x[direcciones[0]]}>{x[direcciones[0]]}</Table.Cell>
          <Table.Cell key={x[direcciones[1]]}>{x[direcciones[1]]}</Table.Cell>
          <Table.Cell key={x[direcciones[2]]}>{x[direcciones[2]]}</Table.Cell>
          <Table.Cell key={x[direcciones[3]]}>{x[direcciones[3]]}</Table.Cell>
          <Table.Cell key={x[direcciones[4]]}>{x[direcciones[4]]}</Table.Cell>
          <Table.Cell key={x[direcciones[5]]}>{x[direcciones[5]]}</Table.Cell>
        </Table.Row>
        );
      });
    return data;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportMassiveStatus);
