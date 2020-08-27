import React from 'react'
import { connect } from 'react-redux'
import { Table, Input, Label, List, Message, Grid, Container, Button, Dimmer, Image, Loader, Dropdown } from 'semantic-ui-react'
import { exportarCWActions } from '../../ExportarCW'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { CustomLoader } from '../../../_custom'
import { mountsCaptureActions } from '../../'

class InvoiceList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            invoices: null,
            mounts: [],
            invoicesByAgent: null,
            filtrofechasRango: ['', ''],
            filtro: {}
        }
        this.handleMountChange = this.handleMountChange.bind(this)
        this.handleUpdateClick = this.handleUpdateClick.bind(this)
        this.handleAgentChange = this.handleAgentChange.bind(this)
        this.handleFilterClick = this.handleFilterClick.bind(this)
        this.onDateChanged = this.onDateChanged.bind(this)
    }

    handleMountChange(event) {
        let { mounts } = this.state
        const { name, id, value } = event.target
        const jobName = id
        if (!mounts[name]) mounts[name] = {
            total: 0
        }

        mounts[name] = {
            ...mounts[name],
            [jobName]: value
        }

        const array = Object.entries(mounts[name])
        var total = 0
        array.forEach(x => {
            if (x[0] !== "total") {
                total = total + parseFloat(x[1])
            }
        })

        mounts[name] = {
            ...mounts[name],
            total: Math.round((total + Number.EPSILON) * 100) / 100
        }

        this.setState({
            ...this.state,
            mounts: mounts
        })
    }

    handleUpdateClick() {
        const { invoices, mounts } = this.state
        console.log(mounts)
        this.props.updateMounts(invoices, mounts)
    }

    componentDidMount() {
        this.props.getAgentes()
        //this.props.getMounts()
    }

    onDateChanged(date) {
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
            filtro.fecha_rango1 = fechasformateadas[0];
            filtro.fecha_rango2 = fechasformateadas[1];
            this.setState({
                filtrofechasRango: fechasformateadas
            })
        }
        else {
            this.setState({
                filtrofechasRango: ['', '']
            })
            delete filtro.fecha_rango1;
            delete filtro.fecha_rango2;
        }
    }


    handleAgentChange(e, data) {
        const { filtro } = this.state;
        if (data.value !== '')
            filtro[data.name] = data.value;
        else
            delete filtro[data.name];
    }

    handleFilterClick() {
        const { filtro } = this.state
        this.props.getMounts(filtro, JSON.parse(localStorage.getItem('user')).user.id);
    }

    saveAgentList = list => this.setState({ agentList: list })
    saveMountsList = list => this.setState({ invoices: list })
    deleteMountsList = () => this.setState({ invoices: [] })

    render() {
        const { invoices, mounts, agentList, invoicesByAgent, filtrofechasRango } = this.state
        const { agentes, mountsList, loading } = this.props

        if (!invoices && mountsList) { this.saveMountsList(mountsList) }
        if (agentes && !agentList) { this.saveAgentList(agentes) }

        var agenteOpciones = []
        if (agentList) {
            agenteOpciones = agentList.agentes.map(x => {
                return {
                    key: x.key,
                    value: x.key,
                    text: x.nombre
                }
            })
        }

        if (agentes && !agentList) this.saveAgentList(agentes)

        let invoicesToShow = invoices ? invoices : null;
        // if (invoicesByAgent) invoicesToShow = invoicesByAgent

        if (invoices != mountsList) { this.saveMountsList(mountsList) }

        return (
            <Container>
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
                </Grid>
                {
                    loading
                        ?
                        <CustomLoader />
                        :
                        <Table celled striped size="small">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell width="1">ID</Table.HeaderCell>
                                    <Table.HeaderCell width="1">Agente</Table.HeaderCell>
                                    <Table.HeaderCell width="1">Factura (Serie-Folio)</Table.HeaderCell>
                                    <Table.HeaderCell width="2">UUID</Table.HeaderCell>
                                    <Table.HeaderCell width="1">Monto Total</Table.HeaderCell>
                                    <Table.HeaderCell width="3">Files Asignados</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {
                                    loading ?
                                        <Table.Row>
                                            <Dimmer active inverted>
                                                <Loader size="large">Loading</Loader>
                                            </Dimmer>
                                            <Image src='/images/wireframe/short-paragraph.png' />
                                        </Table.Row>
                                        :
                                        null
                                }
                                {invoicesToShow ? invoicesToShow.map((invoice) => {
                                    if (invoice.agente) {
                                        return (
                                            <Table.Row>
                                                <Table.Cell> {invoice.id} </Table.Cell>
                                                <Table.Cell> {invoice.agente.nombre} </Table.Cell>
                                                <Table.Cell>
                                                    {invoice.serie ? invoice.serie : null}
                                                    {invoice.serie && invoice.folio ? "-" : null}
                                                    {invoice.folio ? invoice.folio : null}
                                                </Table.Cell>
                                                <Table.Cell> {invoice.uuid} </Table.Cell>
                                                <Table.Cell> {invoice.total} </Table.Cell>
                                                <Table.Cell>
                                                    {mounts[invoice.id] ? console.log(Math.round((mounts[invoice.id].total + Number.EPSILON) * 100) / 100, invoice.total) : null}
                                                    {mounts[invoice.id] && Math.round((mounts[invoice.id].total + Number.EPSILON) * 100) / 100 < invoice.total
                                                        ?
                                                        <Message negative>
                                                            <Message.Header>Montos Insuficientes</Message.Header>
                                                            <p>La suma de los montos debe ser igual al total de la factura</p>

                                                        </Message>
                                                        :
                                                        null
                                                    }
                                                    {mounts[invoice.id] && Math.round((mounts[invoice.id].total + Number.EPSILON) * 100) / 100 > invoice.total
                                                        ?
                                                        <Message negative>
                                                            <Message.Header>Monto Excedido</Message.Header>
                                                            <p>La suma de los montos es mayor al total de la factura.</p>
                                                        </Message>
                                                        :
                                                        null
                                                    }
                                                    {mounts[invoice.id] && Math.round((mounts[invoice.id].total + Number.EPSILON) * 100) / 100 == invoice.total
                                                        ?
                                                        <Message positive>
                                                            <Message.Header>Factura Lista</Message.Header>
                                                        </Message>
                                                        :
                                                        null
                                                    }
                                                    {mounts[invoice.id] && isNaN(mounts[invoice.id].total)
                                                        ?
                                                        <Message negative>
                                                            <Message.Header>Monto Indefinido</Message.Header>
                                                            <p>Captura el monto correspondiente a los files.</p>
                                                        </Message>
                                                        :
                                                        null
                                                    }
                                                    <List bullet>
                                                        {invoice.jobs.map((job) => {
                                                            return (
                                                                <List.Item>
                                                                    <Input
                                                                        labelPosition='right'
                                                                        type='text'
                                                                        id={job.job}
                                                                        name={invoice.id}
                                                                        placeholder={"Monto asignado a " + job.job}
                                                                        onChange={this.handleMountChange}>
                                                                        <Label basic>{"File: " + job.job + " - $"}</Label>
                                                                        <input />
                                                                        <Label></Label>
                                                                    </Input>
                                                                </List.Item>
                                                            )
                                                        })}
                                                    </List>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    }
                                })
                                    :
                                    null
                                }
                            </Table.Body>
                        </Table>
                }
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAgentes: () => dispatch(exportarCWActions.getAgentes()),
        getMounts: (filtro, idUsuario) => dispatch(mountsCaptureActions.getMounts(filtro, idUsuario)),
        updateMounts: (invoiceList, mountsList) => dispatch(mountsCaptureActions.updateMounts(invoiceList, mountsList))
    }
}

const mapStateToProps = (state) => {
    return {
        agentes: state.listas.agentes,
        mountsList: state.cw.mountsList,
        loading: state.cw.loading,
        update: state.cw.update
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList)