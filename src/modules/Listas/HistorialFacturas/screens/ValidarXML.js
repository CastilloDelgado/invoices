import React from 'react'
import { Table, Icon, Popup, Input } from 'semantic-ui-react'
import { CustomLoader } from '../../../_custom';
import { connect } from 'react-redux'
import { xmlActions } from '../'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CurrencyFormat from 'react-currency-format';

class ValidarXML extends React.Component{
  state = {  }
  constructor(props){
    super(props)
  }

  render(){
    const {facturas} = this.props;
    console.log(facturas)
    return(
      <div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
        <table id="table-to-xls">
          <tr>
            <th>Nº de Factura</th>
            <th>UUID</th>
            <th>Tipo de Archivo</th>
            <th>Fecha Factura</th>
            <th>Concepto</th>
            <th>Subtotal</th>
            <th>IVA</th>
            <th>Descuento</th>
            <th>Total</th>
          </tr>
          { facturas
            ?
              facturas.map((x,i) => {
                const comprobante = x["cfdi:Comprobante"]
                const impuestos = comprobante["cfdi:Impuestos"].TotalImpuestosTrasladados
                const uuid = comprobante["cfdi:Complemento"]["tfd:TimbreFiscalDigital"].UUID
                return(
                  <tr>
                    <th>
                      {comprobante.Serie ? comprobante.Serie : null}
                      {comprobante.Folio ? comprobante.Folio : null}
                    </th>
                    <th>{uuid ? uuid : null}</th>
                    <th>
                      {comprobante.TipoDeComprobante==="I" ? "FACTURA" : null }
                      {comprobante.TipoDeComprobante==="E" ? "NOTA DE CREDITO ": null}
                      {comprobante.TipoDeComprobante==="P" ? "COMPLEMENTO DE PAGO" : null}
                    </th>
                    <th>{comprobante.Fecha ? comprobante.Fecha : null}</th>
                    <th>
                      {
                        (comprobante["cfdi:Conceptos"]["cfdi:Concepto"][0])
                          ?
                            comprobante["cfdi:Conceptos"]["cfdi:Concepto"][0].Descripcion
                          :
                            comprobante["cfdi:Conceptos"]["cfdi:Concepto"].Descripcion
                      }
                    </th>
                    <th>
                      {
                        comprobante.SubTotal
                        ?
                          <CurrencyFormat
                            value={comprobante.SubTotal}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'} />
                        :
                          0
                      }
                    </th>
                    <th>
                    {
                      impuestos
                        ?
                          <CurrencyFormat
                            value={impuestos}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'} />
                        :
                          0
                      }
                    </th>
                    <th>
                      {
                        comprobante.Descuento
                          ?
                            <CurrencyFormat
                              value={comprobante.Descuento}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'$'} />
                          :
                            0
                      }
                    </th>
                    <th>
                      {
                        comprobante.Total
                          ?
                            <CurrencyFormat
                              value={comprobante.Total}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'$'} />
                          :
                            0
                      }
                    </th>
                  </tr>
                )
              })
            :
            null
          }
        </table>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ValidarXML);
