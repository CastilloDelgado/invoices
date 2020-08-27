import React from 'react'
import { Container, Header, Icon, Grid, Table, Button, Dropdown } from 'semantic-ui-react'
import { CustomLoader } from '../../../_custom'
import { connect } from 'react-redux'
import { chargeCodeActions, chargeCodeOptions, chargeBranchCode, chargeDepartmentCode } from '../'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { exportarCWActions } from '../../'

class ConceptosPendientes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chargeCodes: [],
      valuesChargeCodeDropdown: [],
      valuesBrhCodeDropdown: [],
      valuesdptCodeDropdown: [],
      filtrofechasRango: ['', ''],
      filtro: {},
      conceptList: null,
      conceptListByAgent: null,
      agentList: null,
      selectedAgent: null,
      update: false,
    }
    this.handleChangecodes = this.handleChangecodes.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleAgentChange = this.handleAgentChange.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
  }

  handleChangecodes(e, data) {
    const { chargeCodes, valuesChargeCodeDropdown, valuesBrhCodeDropdown, valuesdptCodeDropdown } = this.state
    const code = chargeCodes.find(item => {
      return item.id_concepto == data.id
    })
    this.setState({ [data.name]: data.value })
    if ((code != null && code != typeof (undefined))) {
      if (data.name == 'charge_code') {
        /*if (code.hasOwnProperty('branch_code')) {
          delete code.branch_code
          let aux = valuesBrhCodeDropdown;
          aux[data.id] = ""
          this.setState({ valuesBrhCodeDropdown: aux })
        }
        if (code.hasOwnProperty('department_code')) {
          delete code.department_code
          let aux = valuesdptCodeDropdown;
          aux[data.id] = ""
          this.setState({ valuesdptCodeDropdown: aux })
        }*/
        code[data.name] = data.value
        let aux = valuesChargeCodeDropdown;
        aux[data.id] = data.value
        this.setState({ valuesChargeCodeDropdown: aux })
      }
      else {
        if (data.name == 'branch_code') {
          let aux = valuesBrhCodeDropdown;
          aux[data.id] = data.value;
          this.setState({ valuesBrhCodeDropdown: aux })
        }
        if (data.name == 'department_code') {
          let aux = valuesdptCodeDropdown;
          aux[data.id] = data.value;
          this.setState({ valuesdptCodeDropdown: aux })
        }
        code[data.name] = data.value === "" ? null : data.value;
      }
      let filteredItems = []
      if (chargeCodes.length > 1) {
        filteredItems = chargeCodes.filter(item => item.id_concepto !== code.id_concepto)
        filteredItems.push(code)
        this.setState({ chargeCodes: filteredItems })
      }
      else {
        chargeCodes.pop()
        chargeCodes.push(code)
      }
    }
    else {
      let obj = {
        id_concepto: data.id,
        status: 2,
        [data.name]: data.value
      }
      chargeCodes.push(obj)
      let aux = valuesChargeCodeDropdown;
      aux[data.id] = data.value
      this.setState({ valuesChargeCodeDropdown: aux })
    }
  }


  onDateChanged = date => {
    const { filtro } = this.state;
    let fechasformateadas = [];
    if (date !== null) {
      date.forEach(dat => {
        let fechaform = '';
        let mes = (dat.getMonth()) + 1;
        let dia = dat.getDate()
        fechaform = dat.getFullYear() + '/' + (mes < 10 ? '0' + mes : mes) + '/' + (dia < 10 ? '0' + dia : dia)
        fechasformateadas.push(fechaform);
      });
      filtro.fecha_rango = fechasformateadas;
      this.setState({
        filtrofechasRango: fechasformateadas
      })
    }
    else {
      this.setState({
        filtrofechasRango: ['', '']
      })
      delete filtro.fecha_rango;
    }
  }

  validateCodesBr_Dpt() {
    const { chargeCodes } = this.state
    if (chargeCodes.length == 0)
      return true
    let filtredADMCodes = chargeCodes.filter(codes => codes.charge_code == 'ADMTN' || codes.charge_code == 'ADMTN-FRON')
    let Codesfailed = []
    for (let index = 0; index < filtredADMCodes.length; index++) {
      const element = filtredADMCodes[index];
      if (!element.hasOwnProperty('branch_code')) {
        Codesfailed[index] = element;
      }
      else if (!element.hasOwnProperty('department_code')) {
        Codesfailed[index] = element;
      }
    }
    return (Codesfailed.length > 0) ? true : false
  }

  handleAgentChange(e, data) {
    const { filtro } = this.state;
    this.setState({ selectedAgent: data.value })
    filtro[data.name] = data.value;
  }

  handleFilterClick(e, data) {
    const { filtro } = this.state;

    this.props.listarConceptosPendientes(filtro, JSON.parse(localStorage.getItem('user')).user.id)
  }

  handleClick(e, data) {
    const { chargeCodes,filtro } = this.state
    this.validateCodesBr_Dpt()
    this.props.cargarChargeCode(chargeCodes,filtro,  JSON.parse(localStorage.getItem('user')).user.id)
    this.setState({
      conceptList: null,
      conceptListByAgent: null,
      chargeCodes: [],
      valuesChargeCodeDropdown: [],
      valuesBrhCodeDropdown: [],
      valuesdptCodeDropdown: []
    })
  }

  componentDidMount() {
    this.props.getAgentes()
  }

  stringExplode(string) {
    var strArray = string.split(",");
    let strExplode = ""
    for (var i = 0; i < strArray.length; i++) {
      strExplode += strArray[i] + "\n"
    }
    return strExplode;
  }

  saveConceptList = list => this.setState({ conceptList: list })
  saveAgentList = list => this.setState({ agentList: list })

  render() {
    const { conceptos, cargandoConceptos, cargandoChargeCode, agentes } = this.props
    const { conceptList, conceptListByAgent, agentList, chargeCodes, update, valuesChargeCodeDropdown, valuesBrhCodeDropdown, valuesdptCodeDropdown, filtrofechasRango } = this.state

    if (cargandoChargeCode && conceptList && conceptList[0] && update) {
      this.deleteList();
    }

    let conceptListToShow = conceptList ? conceptList : null

    if (conceptListByAgent) { conceptListToShow = conceptListByAgent }

    if (agentes && !agentList) { this.saveAgentList(agentes) }

    if (conceptos && !conceptList) { this.saveConceptList(conceptos) }

    if (conceptos != conceptList) {
      this.saveConceptList(conceptos)
    }

    if (agentes && !agentList) this.saveAgentList(agentes)
    if (conceptos && !conceptList) this.saveConceptList(conceptos)
    let agenteOpciones = []
    if (agentList) {
      agenteOpciones = agentList.agentes.map(x => {
        return {
          key: x.key,
          value: x.rfc,
          text: x.nombre
        }
      })
    }
    return (
      <Container fluid>
        <Header size="small" dividing>
          <Icon name="cloud upload" />
          <Header.Content>Cargar Charge-Code a Facturas</Header.Content>
          <Header.Subheader>Aquí puedes ingresar el charge-code para cada factura.</Header.Subheader>
        </Header>
        <Grid fluid>
          <Grid.Row>
            <Grid.Column>
              <h3>Filtros</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <DateRangePicker
                onChange={this.onDateChanged}
                locale={'es-419'}
                format={'yyyy-MM-dd'}
                value={filtrofechasRango}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Dropdown
                fluid
                search
                selection
                clearable
                name='agente_filtro'
                options={agenteOpciones ? agenteOpciones : null}
                placeholder="Filtrar por proveedor"
                onChange={this.handleAgentChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Button onClick={this.handleFilterClick}
                primary
                width={4}
              >Buscar</Button>
            </Grid.Column>
            <Grid.Column>
              <Button positive
                className={chargeCodes.length > 0 ? "" : "disabled"}
                fluid
                //disabled={this.validateCodesBr_Dpt()}
                onClick={this.handleClick}
              >Capturar</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="10">
              {
                cargandoConceptos || cargandoChargeCode
                  ?
                  <CustomLoader />
                  :
                  <Table
                    text-align="left"
                    celled
                    size="small"
                  >
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell width="1">Proveedor</Table.HeaderCell>
                        <Table.HeaderCell width="1">Factura</Table.HeaderCell>
                        <Table.HeaderCell width="1">Descripción</Table.HeaderCell>
                        <Table.HeaderCell width="1">Cantidad</Table.HeaderCell>
                        <Table.HeaderCell width="1">C. Prod Serv</Table.HeaderCell>
                        <Table.HeaderCell width="1">C. Unidad</Table.HeaderCell>
                        <Table.HeaderCell width="1">Job</Table.HeaderCell>
                        <Table.HeaderCell width="1">Charge Code</Table.HeaderCell>
                        <Table.HeaderCell width="1">Branch Code</Table.HeaderCell>
                        <Table.HeaderCell width="1">Departament Code</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {/* ---------------------------------------------------------------------- */}
                      {
                        conceptListToShow
                          ?
                          conceptListToShow.map((concepto, index) => {
                            const valuejobs = this.stringExplode(concepto.job)
                            return (
                              < Table.Row key={index} >
                                <Table.Cell>{concepto.rfc}</Table.Cell>
                                <Table.Cell>{concepto.serie}{concepto.folio}</Table.Cell>
                                <Table.Cell>{concepto.descripcion}</Table.Cell>
                                <Table.Cell>{concepto.cantidad}</Table.Cell>
                                <Table.Cell>{concepto.clave_producto_servicio}</Table.Cell>
                                <Table.Cell>{concepto.clave_unidad}</Table.Cell>
                                <Table.Cell>{valuejobs}</Table.Cell>
                                <Table.Cell>
                                  <Dropdown
                                    search
                                    selection
                                    id={concepto.id}
                                    name={"charge_code"}
                                    options={chargeCodeOptions}
                                    placeholder="Charge-Code"
                                    onChange={this.handleChangecodes}
                                    ref={this.input}
                                  />
                                </Table.Cell>
                                <Table.Cell>
                                  <Dropdown
                                    clearable
                                    search
                                    selection
                                    id={concepto.id}
                                    name={"branch_code"}
                                    options={chargeBranchCode}
                                    placeholder="Branch-Code"
                                    //value={valueBrh}
                                    //disabled={disable}
                                    onChange={this.handleChangecodes}
                                  />
                                </Table.Cell>
                                <Table.Cell>
                                  <Dropdown
                                    clearable
                                    search
                                    selection
                                    id={concepto.id}
                                    name={"department_code"}
                                    options={chargeDepartmentCode}
                                    placeholder="Department-Code"
                                    //value={valuedpt}
                                    //disabled={disable}
                                    onChange={this.handleChangecodes} />
                                </Table.Cell>
                              </Table.Row>
                            )
                          })
                          :
                          null
                      }
                    </Table.Body>
                  </Table>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container >
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAgentes: () => dispatch(exportarCWActions.getAgentes()),
    listarConceptosPendientes: (filtro, idUsuario) => dispatch(chargeCodeActions.listarConceptosPendientes(filtro, idUsuario)),
    cargarChargeCode: (listaConceptos,filtros, idUsuario) => dispatch(chargeCodeActions.cargarChargeCode(listaConceptos,filtros, idUsuario))
  }
}

const mapStateToProps = (state) => {
  return {
    cargandoChargeCode: state.cw.cargarCode,
    cargandoConceptos: state.cw.cargandoConceptos,
    conceptos: state.cw.conceptosPendientes,
    agentes: state.listas.agentes,
    eraseList: state.cw.eraseList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConceptosPendientes)
