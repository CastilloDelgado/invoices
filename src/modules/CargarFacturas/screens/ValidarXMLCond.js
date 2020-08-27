import React from 'react'
import { Table, Icon, Popup, Input } from 'semantic-ui-react'
import { CustomLoader } from '../../_custom';
import { connect } from 'react-redux'
import { xmlActions } from '../'

class ValidarXMLCond extends React.Component{
  state = {  }

  render(){
    const { facturas, requesting } = this.props;

    const validarFactura = (factura) => {
      console.log(factura)
      let comprobante = factura["cfdi:Comprobante"];
      let result = [];
      comprobante.TipoDeComprobante==="I" ? result[4]="" : result[4]=<Popup content="Este archivo no es una factura" trigger={<Icon name="attention"/>}/>;
      comprobante.MetodoPago==="PPD" && comprobante.FormaPago==="99" && comprobante["cfdi:Receptor"].UsoCFDI==='G03' ? result[0]="positive" :  result[0]="negative";
      comprobante.MetodoPago==="PPD"                 ? result[1]=<Icon name="checkmark" /> : result[1]=<Popup content="El método de pago debe ser 'PPD'" trigger={<Icon name="close"/>}/>;
      comprobante.FormaPago==="99"                   ? result[2]=<Icon name="checkmark" /> : result[2]=<Popup content="La forma de pago debe ser '99'" trigger={<Icon name="close"/>}/>;
      comprobante["cfdi:Receptor"].UsoCFDI==='G03'   ? result[3]=<Icon name="checkmark" /> : result[3]=<Popup content="El uso de CFDi debe ser 'G03'" trigger={<Icon name="close"/>}/>;
      return result;
    }

    const  agregarFacturas = (datos) => {
      let filas = datos.map((x, i) => {
        let comprobante = x["cfdi:Comprobante"]
        let status = validarFactura(x, i);
        return(
          <Table.Row className={status[0]} key={i}>
            <Table.Cell>{status[4]}{i+1}</Table.Cell>
            <Table.Cell>{(comprobante.Serie ? comprobante.Serie + "-" : "" )+ comprobante.Folio}</Table.Cell>
            <Table.Cell>{comprobante.Total}</Table.Cell>
            <Table.Cell>{status[1]}{comprobante.MetodoPago}</Table.Cell>
            <Table.Cell>{status[2]}{comprobante.FormaPago}</Table.Cell>
            <Table.Cell>{status[3]}{comprobante["cfdi:Receptor"].UsoCFDI}</Table.Cell>
            <Table.Cell>
              {comprobante.MetodoPago==="PPD" && comprobante.FormaPago==="99" && comprobante["cfdi:Receptor"].UsoCFDI==='G03'
              ? <Input
                name={i}
                onChange={async (e) => {
                  await this.setState({ [e.target.name]: e.target.value })
                  this.props.cargarJobs(this.state);
                }}
                placeholder="Ingresa el JOB de la factura..." />
              : null}
            </Table.Cell>
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
              <Table.HeaderCell>Uso de CFDi</Table.HeaderCell>
              <Table.HeaderCell>Job</Table.HeaderCell>
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
    cargarJobs: (jobs) => dispatch(xmlActions.cargarJobs(jobs))
  }
}

const mapStateToProps = (state) => {
  return{
    requesting: state.proveedores.requesting,
    facturas: state.proveedores.strings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidarXMLCond);
