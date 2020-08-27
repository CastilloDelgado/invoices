import React, { Component } from 'react';
import { Button, Table, Header, Grid, Icon, Modal, Popup, Dropdown } from 'semantic-ui-react';
import Currency from 'react-currency-formatter';
import { connect } from 'react-redux';
import { corteActions } from '../corte.actions';
import DatePicker from 'react-date-picker';
import { CustomLoader } from '../../_custom';


class ListarCorte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            idcorte: 0,
            fechaPoliza: new Date(),
            idUser: 0,
            tipodeposito: 0,
            cortes: [],
            fechacorte: "",
            companies: [],
            company: ''
        }
    }
    show = (id, tipodeposito) => () => this.setState({
        open: true,
        idcorte: id,
        tipodeposito: tipodeposito
    })



    close = () => this.setState({
        open: false
    })

    componentDidMount() {
        const { cortes } = this.props
        let idUser = JSON.parse(localStorage.getItem("user")).user.id;
        this.props.getCortes(idUser);
        this.getEmpresas();
        this.setState({
            idUser: idUser,
            cortes: cortes
        });
    }

    getEmpresas() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.companies) {
            let array = [];
            for (let index = 0; index < user.companies.length; index++) {
                let company = {
                    'key': user.companies[index].id,
                    'text': user.companies[index].nombre,
                    'value': user.companies[index].nombre
                }
                array.push(company);
            }
            this.setState({
                companies: array
            });
        }
    }
    onSelectionChanged = (e, data) => {
        const { fechacorte } = this.state;
        let fechaform = ''
        if (fechacorte !== '') {
            let date = new Date(fechacorte)
            let mes = (date.getMonth()) + 1;
            let dia = date.getDate()
            fechaform = date.getFullYear() + '/' + (mes < 10 ? '0' + mes : mes) + '/' + (dia < 10 ? '0' + dia : dia)
        }
        let filtro =
        {
            fechacorte: fechaform,
            empresa: data.value
        }
        this.setState({ company: data.value });
        if (data.value !== '' || fechaform !== '') {
            this.props.filteringcorte(filtro)
        }
        else {
            this.props.filteringcorte()
        }
    }

    onDateChangedcorte = date => {
        const { company } = this.state
        let fechaform = ''
        let filtro =
        {
            fechacorte: fechaform,
            empresa: company
        }
        if (date !== null) {
            let mes = (date.getMonth()) + 1;
            let dia = date.getDate()
            fechaform = date.getFullYear() + '/' + (mes < 10 ? '0' + mes : mes) + '/' + (dia < 10 ? '0' + dia : dia)
            this.setState({
                fechacorte: date
            })
            filtro =
            {
                fechacorte: fechaform,
                empresa: company
            }
            this.props.filteringcorte(filtro)
        }
        else {
            this.setState({
                fechacorte: ''
            })
            if (company !== '') {
                this.props.filteringcorte(filtro)
            }
            else {
                this.props.filteringcorte()
            }
        }
    }

    onDateChangedpoliza = date => {
        this.setState({
            fechaPoliza: date
        })
    }


    clearstate() {
        this.setState({
            open: false,
            idcorte: 0,
            fechaPoliza: new Date(),
            idempresa: 0,
        });
    }

    onSubmit = () => {
        const { idcorte, tipodeposito, fechaPoliza } = this.state
        let metodo = tipodeposito == 1 ? 'efectivo' : tipodeposito == 2 ? 'tarjeta' : tipodeposito == 3 ? 'Amex' : ''
        let nombre = 'Poliza ' + metodo + ' ' + fechaPoliza;
        let extension = '.csv';
        let data = {
            idcorte: idcorte,
            fechaPoliza: fechaPoliza,
            tipodeposito: tipodeposito,
            nombre: nombre,
            extension, extension
        }
        this.clearstate();
        this.props.crearPoliza(data);

    }

    render() {
        const { requesting, creating, cortes } = this.props;
        const { open, fechaPoliza, fechacorte, companies, company } = this.state;

        if (requesting) {
            return <CustomLoader active inline='centered'
                text='Cargando cortes' />
        }
        else if (creating) {
            return <CustomLoader active inline='centered'
                text='Creando poliza' />
        }
        return (<Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header size='medium' dividing>
                        <Icon name='money bill alternate' />
                        <Header.Content>
                            {`Cortes`}
                            <Header.Subheader>{}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
                <Grid.Column width={4}>
                    <DatePicker
                        value={fechacorte}
                        onChange={this.onDateChangedcorte}
                        clearIcon={null}
                        locale={'es-419'}
                        format={'yyyy-MM-dd'}
                    />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Dropdown
                        placeholder='Selecciona la sucursal'
                        clearable
                        options={companies}
                        selection
                        onChange={this.onSelectionChanged}
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row colums={2}>
                <Grid.Column width={11}>
                    <Table color='teal' selectable  >
                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell>Sucursal</Table.HeaderCell>
                                <Table.HeaderCell>Fecha</Table.HeaderCell>
                                <Table.HeaderCell>Total corte</Table.HeaderCell>
                                <Table.HeaderCell>Total efectivo</Table.HeaderCell>
                                <Table.HeaderCell>Total tarjeta</Table.HeaderCell>
                                <Table.HeaderCell>Total amex</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                cortes.map((c, i) =>
                                    (
                                        <Table.Row key={c.id} >
                                            <Table.Cell >{c.empresa}</Table.Cell>
                                            <Table.Cell >{c.fecha_creacion}</Table.Cell>
                                            <Table.Cell><Currency quantity={c.total_corte} /></Table.Cell>
                                            <Table.Cell><Currency quantity={c.total_corte - c.total_tarjeta} /></Table.Cell>
                                            <Table.Cell><Currency quantity={c.total_tarjeta} /></Table.Cell>
                                            <Table.Cell><Currency quantity={c.total_amex} /></Table.Cell>
                                            <Table.Cell>
                                                <Popup content="Poliza efectivo" trigger={
                                                    <Button onClick={this.show(c.id, 1)} disabled={c.total_corte - c.total_tarjeta == 0 ? true : false} basic color='black' icon color='black'>
                                                        <Icon name='file excel outline' />
                                                    </Button>} />
                                                <Popup content="Poliza tarjeta" trigger={
                                                    <Button onClick={this.show(c.id, 2)} disabled={c.total_tarjeta == 0 ? true : false} basic color='black' icon color='red'>
                                                        <Icon name='file excel outline' />
                                                    </Button>} />
                                                <Popup content="Poliza AMEX" trigger={
                                                    <Button onClick={this.show(c.id, 3)} disabled={c.total_amex == 0 ? true : false} basic color='black' icon color='green'>
                                                        <Icon name='file excel outline' />
                                                    </Button>} />
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                )}
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
            <Modal size='mini' open={open}>
                <Modal.Header >Selecciona la Fecha con la que quieres crear la poliza</Modal.Header>
                <Modal.Actions>
                    <DatePicker
                        value={fechaPoliza}
                        onChange={this.onDateChangedpoliza}
                        clearIcon={null}
                        locale={'es-419'}
                        format={'yyyy-MM-dd'}
                    />
                    <Button size='mini' negative onClick={this.close}>Cancelar</Button>
                    <Button size='mini' positive onClick={this.onSubmit}>Confirmar</Button>
                </Modal.Actions>
            </Modal>
        </Grid>)
    }
}
const mapStateToProps = (state) => {
    return {
        cortes: state.corte.cortes ? state.corte.cortes : [],
        requesting: state.corte.requesting,
        creating: state.corte.creating,
        created: state.corte.created
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCortes: (idUser) => dispatch(corteActions.getCorteAll(idUser)),
        crearPoliza: (data) => dispatch(corteActions.crearPoliza(data)),
        filteringcorte: (filtro) => dispatch(corteActions.filteringCorte(filtro))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarCorte)