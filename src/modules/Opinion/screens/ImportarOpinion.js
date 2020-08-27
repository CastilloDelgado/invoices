import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { CustomLoader } from '../../_custom'
import { connect } from 'react-redux'
import FileBase64 from 'react-file-base64';
import { opinionActions } from '../';
import { supplierActions } from '../../../modules/Supplier/supplier.actions';

class ImportarOpinion extends React.Component{

  constructor(props){
    super(props)
    this.state = { files : [] }
  }

  async getFiles(files){
    await this.setState({files: files})
    this.props.cargarOpinion(this.state.files)
  }

  render(){
    const { loading, opinionCargada} = this.props
    if(opinionCargada){
      this.props.logout(JSON.parse(localStorage.getItem('supplier')).user);
    }
    return(
        <Grid>
          <Grid.Column color="red" centered width="10">
            <div className="pdfInput">
              { loading ?
                  <CustomLoader />
                :
                  <div>
                    <h1> <Icon name="attention"/> Importa Aquí Tu Opinión del Cumplimiento de Obligaciones Fiscales</h1>
                    <br />
                    <br />
                    <p>Consulta tu opinión emitida por el SAT en <a href="https://www.sat.gob.mx/consultas/login/20777/consulta-tu-opinion-de-cumplimiento-de-obligaciones-fiscales"><b> este link</b></a>.</p>
                    <p>Posteriormente carga tu opinión POSITIVA aquí para reestablecer el servicio.</p>
                    <br />
                    <br />
                    <FileBase64
                      className = "pdfInput"
                      onDone={ this.getFiles.bind(this) }
                    />
                  </div>
              }
            </div>
          </Grid.Column>
        </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.opinion.loading,
    opinionCargada: state.opinion.opinionCargada
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      cargarOpinion: (opinion) => dispatch(opinionActions.cargarOpinion(opinion)),
      logout: (user) => dispatch(supplierActions.logout(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportarOpinion)
