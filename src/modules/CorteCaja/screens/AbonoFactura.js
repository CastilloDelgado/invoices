import React, { Component } from 'react';
import { Button, Table, Header, Grid, Checkbox, Input, Icon, Modal, Dropdown } from 'semantic-ui-react';
import Currency from 'react-currency-formatter';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import { corteActions } from '../corte.actions';
import CorteResponse from './CorteResponse';
import { alertActions } from '../../Alert';

import { CustomLoader } from '../../_custom';

class AbonoFactura extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sumaTotales: 0,
            checkedItems: [],
            valueItems: [],
            listItems: [],
            facturas: [],
            montotarjeta: "",
            montoamex: "",
            open: false,
            banco: "",
            idCompany: 0,
            fechafactura: "",
            checkfechahoy: false,
            disablecheck: false
        }
    }

    show = () => () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    check = () => this.setState({ checkfechahoy: false })

    clearState() {
        this.setState({
            open: false,
            sumaTotales: 0,
            checkedItems: [],
            valueItems: [],
            listItems: [],
            monto: 0,
            montotarjeta: 0,
            banco: "",
            idCompany: 0,
            checkfechahoy: false
        });
    }

    componentDidMount() {
        let idempresa = JSON.parse(localStorage.getItem("company")).id;
        this.props.getFacturasCorte(idempresa);
        this.setState({
            facturas: this.props.facturas,
            idCompany: idempresa
        });
    }

    oncheckFechahoy = (e) => {
            this.setState({
                checkfechahoy: !this.state.checkfechahoy
            })
        if (this.state.checkfechahoy == false) {
            let date = new Date();
            let mes = (date.getMonth()) + 1;
            let dia = date.getDate()
            let fechaform = date.getFullYear() + '/' + (mes < 10 ? '0' + mes : mes) + '/' + (dia < 10 ? '0' + dia : dia)
            this.setState({
                fechafactura: date
            });
            this.props.filtering(fechaform)
        }
        else  if (this.state.checkfechahoy == true) {
            this.props.filtering()
        }
    }

    onChange = (e, item) => {
        const { checkedItems, listItems } = this.state;
        let itemChecked = { key: item.key, total: item.total, serie: item.serie, folio: item.folio, acumulado: item.acumulado, uuid: item.uuid }
        let sumaActual = 0;
        if (listItems.length !== 0)
            listItems.forEach(a => {
                sumaActual += parseFloat(a.importe_pago)
            });
        let Totalchecked = parseFloat(itemChecked.total - itemChecked.acumulado);
        let nextmonto = parseFloat(sumaActual) + parseFloat(Totalchecked);

        if (checkedItems.length === 0) {
            itemChecked.importe_pago = Totalchecked;
            itemChecked.tipo = 'total';
            this.setState((prevState) =>
                ({
                    sumaTotales: nextmonto,
                    checkedItems: [...prevState.checkedItems, itemChecked],
                    listItems: [...prevState.listItems, itemChecked]
                })
            )
        }
        else if (!checkedItems.some((i) => i.key === itemChecked.key)) {
            itemChecked.importe_pago = Totalchecked;
            itemChecked.tipo = 'total';
            this.setState((prevState) =>
                ({
                    sumaTotales: nextmonto,
                    checkedItems: [...prevState.checkedItems, itemChecked],
                    listItems: [...prevState.listItems, itemChecked]
                })
            )
        }
        else {
            this.setState((prevState) =>
                ({
                    sumaTotales: Math.round(sumaActual - Totalchecked),
                    checkedItems: prevState.checkedItems.filter(i => i.key !== itemChecked.key),
                    listItems: prevState.listItems.filter(i => i.key !== itemChecked.key)
                })
            );
        }
    }


    onSubmit = () => {
        let data = {
            ...this.state
        }
        this.clearState();
        this.props.crearCorte(data);

    }

    onDateChanged = date => {
        if (date !== null) {
            let mes = (date.getMonth()) + 1;
            let dia = date.getDate()
            let fechaform = date.getFullYear() + '/' + (mes < 10 ? '0' + mes : mes) + '/' + (dia < 10 ? '0' + dia : dia)
            this.setState({
                fechafactura: date,
                disablecheck: true
            })
            this.props.filtering(fechaform)
        }
        else {
            this.setState({ disablecheck: false });
        }
    }

    keyHandler = (e) => {
        let isnum = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105);
        let ispoint = e.keyCode === 110 || e.keyCode === 190;
        let isbackspace = e.keyCode === 8;
        if (!isnum && !ispoint && !isbackspace) {
            e.preventDefault();
        }
    }

    handleInputChange = (e, f) => {
        let item = { key: f.key, total: f.total, serie: f.serie, folio: f.folio, acumulado: f.acumulado, uuid: f.uuid }
        let amount = e.target.value;
        const name = e.target.name;
        const { valueItems, listItems, monto } = this.state;
        let index = -1;
        let sumaActual = 0;
        if (listItems.length !== 0) {
            index = valueItems.map(function (e) { return e.key; }).indexOf(name);
            listItems.forEach(a => {
                sumaActual += parseFloat(a.importe_pago)
            });
        }

        let nextmonto = parseFloat(sumaActual) + parseFloat(amount);
        if (valueItems.length === 0) {
            item.importe_pago = parseFloat(amount);
            item.tipo = 'abono';
            this.setState((prevState) =>
                ({
                    sumaTotales: nextmonto,
                    valueItems: [...prevState.valueItems, item],
                    listItems: [...prevState.listItems, item],
                    monto: amount
                })
            )
        }
        else if (valueItems.some((i) => i.key === item.key && amount !== '')) {
            let vanterior = parseFloat(valueItems[index].importe_pago);
            item.importe_pago = parseFloat(amount);
            item.tipo = 'abono';
            this.setState((prevState) =>
                ({
                    sumaTotales: (parseFloat(sumaActual) - vanterior) + parseFloat(amount),
                    valueItems: valueItems.map(a => {
                        var returnValue = { ...a };
                        if (a.key == name) {
                            returnValue.importe_pago = amount;
                        }
                        return returnValue
                    }),
                    listItems: listItems.map(a => {
                        var returnValue = { ...a };
                        if (a.key == name) {
                            returnValue.importe_pago = amount;
                        }
                        return returnValue
                    })
                })
            )
        }
        else if (!valueItems.some((i) => i.key === item.key)) {
            item.importe_pago = parseFloat(amount);
            item.tipo = 'abono';
            this.setState((prevState) =>
                ({
                    sumaTotales: parseFloat(nextmonto),
                    valueItems: [...prevState.valueItems, item],
                    listItems: [...prevState.listItems, item],
                    monto: amount
                })
            )
        }
        else if (valueItems.some((i) => i.key === item.key && i.importe_pago === NaN || amount === '')) {
            let vanterior = parseFloat(valueItems[index].importe_pago);
            this.setState((prevState) =>
                ({
                    sumaTotales: sumaActual - parseFloat(vanterior),
                    valueItems: prevState.valueItems.filter(i => i.key !== item.key),
                    listItems: prevState.listItems.filter(i => i.key !== item.key)
                })
            )
        }

    }
    handleInputChangeTarjeta = (e) => {
        let amount = e.target.value;
        this.setState({ montotarjeta: amount })
    }
    handleInputChangeTarjetaAmex = (e) => {
        let amount = e.target.value;
        this.setState({ montoamex: amount })
    }

    render() {
        const { creating, created, requesting, facturas } = this.props;
        const { listItems, valueItems, checkedItems, sumaTotales, montoamex, open, montotarjeta, disablecheck, checkfechahoy, fechafactura } = this.state;
        var tarjetas = parseFloat(montotarjeta === "" ? 0 : montotarjeta) + parseFloat(montoamex === "" ? 0 : montoamex)
        var efectivo = (parseFloat(sumaTotales) - parseFloat(tarjetas === "" ? 0 : tarjetas));
        if (creating) {
            return <CustomLoader active inline='centered'
                text='Creando poliza'
            />
        }
        if (requesting) {
            return <CustomLoader active inline='centered'
                text='Cargando facturas'
            />

        }
        else if (created) {
            return <CorteResponse />
        }
        return (<Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header size='medium' dividing>
                        <Icon name='money bill alternate' />
                        <Header.Content>
                            {`Facturas corte del dia: `}
                            <Header.Subheader>{}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
                <Grid.Column >
                    <Header size='small' >Tarjeta: <Input size='mini' icon='money' type='text' name='txt_tarjeta'
                        placeholder='Monto de tarjetas...'
                        onChange={(e) => this.handleInputChangeTarjeta(e)}
                        onKeyDown={this.keyHandler}
                        value={montotarjeta}
                        pattern="(^\d+\.?\d+$)|(^\d+%$)" /></Header>
                    <Header size='small' >AMEX  : <Input size='mini' icon='money' type='text' name='txt_tarjeta_amex'
                        placeholder='Monto tarjeta amex...'
                        onChange={(e) => this.handleInputChangeTarjetaAmex(e)}
                        onKeyDown={this.keyHandler}
                        value={montoamex}
                        pattern="(^\d+\.?\d+$)|(^\d+%$)" /></Header>
                </Grid.Column>
                <Grid.Column>
                    <Header size='small' >Efectivo: <Currency quantity={efectivo} /></Header>
                    <Header size='small' >Suma Total: <Currency quantity={sumaTotales} /></Header>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Button onClick={this.show(true)} color='green' size='large' disabled={(listItems.length === 0)}>
                        Crear Corte
                </Button>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
                <Grid.Column>
                    <Checkbox toggle
                        label='Fecha de hoy'
                        disabled={disablecheck}
                        onChange={(e) => this.oncheckFechahoy(e)}
                        checked={checkfechahoy} />
                </Grid.Column>
                <Grid.Column>
                    <Header size='tiny' >Seleccionar fecha  :
                    <DatePicker value={fechafactura}
                            onChange={this.onDateChanged}
                            clearIcon={null}
                            locale={'es-419'}
                            format={'yyyy-MM-dd'}
                            disabled={this.state.checkfechahoy == true}
                        />
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row colums={2}>
                <Grid.Column width={10}>
                    <Table color='teal' selectable  >
                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell >Fecha Factura</Table.HeaderCell>
                                <Table.HeaderCell>Serie-Folio</Table.HeaderCell>
                                <Table.HeaderCell>Moneda</Table.HeaderCell>
                                <Table.HeaderCell>Total Factura</Table.HeaderCell>
                                <Table.HeaderCell>Abonado</Table.HeaderCell>
                                <Table.HeaderCell />
                                <Table.HeaderCell />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                facturas.map((f, i) =>
                                    (
                                        <Table.Row key={f.key} >
                                            <Table.Cell >{f.fecha.split(" ")[0]}</Table.Cell>
                                            <Table.Cell>{`${f.serie}-${f.folio}`}</Table.Cell>
                                            <Table.Cell>{f.moneda}</Table.Cell>
                                            <Table.Cell><Currency quantity={f.total} /></Table.Cell>
                                            <Table.Cell><Currency quantity={f.acumulado} /></Table.Cell>
                                            <Table.Cell>
                                                <Input icon='money' type='text' name={f.key}
                                                    placeholder='Monto del pago...'
                                                    onChange={(e, data) => this.handleInputChange(e, f)}
                                                    disabled={checkedItems.some((i) => i.key === f.key)}
                                                    onKeyDown={this.keyHandler}
                                                    //value={monto}
                                                    pattern="(^\d+\.?\d+$)|(^\d+%$)" />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Checkbox toggle
                                                    name={f.key}
                                                    disabled={(valueItems.some((i) => i.key === f.key))}
                                                    onChange={(e, data) => this.onChange(e, f)}
                                                    checked={checkedItems.some((i) => i.key === f.key)}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div>
                                                    {/*JSON.stringify(this.state.valueItems)*/}
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                )}
                        </Table.Body>
                    </Table>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Table inverted color='teal' selectable>
                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell>Serie-Folio</Table.HeaderCell>
                                <Table.HeaderCell>Pago</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                listItems.map((f, i) =>
                                    (
                                        <Table.Row key={f.key}>
                                            <Table.Cell>{`${f.serie}-${f.folio}`}</Table.Cell>
                                            <Table.Cell>
                                                <Currency quantity={f.importe_pago} />
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                )}
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
            <Modal size='tiny' open={open}>
                <Modal.Header>Confirmar corte de caja</Modal.Header>
                <Modal.Content>¿Estás seguro de crear este corte de caja?</Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.close}>No</Button>
                    <Button positive onClick={this.onSubmit}>Confirmar</Button>
                </Modal.Actions>
            </Modal>
        </Grid >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bancos: state.corte.bancos,
        facturas: state.corte.facturas ? state.corte.facturas : [],
        requesting: state.corte.requesting,
        creating: state.corte.creating,
        created: state.corte.created
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFacturasCorte: (idEmpresa) => dispatch(corteActions.getAll(idEmpresa)),
        crearCorte: (data) => dispatch(corteActions.crearCorte(data)),
        alerta: (advertencia) => dispatch(alertActions.info(advertencia)),
        filtering: (fechacorte) => dispatch(corteActions.filtering(fechacorte))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AbonoFactura)