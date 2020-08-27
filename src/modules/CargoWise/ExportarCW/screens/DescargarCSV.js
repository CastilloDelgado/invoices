import React from 'react'
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import XLSX from 'xlsx';
import { connect } from 'react-redux'
import { exportarCWActions } from '../'

class DescargarCSV extends React.Component {
  constructor(props){
    super(props)
    this.supress = this.supress.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  supress = (event, data) => { this.props.step1() }

  handleClick = (e) => {
    let arrayOfArrays = []
    const { facturasCSV } = this.props
    this.props.updateInvoiceStatus(facturasCSV.invoiceToChangeStatus)
    facturasCSV.facturasCSV.forEach(x => {
      x.forEach(y => {
        if(typeof y[0] === "object"){
          y.forEach(z => {
            arrayOfArrays.push(z)
          })
        } else{
          arrayOfArrays.push(y)
        }
      })
    })

    /* convert from array of arrays to workbook */
    var worksheet = XLSX.utils.aoa_to_sheet(arrayOfArrays);
    var new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
    XLSX.writeFile(new_workbook, 'text.csv')
  }

  render(){
    return(
      <Segment placeholder>
        <Header icon>
          <Icon name="download"/>
          Descargar CSV de facturas.
        </Header>
        <Segment.Inline>
          <Button.Group>
            <Button negative onClick={this.supress}>Cancelar</Button>
            <Button.Or text="ó"></Button.Or>
            <Button positive onClick={this.handleClick}>Descargar</Button>
          </Button.Group>
        </Segment.Inline>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    facturasCSV: state.cw.facturasCSV,
    steps: state.cw.steps
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    step1: () => dispatch(exportarCWActions.step1()),
    updateInvoiceStatus: (invoices) => dispatch(exportarCWActions.updateInvoiceStatus(invoices))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DescargarCSV)
