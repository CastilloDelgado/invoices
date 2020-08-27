import React from "react";
import {
    Container,
    Header,
    Icon,
    Grid,
    Table,
    Button,
    Dropdown,
} from "semantic-ui-react";
import { CustomLoader } from "../../../_custom";
import { connect } from "react-redux";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import {
    chargeCodeActions,
} from "../";
import { exportarCWActions } from "../../";

class ConceptoJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chargeJobs: [],
            filtrofechasRango: ["", ""],
            filtro: {},
            valuesjobsdropdown: [],
            listFacturas: [],
            conceptList: null,
            conceptListByAgent: null,
            agentList: null,
            selectedAgent: null,
            update: false,
        };
        this.handleChangecodes = this.handleChangecodes.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAgentChange = this.handleAgentChange.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
    }

    handleChangecodes(e, data) {
        const { chargeJobs, valuesjobsdropdown, listFacturas } = this.state;
        const code = chargeJobs.find((item) => {
            return item.id_concepto == data.id;
        });
        const aValue = valuesjobsdropdown.find((item) => {
            return item.id_concepto == data.id;
        });
        const afactura = listFacturas.find((item) => {
            return item.id_factura == data.id_factura;
        });
        this.setState({ [data.name]: data.value });
        if (code != null && typeof(code) != "undefined") {
            code[data.name] = data.value === "" ? null : data.value;
            aValue[data.name] = data.value === "" ? null : data.value;
            afactura["id_factura"] = data.id_factura === "" ? null : data.id_factura;
            let filteredItems = [];
            if (chargeJobs.length > 1) {
                filteredItems = chargeJobs.filter(
                    (item) => item.id_concepto !== code.id_concepto
                );
                filteredItems.push(code);
                this.setState({ chargeJobs: filteredItems });
            } else {
                chargeJobs.pop();
                chargeJobs.push(code);
            }
            if (afactura.length > 1) {
                filteredItems = afactura.filter(
                    (item) => item.id_factura !== data.id_factura
                );
                filteredItems.push(afactura);
                this.setState({ listFacturas: filteredItems });
            } else {
                listFacturas.pop();
                listFacturas.push(afactura);
            }
        }
        else {
            let obj = {
                id_concepto: data.id,
                id_factura: data.id_factura,
                id_factura_job: data.id_factura_job,
                id_agente: data.id_agente,
                [data.name]: data.value,
            };
            let obj1 = { id_factura: data.id_factura }
            if (afactura == null && typeof(afactura) == "undefined") {
                listFacturas.push(obj1);
            }
            chargeJobs.push(obj);
            valuesjobsdropdown.push(obj);
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

    handleFilterClick(e, data) {
        const { filtro } = this.state;
        this.props.listarConceptos(filtro, JSON.parse(localStorage.getItem('user')).user.id);
    }

    handleClick(e, data) {
        const { chargeJobs, filtro, listFacturas } = this.state;
        this.props.actualizarConcepto_job(chargeJobs, listFacturas, filtro, JSON.parse(localStorage.getItem('user')).user.id);
        this.setState({
            conceptList: null,
            conceptListByAgent: null,
            chargeJobs: [],
            valuesjobsdropdown: [],
        });
    }

    componentDidMount() {
        this.props.getAgentes();
    }

    stringExplode(string) {
        var strArray = string.split(",");
        let jobcount = 1;
        let strExplode = "";
        let options = [];
        for (var i = 0; i < strArray.length; i++) {
            strExplode += strArray[i] + "\n";
            jobcount = jobcount++;
            let item = {
                key: i,
                text: strArray[i],
                value: strArray[i]
            }
            options.push(item)
        }
        let data = {
            strExplode: strExplode,
            options: options
        }
        return data;
    }

    /*stringExplodeToDropdown(string) {
        var strArray = string.split(",");
        let strExplode = "";
        let data = [];
        for (var i = 0; i < strArray.length; i++) {
            let item = {
                Key: i,
                Text: strArray[i],
                Value: strArray[i]
            }
            data.push(item)
        }
        return data;
    }*/

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
            chargeJobs,
            valuesjobsdropdown,
            update,
            filtrofechasRango,
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

        const disablebotton = chargeJobs.length > 0 ? false : true;
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
                                                <Table.HeaderCell width="1">Concepto a Job</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {conceptListToShow
                                                ? conceptListToShow.map((concepto, index) => {
                                                    const aValue = valuesjobsdropdown.find((item) => { return item.id_concepto == concepto.id; });
                                                    const valueChr = typeof (aValue) != "undefined" ? (aValue.hasOwnProperty('concepto_job') ? aValue.concepto_job : concepto.concepto_job) : concepto.concepto_job;
                                                    const jobs = this.stringExplode(concepto.job);
                                                    const estados = (concepto.status == 2 || concepto.status == 3 ? 'Autorizada' : concepto.status == 8 ? 'Pendiente capturar montos job' : 'Exportada');
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
                                                            <Table.Cell>{jobs.strExplode}</Table.Cell>
                                                            <Table.Cell>
                                                                <Dropdown
                                                                    search
                                                                    selection
                                                                    clearable
                                                                    id={concepto.id}
                                                                    name={"concepto_job"}
                                                                    options={jobs.options}
                                                                    value={valueChr}
                                                                    id_factura={concepto.id_factura}
                                                                    id_factura_job={concepto.id_factura_job}
                                                                    id_agente={concepto.id_agente}
                                                                    placeholder="Job"
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
        listarConceptos: (filtro, idUsuario) => dispatch(chargeCodeActions.listarConceptosJobs(filtro, idUsuario)),
        actualizarConcepto_job: (listaConceptos, listafacturas, filtros, idUsuario) => dispatch(chargeCodeActions.actualizarConceptoJob(listaConceptos, listafacturas, filtros, idUsuario)),
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
)(ConceptoJob);