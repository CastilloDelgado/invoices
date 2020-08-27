import React from 'react'
import { Button, Table, Grid, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { exportarCWActions } from '../'

class ValidarCSV extends React.Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.supress = this.supress.bind(this)
  }

  supress = (event, data) => { this.props.step1() }
  handleClick = (event, data) => { this.props.step3() }

  render(){
    const facturasCSV = this.props.facturasCSV;
    console.log(facturasCSV);
    return(
      <Form className={this.props.loading}>
        <Table size="small" celled  color="grey" inverted>
          {
            facturasCSV
              ?
                <Table.Body>
                  {facturasCSV.facturasCSV.map((x, a) => {
                    return(
                      x.map((y, b) => {
                        if(typeof y[0] === 'object'){
                          return(
                            y.map(r => {
                              return (
                                <Table.Row>
                                  { r.map((q) => { return <Table.Cell
                                    className={q === 'CHARGECODE' ? 'negative' : null}

                                    >{q}</Table.Cell> }) }
                                </Table.Row>
                              )
                            })
                          )
                        } else {
                          return(
                            <Table.Row>
                              {y.map((z, c) => { return <Table.Cell>{z}</Table.Cell> })}
                            </Table.Row>
                          )
                        }
                      })
                    )
                  })}
                </Table.Body>
              :
                null
          }
        </Table>
        <Grid>
          <Grid.Column width="5"></Grid.Column>
          <Grid.Column width="5">
            <Button.Group fluid width="10">
              <Button negative onClick={this.supress}>Cancelar</Button>
              <Button.Or text="or"></Button.Or>
              <Button primary onClick={this.handleClick}>Continuar</Button>
            </Button.Group>
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    facturasCSV: state.cw.facturasCSV,
    steps: state.cw.steps,
    loading: state.cw.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    step1: () => dispatch(exportarCWActions.step1()),
    step3: () => dispatch(exportarCWActions.step3())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidarCSV)
