import React from 'react'
import { Container, Header, Icon, Grid, Table, Input, Button, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { chargeCodeActions, exportarCWActions, cediOptions } from '../../'
import { CustomLoader } from '../../../_custom'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

class JobsUpdate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            invoices: null,
            agents: null,
            facturasdata: [],
            selectedAgent: null,
            invoiceListByAgent: null,
            filtrofechasRango: ['', ''],
            filtro: {}
        }

        this.handleJobChange = this.handleJobChange.bind(this)
        this.handleCediChange = this.handleCediChange.bind(this)
        this.handleUpdateClick = this.handleUpdateClick.bind(this)
        this.handleAgentChange = this.handleAgentChange.bind(this)
        this.handleFilterClick = this.handleFilterClick.bind(this)
        this.onDateChanged = this.onDateChanged.bind(this)
    }

    componentDidMount() {
        this.props.getAgentes()
        //  this.props.listarFacturasJobs(JSON.parse(localStorage.getItem('user')).user.id)
    }
    saveFacturas = (list) => this.setState({ invoices: list })
    saveAgentes = (list) => this.setState({ agents: list })

    handleAgentChange(e, data) {
        const { filtro } = this.state;
        if (data.value != '')
            filtro[data.name] = data.value;
        else
            delete filtro[data.name];

    }

    onDateChanged(date) {
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
    }


    handleFilterClick(e, data) {
        const { filtro } = this.state
        this.props.listarFacturasJobs(filtro, JSON.parse(localStorage.getItem('user')).user.id);
    }

    handleJobChange(e, data) {
        const { facturasdata } = this.state
        const factura = facturasdata.find((item) => {
            return item.id == data.id;
        });
        this.setState({ [data.name]: data.value })
        /*let newJobs = jobsToUpdate.slice()
        newJobs[data.id] = data.value
        this.setState({ jobsToUpdate: newJobs })*/
        this.setState({ [data.name]: data.value });
        if (factura != null && factura != typeof undefined) {
            factura[data.name] = data.value === "" ? null : data.value;
            let filteredItems = [];
            if (facturasdata.length > 1) {
                filteredItems = facturasdata.filter(
                    (item) => item.id_concepto !== factura.id_concepto
                );
                filteredItems.push(factura);
            } else {
                facturasdata.pop();
                facturasdata.push(factura);
            }
        }
        else {
            let obj = {
                id: data.id,
                [data.name]: data.value,
            };
            facturasdata.push(obj);
        }
    }

    handleCediChange(e, data) {
        const { facturasdata } = this.state
        const factura = facturasdata.find((item) => {
            return item.id == data.id;
        });
        this.setState({ [data.name]: data.value });
        if (factura != null && factura != typeof undefined) {
            factura[data.name] = data.value === "" ? null : data.value;
            let filteredItems = [];
            if (facturasdata.length > 1) {
                filteredItems = facturasdata.filter(
                    (item) => item.id_concepto !== factura.id_concepto
                );
                filteredItems.push(factura);
            } else {
                facturasdata.pop();
                facturasdata.push(factura);
            }
        }
        else {
            let obj = {
                id: data.id,
                [data.name]: data.value,
            };
            facturasdata.push(obj);
        }
    }

    handleUpdateClick() {
        const { filtro, facturasdata } = this.state
        this.props.actualizarJobs(facturasdata, filtro, JSON.parse(localStorage.getItem('user')).user.id)
    }

    render() {
        const { facturas, agentes, success, loading } = this.props
        const { invoices, agents, jobsToUpdate, invoiceListByAgent, filtrofechasRango, facturasdata } = this.state

        if (agentes && !agents) this.saveAgentes(agentes)
        if (facturas && !invoices) this.saveFacturas(facturas)

        let invoicesToShow = invoices ? invoices : []

        /* if (invoiceListByAgent) {
             invoicesToShow = invoiceListByAgent
         }*/

        if (facturas != invoices && success) {
            this.saveFacturas(facturas)
        }

        let agenteOpciones = []
        if (agents) {
            agenteOpciones = agents.agentes.map(x => {
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
                    <Icon name="keyboard" />
                    <Header.Content>Actualizar Jobs/Cedis de Facturas
                        <Header.Subheader>Aquí podrás modificar los Jobs y los cedis que se configuraron al cargar las facturas.</Header.Subheader>
                    </Header.Content>
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
                                selection
                                search
                                clearable
                                name='agente_filtro'
                                options={agenteOpciones ? agenteOpciones : null}
                                placeholder="Filtrar por proveedor"
                                onChange={this.handleAgentChange}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Button primary
                                onClick={this.handleFilterClick}
                            >Buscar</Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button positive
                                fluid
                                onClick={this.handleUpdateClick}
                            >Actualizar</Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width="14">
                            {
                                loading
                                    ?
                                    <CustomLoader />
                                    :
                                    <Table>
                                        <Table.Header>
                                            <Table.HeaderCell width="3">Agente</Table.HeaderCell>
                                            <Table.HeaderCell width="1">Serie</Table.HeaderCell>
                                            <Table.HeaderCell width="1">Folio</Table.HeaderCell>
                                            <Table.HeaderCell width="4">UUID</Table.HeaderCell>
                                            <Table.HeaderCell width="2">Total</Table.HeaderCell>
                                            <Table.HeaderCell width="4">JOB(S)</Table.HeaderCell>
                                            <Table.HeaderCell width="4">Cedi/Branch</Table.HeaderCell>
                                        </Table.Header>
                                        <Table.Body>
                                            {invoicesToShow ?
                                                invoicesToShow.map(factura => {
                                                    const fact = facturasdata.find((item) => {
                                                        return item.id == factura.id;
                                                    });
                                                    return (
                                                        <Table.Row>
                                                            <Table.Cell> {factura.agente} </Table.Cell>
                                                            <Table.Cell> {factura.serie} </Table.Cell>
                                                            <Table.Cell> {factura.folio} </Table.Cell>
                                                            <Table.Cell> {factura.uuid} </Table.Cell>
                                                            <Table.Cell> {factura.total} </Table.Cell>
                                                            <Table.Cell>
                                                                <Input
                                                                    fluid
                                                                    placeholder="Ingresa el nuevo job"
                                                                    name="jobs"
                                                                    id={factura.id}
                                                                    onChange={this.handleJobChange}
                                                                    value={fact ? fact.job : factura.job}
                                                                />
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                <Dropdown
                                                                    name="cedi"
                                                                    id={factura.id}
                                                                    options={cediOptions}
                                                                    selection
                                                                    onChange={this.handleCediChange}
                                                                    value={fact ? fact.cedi : factura.cedi}
                                                                    placeholder="Ingresa el Cedi" />
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    )
                                                }) : null}
                                        </Table.Body>
                                    </Table>
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        facturas: state.cw.facturas,
        agentes: state.listas.agentes,
        success: state.cw.success,
        loading: state.cw.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        listarFacturasJobs: (filtro, idUsuario) => dispatch(chargeCodeActions.listarFacturasJobs(filtro, idUsuario)),
        actualizarJobs: (requestBody, filtro, idUsuario) => dispatch(chargeCodeActions.actualizarJobs(requestBody, filtro, idUsuario)),
        getAgentes: () => dispatch(exportarCWActions.getAgentes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsUpdate)