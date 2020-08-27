import React from 'react';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import { xmlActions } from '../';
import { connect } from 'react-redux';

class XmlInput extends React.Component{
  constructor(props){
    super(props);
    this.inputRef = React.createRef()
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      files: null
    }

    this.props = {
      jobs: {}
    }
  }

  openDialog = () => {
    this.inputRef.current.click()
  }

  supress = () => {
    this.setState({files: null})
    this.props.clearXML()
  }

  handleChange(e){
    const files = e.target.files
    if(files[0]){
      this.setState({files: files})
    }
    this.props.showXML(files);
  }

  loadXML = () => {
    console.log("hey")
  }

  render(){
    const { files } = this.state;
    const { facturas, jobs } = this.props;

    let status = "disabled"
    if(facturas && jobs){
      status = "enabled"
      let i = 0;
      while(facturas[i]){
        if(facturas[i]["cfdi:Comprobante"].TipoDeComprobante === "I" && facturas[i]["cfdi:Comprobante"].MetodoPago === 'PPD' && facturas[i]["cfdi:Comprobante"].FormaPago === '99' && facturas[i]["cfdi:Comprobante"]["cfdi:Receptor"].UsoCFDI === 'G03'){
          if(!jobs[i]){
            status = "disabled"
          }
        }
        i++
      }
    }

    return(
      <Segment placeholder >
        <Header icon onClick={this.openDialog} >
          <Icon name='file outline' />
          <p>Da click sobre el icono <br/>para agregar tus facturas XML </p>
          <Header.Subheader>{files ? "Hay " + files.length + " archivo(s) cargado(s) " : "No hay archivos"}</Header.Subheader>
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
          <Button.Or text="ó" />
          <Button
            positive
            className={status}
            onClick={this.loadXML}

          >
              Subir Archivos
          </Button>
        </Button.Group>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    facturas: state.proveedores.strings,
    jobs: state.proveedores.jobs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    showXML: (files) => dispatch(xmlActions.showXML(files)),
    clearXML: () => dispatch(xmlActions.clearXML()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(XmlInput);
