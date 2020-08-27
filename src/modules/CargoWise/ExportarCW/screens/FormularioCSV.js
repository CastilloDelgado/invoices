import React from 'react'
import { Form, List, Divider, Select, Button , Grid} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { exportarCWActions } from '../'

class FormularioCSV extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      proveedores: [],
      provSeleccionados:[],
      loading: ""
    }

    this.handleSelection = this.handleSelection.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.supress = this.supress.bind(this)
  }

  supress = (event, data) => { this.props.step1() }

  handleClick = (event, data) => {
    this.setState({
      provSeleccionados: this.state.provSeleccionados.filter(proveedor => proveedor != data.value)
    })
  }

  handleButtonClick = (event, data) => {
    if(this.state.provSeleccionados[0]){
      this.props.step2()
      this.props.crearCSV(this.state.provSeleccionados, JSON.parse(localStorage.getItem('user')).user.id)
    }
  }

  handleSelection = (event, data) => {
    if(this.state.provSeleccionados.find(proveedor => proveedor === data.value)){
    } else{
      this.setState({
        provSeleccionados: this.state.provSeleccionados.concat(data.value)
      })
    }
  }

  componentDidMount(){
    this.props.getAgentes()
  }

  render(){
    let agentes = []
    if(this.props.agentes){
      agentes.push({
        key: 'Todos',
        text: 'Todos',
        value: {"key": 'Todos', "text": 'Todos', "value": 'Todos', "rfc": "Todos"}
      })
      this.props.agentes.agentes.forEach(x => {
        agentes.push({
          key: x.key,
          text: x.nombre,
          value: x
        })
      })
    }

    return(
      <Form className={this.props.loading}>
        <Form.Group>
          <Form.Select
            selection
            width="8"
            label="Proveedor(es)"
            placeholder="Selecciona Proveedor(es)"
            search
            options={agentes}
            onChange={this.handleSelection}
            ></Form.Select>
          <List size="huge" celled fluid divided width="7">
            {this.state.provSeleccionados.map(x => {
              return(
                <List.Item
                  key={x}
                  value={x}
                  onClick={this.handleClick}>
                  <List.Content>{x.rfc}</List.Content>
                </List.Item>
              )
            })}
          </List>
        </Form.Group>
        <Divider />
        <Grid>
          <Grid.Column width="5"></Grid.Column>
          <Grid.Column width="5">
            <Button.Group fluid width="10">
              <Button negative>Cancelar</Button>
              <Button.Or text="or"></Button.Or>
              <Button primary onClick={this.handleButtonClick}>Continuar</Button>
            </Button.Group>
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAgentes: () => dispatch(exportarCWActions.getAgentes()),
    step1: () => dispatch(exportarCWActions.step1()),
    step2: () => dispatch(exportarCWActions.step2()),
    crearCSV: (agentes, idUsuario) => dispatch(exportarCWActions.crearCSV(agentes, idUsuario)),
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.cw.loading,
    agentes: state.cw.agentes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormularioCSV)
