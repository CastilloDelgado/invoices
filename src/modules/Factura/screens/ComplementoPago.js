import React, { Component } from 'react';
import { Button, Table, Header, Grid, Checkbox, Input, Modal, Dropdown} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Currency from 'react-currency-formatter';
import DatePicker from 'react-date-picker';

import { facturaActions, formasDePago } from '..';
import { CustomLoader } from '../../_custom';
import { CompResponse } from '.';


class ComplementoPago extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monto : '',
            sumaTotales : 0,
            restante : 0,
            checkedItems : [],
            fechaPago: new Date(),
            formaDePago: 'efectivo',
            open: false
        }
    }

    show = () => () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    handleInputChange = (e) => {
        let amount = e.target.value;
        let num = parseFloat(amount);
        if (amount === ''){ //Para poder poner en blanco el text input
            this.setState({
                monto: '',
                restante : 0
            });
        }
        else {
            this.setState({
                monto: amount,
                restante : amount,
                checkedItems : []
            });
        }
    }

    keyHandler = (e) => {
        let isnum = (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105);
        let ispoint = e.keyCode === 110 || e.keyCode === 190;
        let isbackspace = e.keyCode === 8;
        if (!isnum && !ispoint && !isbackspace){
            e.preventDefault();
        }
    }

    onSubmit = () => {
        const { fagente } = this.props;
        let idCompany = JSON.parse(localStorage.getItem('company')).id
        let data = {
            ...this.state,
            idCompany, //Emisor
            idAgente : fagente.id, //Receptor
        }
        this.props.crearComplemento(data);
    }

    onSelectionChanged = (e, data) => {
      this.setState({formaDePago: data.value});
    }

    onDateChanged = date => {
        this.setState({
          fechaPago: date
        });
      };

    onChange = (e, item) => {
        const { monto, checkedItems } = this.state;
        let amount = parseFloat(monto);
        if(checkedItems.length === 0){
            let nextTotal = parseFloat(item.total-item.acumulado);
            if(nextTotal > amount)
                item.importe_pago = amount;
            else
                item.importe_pago = nextTotal;
            this.setState((prevState) =>
                ({
                    sumaTotales: item.importe_pago,
                    restante: amount - item.importe_pago,
                    checkedItems: [...prevState.checkedItems, item]
                })
            )
        }
        else if(!checkedItems.some((i) => i.key === item.key)){
            let sumaActual = checkedItems.map(it => it.importe_pago).reduce((a,b) => a+b);
            let nextTotal = sumaActual + parseFloat(item.total-item.acumulado);
            if(nextTotal > amount)
                item.importe_pago = amount - sumaActual;
            else
                item.importe_pago = parseFloat(item.total-item.acumulado);
            this.setState((prevState) =>
                ({
                    sumaTotales: parseFloat(prevState.sumaTotales + item.importe_pago),
                    restante: Math.round(amount - sumaActual - item.importe_pago),
                    checkedItems: [...prevState.checkedItems, item]
                })
            )
        }
        else {
            this.setState((prevState) =>
                ({
                    sumaTotales: Math.round(prevState.sumaTotales - item.importe_pago),
                    restante : prevState.restante + item.importe_pago,
                    checkedItems : prevState.checkedItems.filter(i => i.key !== item.key)
                })
            );
        }
    }

    render() {
        const { facturas, creating, created } = this.props;
        const { monto, checkedItems, sumaTotales, restante, open, formaDePago} = this.state;
        if(creating) {
            return <CustomLoader active inline='centered'
                text='Creando recibo electrónico de pago...'
            />
        }
        else if(created){
            return <CompResponse />
        }
        return (
            <Grid>
                <Grid.Row columns={3}>
                    <Grid.Column width={6}>
                        <Input fluid label='Monto:' icon='money' type='text'
                            {...isNaN(monto) ? {error:true} : null}
                            placeholder='Ingrese monto del pago ...'
                            onChange={this.handleInputChange}
                            disabled={checkedItems.length > 0}
                            onKeyDown={this.keyHandler}
                            value={monto}
                            pattern="(^\d+\.?\d+$)|(^\d+%$)"
                        />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button onClick={this.show(true)} color='green' size='large' disabled={(monto === "" || restante > 0) || isNaN(monto)}>
                          Crear Complemento
                        </Button>
                        <Modal size='tiny' open={open}>
                          <Modal.Header>Confirmar Complemento</Modal.Header>
                          <Modal.Content>¿Estás seguro de crear este complemento?</Modal.Content>
                          <Modal.Actions>
                            <Button negative onClick = {this.close}>No</Button>
                            <Button positive onClick = {this.onSubmit}>Confirmar</Button>
                          </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                    <Grid.Column>
                        <Header>Suma: <Currency quantity={sumaTotales}/></Header>
                        <Header>Restante: {
                            isNaN(restante) ? 'Introduzca un monto correcto' 
                            : <Currency quantity={restante}/> }
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                    <Grid.Column>
                        <div>
                        <p>- Selecciona la Fecha de Pago: </p>
                        <DatePicker
                            value={this.state.fechaPago}
                            onChange={this.onDateChanged}
                            clearIcon={null}
                        />
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div>
                        <p>- Selecciona el Método de Pago: </p>
                        <Dropdown
                            placeholder='Selecciona el Método de pago'
                            fluid
                            selection
                            options={formasDePago}
                            defaultValue={formaDePago}
                            onChange={this.onSelectionChanged}
                        />
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row colums={2}>
                    <Grid.Column width={10}>
                        <Table inverted color='teal' selectable>
                            <Table.Header fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell >Fecha Factura</Table.HeaderCell>
                                    <Table.HeaderCell>Serie-Folio</Table.HeaderCell>
                                    <Table.HeaderCell>Moneda</Table.HeaderCell>
                                    <Table.HeaderCell>Total Factura</Table.HeaderCell>
                                    <Table.HeaderCell>Abonado</Table.HeaderCell>
                                    <Table.HeaderCell>Parcialidades</Table.HeaderCell>
                                    <Table.HeaderCell/>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {facturas.map( (f,i) =>
                                    (
                                    <Table.Row key={f.key}>
                                        <Table.Cell>{f.fecha.split(" ")[0]}</Table.Cell>
                                        <Table.Cell>{`${f.serie}-${f.folio}`}</Table.Cell>
                                        <Table.Cell>{f.moneda}</Table.Cell>
                                        <Table.Cell><Currency quantity={f.total}/></Table.Cell>
                                        <Table.Cell><Currency quantity={f.acumulado}/></Table.Cell>
                                        <Table.Cell>{`${f.n_abonos}`}</Table.Cell>
                                        <Table.Cell>
                                            <Checkbox toggle
                                                name={f.key}
                                                disabled={(monto==='' || restante === 0 || isNaN(monto)) && !checkedItems.some((i) => i.key === f.key)}
                                                onChange={(e, data) => this.onChange(e, f)}
                                                checked={checkedItems.some((i) => i.key === f.key)}
                                            />
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
                                    checkedItems.map( (f,i) =>
                                        (
                                        <Table.Row key={f.key}>
                                            <Table.Cell>{`${f.serie}-${f.folio}`}</Table.Cell>
                                            <Table.Cell>
                                                <Currency quantity={f.importe_pago}/>
                                            </Table.Cell>
                                        </Table.Row>
                                        )
                                )}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        creating : state.factura.creating,
        created : state.factura.created,
        //created : true
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        crearComplemento : (data) => dispatch(facturaActions.crearComplemento(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComplementoPago)
