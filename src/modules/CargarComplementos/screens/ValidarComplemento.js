import React from 'react'
import { Table, Icon, Popup } from 'semantic-ui-react'
import { CustomLoader } from '../../_custom'
import { connect } from 'react-redux';
import CurrencyFormat from 'react-currency-format';

class ValidarComplemento extends React.Component{
  render(){
    const { complementos, requesting } = this.props;

    function validarComplemento(complementos){
      let comprobante = complementos["cfdi:Comprobante"]
      let result = []
      comprobante.TipoDeComprobante==="P" ? result[4]="" : result[4]=<Popup content="Este archivo no es un complemento" trigger={<Icon name="attention"/>}/>;
      comprobante.TipoDeComprobante==="P" ? result[0]="positive" : result[0]="negative";
      return result;
    }

    function agregarComplementos(datos){
      if(datos){
        console.log(datos)
        let filas = datos.map((x, i) => {
          let comprobante = x["cfdi:Comprobante"]
          if(comprobante.TipoDeComprobante === "I"){
            let status = validarComplemento(x);
            return(
              <Table.Row className={status[0]} key={i}>
                <Table.Cell>{status[4]}{i+1}</Table.Cell>
                <Table.Cell>{comprobante.Serie + " - " + comprobante.Folio}</Table.Cell>
                <Table.Cell>

                </Table.Cell>
                <Table.Cell>

                </Table.Cell>
              </Table.Row>
            )
          } else{
            let complemento = comprobante["cfdi:Complemento"]["pago10:Pagos"]["pago10:Pago"];
            let status = validarComplemento(x);
            return(
              <Table.Row className={status[0]} key={i}>
                <Table.Cell>{status[4]}{i+1}</Table.Cell>
                <Table.Cell>{comprobante.Serie + " - " + comprobante.Folio}</Table.Cell>
                <Table.Cell>
                  <CurrencyFormat value={complemento.Monto} displayType={'text'} thousandSeparator={true} prefix={'$'}/>
                </Table.Cell>
                <Table.Cell>{comprobante.Fecha}</Table.Cell>
              </Table.Row>
            )
          }
        })
        return filas
      }
      else{
        return null
      }
    }

    return(
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nº</Table.HeaderCell>
              <Table.HeaderCell>Serie - Folio</Table.HeaderCell>
              <Table.HeaderCell>Monto</Table.HeaderCell>
              <Table.HeaderCell>Fecha</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { complementos ? agregarComplementos(complementos) :  null}
          </Table.Body>
        </Table>
        { requesting ? < CustomLoader /> : null }
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return{
    requesting: state.cargarComplementos.requesting,
    complementos: state.cargarComplementos.complementos
  }
}

export default connect(mapStateToProps, null)(ValidarComplemento)
