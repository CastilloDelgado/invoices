import React from 'react'
import { Grid, Button, Container, Header, Icon } from 'semantic-ui-react'
import { CustomLoader } from '../../_custom'
import { ImportSheet } from '../../ExcelSheets'
import { ValidarLista } from '.'
import { listaNegraActions } from '..'
import { connect } from 'react-redux'

class ImportarListaNegra extends React.Component {
  constructor(props) {
    super(props)

  }

  validarLista = (datos) => {
    if (datos) {
      if (datos.length === 0) {
        return ("Tu archivo es correcto")
      } else {

        let err = datos.map((x) => {
          let rfc = "";
          let status = ""
          typeof x[1][0] != "string" ? rfc = "'" + x[1][0] + "'" + " no es un texto valido" : rfc = "";
          x[1][1] != 0 && x[1][1] != 1 && x[1][1] != 2 ? status = "'" + x[1][1] + "'" + " debe ser 2, 1 ó 0" : status = "";
          return (
            <li> En la fila {(x[0] + 1)} {rfc}, {status} </li>
          )
        })
        return (
          <div>
            <p>Tu archivo tiene lo siguientes errores: </p>
            <ul> {err} </ul>
            <p>Soluciona los errores y vuelve a intentarlo</p>
          </div>
        )
      }
    }
  }


  handleClick = () => {
    const { cols, data } = this.props
    this.props.cargarListaNegra({ cols, data })
  }

  render() {
    const { cols, data, status, errores, tablaCargada, requesting } = this.props
    return (
      <Container fluid>
        <Header size="small" dividing>
          <Icon name="file" />
          <Header.Content>
            Importar Lista Negra
            <Header.Subheader>Importa tu archivo con los proveedores que se encuentren en listsa negra.</Header.Subheader>
          </Header.Content>
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width="5">
              <Grid.Row>
                <ImportSheet callback={listaNegraActions.showListaNegra} />
              </Grid.Row>
              <Grid.Row>
                <p>Observaciones sobre la lista</p>
                {this.validarLista(errores)}
              </Grid.Row>
              <Grid.Row>
                <Button size="huge" className={status ? status : "disabled"} onClick={this.handleClick} primary>Cargar Lista Negra</Button>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width="10">
              <Grid.Row>
                <div>
                  <ul>
                    <li>Status 0 : Eliminar Proveedor</li>
                    <li>Status 1 : Proveedor Activo</li>
                    <li>Status 2 : Proveedor Inactiva (Lista Negra)</li>
                  </ul>
                </div>
                <Grid.Column>
                  <a href="https://bit.ly/2WW1oZr" target="_blank" rel="noopener noreferrer" download>
                    <Button size='mini'
                    >Descargar Formato</Button>
                  </a>
                </Grid.Column>
              </Grid.Row>
              {(cols && data) ? <ValidarLista /> : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cols: state.listaNegra.cols,
    data: state.listaNegra.data,
    requesting: state.listaNegra.requesting,
    status: state.listaNegra.status,
    errores: state.listaNegra.errores,
    tablaCargada: state.listaNegra.tablaCargada
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    cargarListaNegra: (table) => dispatch(listaNegraActions.cargarListaNegra(table))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportarListaNegra)
