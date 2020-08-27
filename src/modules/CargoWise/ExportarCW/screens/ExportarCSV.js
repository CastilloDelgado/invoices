import React from 'react'
import { FormularioCSV, ValidarCSV, DescargarCSV } from '.'
import { Container, Header, Step, Icon, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { exportarCWActions } from '../'

class ExportarCSV extends React.Component {

  componentDidMount(){
    this.props.step1()
  }

  render(){
    const {steps} = this.props
    console.log(steps)
    return(
      <Container fluid>
        <Header size="small">
          <Header.Content>
            CSV de Facturas para CargoWise
          </Header.Content>
        </Header>
        {
          steps
            ?
              <div>
                <Step.Group size="tiny" fluid>
                  <Step className={steps[0]}>
                    <Icon name="info circle"/>
                    <Step.Content>
                      <Step.Title>Formulario</Step.Title>
                      <Step.Description>Completa el formulario.</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step className={steps[1]}>
                    <Icon name="search"/>
                    <Step.Content>
                      <Step.Title>Validar</Step.Title>
                      <Step.Description>Valida el CSV antes de exportar.</Step.Description>
                    </Step.Content>
                  </Step>
                  <Step className={steps[2]}>
                    <Icon name="download"/>
                    <Step.Content>
                      <Step.Title>Expotar</Step.Title>
                      <Step.Description>Exporta tu CSV.</Step.Description>
                    </Step.Content>
                  </Step>
                </Step.Group>
                <Divider />
                { steps[0] === 'active'  ? <FormularioCSV />   : null }
                { steps[1] === 'active'  ? <ValidarCSV />      : null }
                { steps[2] === 'active'  ? <DescargarCSV/>     : null }
              </div>
            :
              null
        }

      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    step1: () => dispatch(exportarCWActions.step1())
  }
}

const mapStateToProps = (state) => {
  return {
    steps: state.cw.steps
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportarCSV)
