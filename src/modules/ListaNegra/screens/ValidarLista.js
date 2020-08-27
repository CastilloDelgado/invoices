import React from 'react'
import { Table, Icon, Popup } from 'semantic-ui-react'
import { CustomLoader } from '../../_custom'
import { listaNegraActions } from '..'
import { connect } from 'react-redux'

class ValidarLista extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      columnas: "",
      datos: ""
    }
  }

  llenarTabla = (data) => {
    let body = data.map((x, i) => {
      return(
        <Table.Row
        className = {(typeof data[i][0] == "string" && (data[i][1] == 0 || data[i][1] == 1 || data[i][1] == 2)) ? "positive" : "negative" }
        key={i}>
          <Table.Cell>{i+1}</Table.Cell>
          <Table.Cell>{x[0]}</Table.Cell>
          <Table.Cell>{x[1]}</Table.Cell>
        </Table.Row>
      );
    });
    return body
  }

  componentDidMount(){
    this.setState({
      columnas: this.props.cols,
      datos: this.props.data
    })
  }

  render(){
    const {columnas, datos, requesting} = this.state
    if(requesting && !columnas){
      return(
        <CustomLoader />
      )
    }
    else if(columnas && datos){
      this.props.validarListaNegra({columnas, datos})
      return(
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nº</Table.HeaderCell>
              <Table.HeaderCell>{columnas[0].name}</Table.HeaderCell>
              <Table.HeaderCell>{columnas[1].name}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.llenarTabla(datos)}
          </Table.Body>
        </Table>
      );
    } else{
      return(null)
    }
  }
}


const mapStateToProps = (state) => {
  return{
    cols: state.listaNegra.cols,
    data: state.listaNegra.data,
    requesting: state.listaNegra.requesting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    validarListaNegra: (table) => dispatch(listaNegraActions.validarListaNegra(table))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidarLista)
