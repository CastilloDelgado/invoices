import React from 'react'
import { Table, Icon, Popup, Input } from 'semantic-ui-react'
import { CustomLoader } from '../../_custom';
import { connect } from 'react-redux'

class ValidarFacturaXML extends React.Component{
  state = {  }
  constructor(props){
    super(props)
  }


  render(){
    const { facturas, requesting } = this.props;

    const validarFactura = (factura) => {
      //console.log(factura)
      let comprobante = factura["cfdi:Comprobante"];
      let result = [];
      comprobante.TipoDeComprobante==="I" ? result[2]="" : result[2]=<Popup content="Este archivo no es una factura" trigger={<Icon name="attention"/>}/>;
      return result;
    }

    const  agregarFacturas = (datos) => {
      let filas = datos.map((x, i) => {
        let comprobante = x["cfdi:Comprobante"]
        let Impuestos = comprobante["cfdi:Impuestos"];
        console.log(comprobante);
        let status = validarFactura(x, i);
        return(
          <Table.Row className={status[0]} key={i}>
            <Table.Cell>{status[2]}{i+1}</Table.Cell>
            <Table.Cell>{(comprobante.Serie ? comprobante.Serie + "-" : "" )+ comprobante.Folio}</Table.Cell>
            <Table.Cell>{comprobante.Total}</Table.Cell>
            <Table.Cell>{status[1]}{comprobante.MetodoPago}</Table.Cell>
            <Table.Cell>{status[1]}{comprobante.FormaPago}</Table.Cell>
            <Table.Cell>{status[1]}{typeof(Impuestos) === 'undefined' ? 0: Impuestos.TotalImpuestosTrasladados}</Table.Cell>
            <Table.Cell>{status[1]}{typeof(Impuestos) === 'undefined' ? 0:  Impuestos.TotalImpuestosRetenidos}</Table.Cell>
          </Table.Row>
        )
      });
      return filas;
    }
    return(
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nº</Table.HeaderCell>
              <Table.HeaderCell>Serie - Folio</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Método de Pago</Table.HeaderCell>
              <Table.HeaderCell>Forma de Pago</Table.HeaderCell>
              <Table.HeaderCell>Total Impuesto Tras</Table.HeaderCell>
              <Table.HeaderCell>Total Impuesto Ret</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { facturas ? agregarFacturas(facturas) : null }
          </Table.Body>
        </Table>
        { requesting ? <CustomLoader /> : null }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const mapStateToProps = (state) => {
  return{
    requesting: state.factura.requesting,
    facturas: state.factura.strings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidarFacturaXML);
