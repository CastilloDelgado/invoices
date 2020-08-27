import React from "react";
import {
  Container,
  Header,
  Icon,
  Grid,
  Table,
  Button,
  Dropdown,
  Checkbox
} from "semantic-ui-react";
import { CustomLoader } from "../../../_custom";
import { connect } from "react-redux";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {
  chargeCodeActions,
  chargeCodeOptions,
  chargeBranchCode,
  chargeDepartmentCode,
} from "../";
import { exportarCWActions } from "../../";

class ConceptosCapturados extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chargeCodes: [],
      filtrofechasRango: ["", ""],
      filtro: {},
      valuescodes: [],
      conceptList: null,
      conceptListByAgent: null,
      agentList: null,
      selectedAgent: null,
      update: false,
      checkedaut: false,
      checkedexpor: false
    };
    this.handleChangecodes = this.handleChangecodes.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAgentChange = this.handleAgentChange.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.filtroschanged = this.filtroschanged.bind(this);
  }

  handleChange(e, data) {
    let newChargeCode = this.state.agregarChargeCode.slice();
    newChargeCode[data.id] = data.value;
    this.setState({ agregarChargeCode: newChargeCode });
  }

  handleChangecodes_1(e, data) {
    const {
      chargeCodes,
      valuesChargeCodeDropdown,
      valuesBrhCodeDropdown,
      valuesdptCodeDropdown,
    } = this.state;
    const code = chargeCodes.find((item) => {
      return item.id_concepto == data.id;
    });
    this.setState({ [data.name]: data.value });
    if (code != null && code != typeof undefined) {
      if (data.name == "charge_code") {
        /*if (code.hasOwnProperty("branch_code")) {
          delete code.branch_code;
          let aux = valuesBrhCodeDropdown;
          aux[data.id] = "";
          this.setState({ valuesBrhCodeDropdown: aux });
        }
        if (code.hasOwnProperty("department_code")) {
          delete code.department_code;
          let aux = valuesdptCodeDropdown;
          aux[data.id] = "";
          this.setState({ valuesdptCodeDropdown: aux });
        }*/
        code[data.name] = data.value;
        let aux = valuesChargeCodeDropdown;
        aux[data.id] = data.value;
        this.setState({ valuesChargeCodeDropdown: aux });
      } else {
        if (data.name == "branch_code") {
          let aux = valuesBrhCodeDropdown;
          aux[data.id] = data.value;
          this.setState({ valuesBrhCodeDropdown: aux });
        }
        if (data.name == "department_code") {
          let aux = valuesdptCodeDropdown;
          aux[data.id] = data.value;
          this.setState({ valuesdptCodeDropdown: aux });
        }
        code[data.name] = data.value === "" ? null : data.value;
      }
      let filteredItems = [];
      if (chargeCodes.length > 1) {
        filteredItems = chargeCodes.filter(
          (item) => item.id_concepto !== code.id_concepto
        );
        filteredItems.push(code);
        this.setState({ chargeCodes: filteredItems });
      } else {
        chargeCodes.pop();
        chargeCodes.push(code);
      }
    } else {
      let obj = {
        id_concepto: data.id,
        [data.name]: data.value,
      };
      chargeCodes.push(obj);
      if (data.name == "branch_code") {
        let aux = valuesBrhCodeDropdown;
        aux[data.id] = data.value;
        this.setState({ valuesBrhCodeDropdown: aux });
      }
      if (data.name == "department_code") {
        let aux = valuesdptCodeDropdown;
        aux[data.id] = data.value;
        this.setState({ valuesdptCodeDropdown: aux });
      }
      if (data.name == "charge_code") {
        let aux = valuesChargeCodeDropdown;
        aux[data.id] = data.value;
        this.setState({ valuesChargeCodeDropdown: aux });
      }
    }
  }

  handleChangecodes(e, data) {
    const { chargeCodes, valuescodes } = this.state;
    const code = chargeCodes.find((item) => {
      return item.id_concepto == data.id;
    });
    const aValue = valuescodes.find((item) => {
      return item.id == data.id;
    });
    this.setState({ [data.name]: data.value });
    if (code != null && code != typeof undefined) {
      code[data.name] = data.value === "" ? null : data.value;
      aValue[data.name] = data.value === "" ? null : data.value;
      let filteredItems = [];
      if (chargeCodes.length > 1) {
        filteredItems = chargeCodes.filter(
          (item) => item.id_concepto !== code.id_concepto
        );
        filteredItems.push(code);
        this.setState({ chargeCodes: filteredItems });
      } else {
        chargeCodes.pop();
        chargeCodes.push(code);
      }
    }
    else {
      let objvalues = {
        id: data.id,
        [data.name]: data.value
      };
      let obj = {
        id_concepto: data.id,
        [data.name]: data.value,
      };
      chargeCodes.push(obj);
      valuescodes.push(objvalues);
    }
  }

  onDateChanged = (date) => {
    const { filtro } = this.state;
    let fechasformateadas = [];
    if (date !== null) {
      date.forEach((dat) => {
        let fechaform = "";
        let mes = dat.getMonth() + 1;
        let dia = dat.getDate();
        fechaform =
          dat.getFullYear() +
          "/" +
          (mes < 10 ? "0" + mes : mes) +
          "/" +
          (dia < 10 ? "0" + dia : dia);
        fechasformateadas.push(fechaform);
      });
      filtro.fecha_rango = fechasformateadas;
      this.setState({
        filtrofechasRango: fechasformateadas,
      });
    } else {
      this.setState({
        filtrofechasRango: ["", ""],
      });
      delete filtro.fecha_rango;
    }
  };

  handleAgentChange(e, data) {
    const { filtro } = this.state;
    this.setState({ selectedAgent: data.value });
    if (data.value != "") filtro[data.name] = data.value;
    else delete filtro[data.name];
  }

  filtroschanged(e, data) {
    const { filtro } = this.state;
    if (data.name == 'status_aut')
      this.setState({
        checkedaut: true,
        checkedexpor: false
      })
    else if (data.name == 'status_expor')
      this.setState({
        checkedexpor: true,
        checkedaut: false
      })
    if (data.name == 'status_aut' || data.name == 'status_expor') {
      filtro.status = data.value;
    }
    else {
      if (data.value != '')
        filtro[data.name] = data.value;
      else
        delete filtro[data.name];
    }
  }

  handleFilterClick(e, data) {
    const { filtro } = this.state;
    this.props.listarConceptosCapturados(filtro, JSON.parse(localStorage.getItem('user')).user.id);
  }

  handleClick(e, data) {
    const { chargeCodes, filtro } = this.state;
    this.props.actualizarChargeCode(chargeCodes, filtro, JSON.parse(localStorage.getItem('user')).user.id);
    this.setState({
      conceptList: null,
      conceptListByAgent: null,
      chargeCodes: [],
      valuesChargeCodeDropdown: [],
      valuesBrhCodeDropdown: [],
      valuesdptCodeDropdown: [],
    });
  }

  componentDidMount() {
    this.props.getAgentes();
  }

  stringExplode(string) {
    var strArray = string.split(",");
    let jobcount = 1;
    let strExplode = "";
    for (var i = 0; i < strArray.length; i++) {
      strExplode += strArray[i] + "\n";
      jobcount = jobcount++;
    }
    return strExplode;
  }

  saveConceptList = (list) => this.setState({ conceptList: list });
  saveAgentList = (list) => this.setState({ agentList: list, update: true });
  deleteList = () => this.setState({ update: false, conceptList: null });

  render() {
    const {
      conceptos,
      cargandoConceptos,
      cargandoChargeCode,
      agentes,
    } = this.props;
    const {
      conceptList,
      conceptListByAgent,
      agentList,
      chargeCodes,
      valuescodes,
      update,
      filtrofechasRango,
      checkedaut,
      checkedexpor
    } = this.state;

    if (cargandoChargeCode && conceptList && conceptList[0] && update) {
      this.deleteList();
    }

    if (agentes && !agentList) this.saveAgentList(agentes);
    if (conceptos && !conceptList) this.saveConceptList(conceptos);
    let agenteOpciones = [];
    if (agentList) {
      agenteOpciones = agentList.agentes.map((x) => {
        return {
          key: x.key,
          value: x.rfc,
          text: x.nombre,
        };
      });
    }

    let conceptListToShow = conceptList ? conceptList : null;
    if (conceptListByAgent) {
      conceptListToShow = conceptListByAgent;
    }

    if (conceptList != conceptos) this.saveConceptList(conceptos);

    const disablebotton = chargeCodes.length > 0 ? false : true;
    return (
      <Container fluid>
        <Header size="small" dividing>
          <Icon name="cloud upload" />
          <Header.Content>Cargar Charge-Code a Facturas</Header.Content>
          <Header.Subheader>
            Aquí puedes ingresar el charge-code para cada factura.
          </Header.Subheader>
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h3>Filtros</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <DateRangePicker
                onChange={this.onDateChanged}
                locale={"es-419"}
                format={"yyyy-MM-dd"}
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
                name="agente_filtro"
                options={agenteOpciones ? agenteOpciones : null}
                placeholder="Filtrar por proveedor"
                onChange={this.handleAgentChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox name='status_aut'
                radio
                checked={checkedaut}
                onChange={this.filtroschanged}
                label='Autorizada'
                value={2}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox name='status_expor'
                radio
                checked={checkedexpor}
                onChange={this.filtroschanged}
                value={4}
                label='Exportada' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Button primary onClick={this.handleFilterClick}>
                Buscar
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                positive
                fluid
                disabled={disablebotton}
                onClick={this.handleClick}
              >
                Actualizar
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="10">
              {cargandoConceptos || cargandoChargeCode ? (
                <CustomLoader />
              ) : (
                  <Table
                    text-align="left"
                    celled
                    size="small">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell width="1">Estado</Table.HeaderCell>
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
                      {conceptListToShow
                        ? conceptListToShow.map((concepto, index) => {
                          const aValue = valuescodes.find((item) => { return item.id == concepto.id; });
                          const valueChr = typeof (aValue) != "undefined" ? (aValue.hasOwnProperty('charge_code') ? aValue.charge_code : concepto.charge_code) : concepto.charge_code;
                          const valueBrh = typeof (aValue) != "undefined" ? (aValue.hasOwnProperty('branch_code') ? aValue.branch_code : concepto.branch_code) : concepto.branch_code;
                          const valuedpt = typeof (aValue) != "undefined" ? (aValue.hasOwnProperty('department_code') ? aValue.department_code : concepto.department_code) : concepto.department_code;
                          const valuejobs = this.stringExplode(concepto.job);
                          const estados = (concepto.status == 2 ? 'Autorizada' : concepto.status == 1 ? 'Pendiente capturar chargecodes' : concepto.status == 8 ? 'Pendiente capturar jobs' : concepto.status == 4 ? 'Exportada' : concepto.status == 5 || concepto.status == 6 ? 'Cancelada' : 'Desconocido');
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>{estados}</Table.Cell>
                              <Table.Cell>{concepto.rfc}</Table.Cell>
                              <Table.Cell>
                                {concepto.serie}
                                {concepto.folio}
                              </Table.Cell>
                              <Table.Cell>{concepto.descripcion}</Table.Cell>
                              <Table.Cell>{concepto.cantidad}</Table.Cell>
                              <Table.Cell>
                                {concepto.clave_producto_servicio}
                              </Table.Cell>
                              <Table.Cell>{concepto.clave_unidad}</Table.Cell>
                              <Table.Cell>{valuejobs}</Table.Cell>
                              <Table.Cell>
                                <Dropdown
                                  search
                                  selection
                                  id={concepto.id}
                                  name={"charge_code"}
                                  options={chargeCodeOptions}
                                  value={valueChr}
                                  placeholder="Charge-Code"
                                  onChange={this.handleChangecodes}
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
                                  value={valueBrh}
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
                                  value={valuedpt}
                                  //disabled={disable}
                                  onChange={this.handleChangecodes}
                                />
                              </Table.Cell>
                            </Table.Row>
                          );
                        })
                        : null}
                    </Table.Body>
                  </Table>
                )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAgentes: () => dispatch(exportarCWActions.getAgentes()),
    listarConceptosCapturados: (filtro, idUsuario) =>
      dispatch(chargeCodeActions.listarConceptosCapturados(filtro, idUsuario)),
    actualizarChargeCode: (listaConceptos, filtros, idUsuario) =>
      dispatch(chargeCodeActions.actualizarChargeCode(listaConceptos, filtros, idUsuario)),
  };
};

const mapStateToProps = (state) => {
  return {
    cargandoChargeCode: state.cw.cargarCode,
    cargandoConceptos: state.cw.cargandoConceptos,
    conceptos: state.cw.conceptosCapturados,
    agentes: state.listas.agentes,
    eraseList: state.cw.eraseList,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConceptosCapturados);
