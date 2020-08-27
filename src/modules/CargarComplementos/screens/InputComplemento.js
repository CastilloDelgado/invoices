import React from 'react'
import { Segment, Header, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { complementosActions } from '../'

class InputComplemento extends React.Component{
  constructor(props){
    super(props);
    this.inputRef = React.createRef()
    this.handleChange = this.handleChange.bind(this)
    this.state = { files: null }
  }

  openDialog = () => { this.inputRef.current.click() }

  supress = () => {
    this.setState({files: null})
    this.props.clearComplementos()
  }

  handleChange(e){
    const files = e.target.files
    if(files[0]){
      this.setState({files: files})
    }
    this.props.showComplementos(files)
  }

  loadComplemento = () => { this.props.cargarComplementos(this.props.complementos) }

  render(){
    const { files } = this.state
    const { complementos } = this.props
    return(
      <Segment placeholder>
        <Header icon onClick={this.openDialog}>
          <Icon name="file outline" />
          <p>Da click sobre el icono para<br /> agregar tus complementos XML </p>
          <Header.Subheader> { files ? "Hay " + files.length + " archivo(s) cargado(s)" : "No hay archivos"} </Header.Subheader>
        </Header>
        <input
          type="file"
          id="file"
          ref={this.inputRef}
          style={{display: "none"}}
          accept=".xml"
          onChange={this.handleChange}
          multiple
        />
        <Button.Group>
          <Button onClick={this.supress}>Cancelar</Button>
          <Button.Or text="ó"/>
          <Button positive className={complementos ? "enabled" : "disabled"} onClick={this.loadComplemento}>Subir Archivos</Button>
        </Button.Group>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => { return { complementos: state.cargarComplementos.complementos } }
const mapDispatchToProps = (dispatch) => {
  return {
    showComplementos: (files) => dispatch(complementosActions.showComplementos(files)),
    clearComplementos: () => dispatch(complementosActions.clearComplementos()),
    cargarComplementos: (data) => dispatch(complementosActions.cargarComplementos(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputComplemento)
