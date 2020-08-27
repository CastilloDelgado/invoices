import React from 'react'
import { Table, Icon, Popup, Input, Dropdown } from 'semantic-ui-react'
import { CustomLoader } from '../../_custom';
import { connect } from 'react-redux'
import { xmlActions, cediOptions } from '../'

class ValidarXML extends React.Component{
  state = { }

  render(){
    const { facturas, requesting } = this.props;

    const validarFactura = (factura) => {
      let comprobante = factura["cfdi:Comprobante"];
      let result = [];
      comprobante.TipoDeComprobante==="I" ? result[4]="" : result[4]=<Popup content="Este archivo no es una factura" trigger={<Icon name="attention"/>}/>;
      (comprobante.MetodoPago==="PPD" && comprobante.FormaPago==="99" || comprobante.MetodoPago==="PUE" && comprobante.FormaPago==="03") && comprobante["cfdi:Receptor"].UsoCFDI==='G03' ? result[0]="positive" :  result[0]="negative";

      if(comprobante.MetodoPago==="PPD"){
        result[1]=<Icon name="checkmark" />
        if(comprobante.FormaPago==="99"){
          result[2]=<Icon name="checkmark" />
        } else {
          result[2]=<Popup content="La forma de pago debe ser '99'" trigger={<Icon name="close"/>}/>
        }
        //comprobante.MetodoPago === "PPD" ? result[1]=<Icon name="checkmark" /> : result[1]=<Popup content="El método de pago debe ser 'PPD'" trigger={<Icon name="close"/>}/>
      }

      else if(comprobante.MetodoPago === "PUE"){
        result[1]=<Icon name="checkmark" />
        if(comprobante.FormaPago==="03"){
          result[2]=<Icon name="checkmark" />
        } else{
          result[2]=<Popup content="La forma de pago debe ser '03'" trigger={<Icon name="close"/>}/>
        }
      }

      else{
        result[1]=<Popup content="El metodo de pago no es valido" trigger={<Icon name="close" />}/>
        result[2]=<Popup content="La forma de pago no está definida" trigger={<Icon name="close"/>}/>
      }

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
              {(comprobante.MetodoPago==="PPD" && comprobante.FormaPago==="99" || comprobante.MetodoPago==="PUE" && comprobante.FormaPago==="03") && comprobante["cfdi:Receptor"].UsoCFDI==='G03'
              ? <Input
                name={i}
                onChange={async (e) => {
                  let auxJobs = this.state.jobs
                  auxJobs = {
                    ...auxJobs,
                    [e.target.name]: e.target.value
                    }
                  await this.setState({ jobs: auxJobs })
                  this.props.cargarJobs(this.state.jobs);
                }}

                placeholder="Ingresa el JOB de la factura..." />
              : null}
            </Table.Cell>
            <Table.Cell>
            {(comprobante.MetodoPago==="PPD" && comprobante.FormaPago==="99" || comprobante.MetodoPago==="PUE" && comprobante.FormaPago==="03") && comprobante["cfdi:Receptor"].UsoCFDI==='G03'
              ? <Dropdown
                name={i}
                options={cediOptions}
                selection
                search
                onChange={async (e, data) => {
                  let auxCedis = this.state.cedis
                  auxCedis = {
                    ...auxCedis,
                    [data.name]: data.value
                  }
                  await this.setState({cedis:auxCedis })
                  this.props.cargarCedi(this.state.cedis);
                }}
                placeholder="Ingresa el Branch..." />
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
              <Table.HeaderCell>Branch</Table.HeaderCell>
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
    cargarJobs: (jobs) => dispatch(xmlActions.cargarJobs(jobs)),
    cargarCedi: (cedi) => dispatch(xmlActions.cargarCedi(cedi))
  }
}

const mapStateToProps = (state) => {
  return{
    requesting: state.proveedores.requesting,
    facturas: state.proveedores.strings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidarXML);
