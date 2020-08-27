import React from 'react'
import { Grid, Table, Icon, Header, Container, Dropdown, Input, Checkbox, Button, Popup, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { listasActions } from '../'
import { CustomLoader } from '../../_custom'
import CurrencyFormat from 'react-currency-format';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { alertActions } from '../../Alert';
import { Link } from 'react-router-dom';
import { object } from 'prop-types'


class ListaFacturas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSupplier: null,
      agentes: [],
      filtrofechasRango: ['', ''],
      checkedpend: false,
      checkedaut: false,
      checkedexpor: false,
      checkedrech: false,
      filtro: {},
      invoices: {},
      open: false
    };
    this.filtroschanged = this.filtroschanged.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    //this.handleChange = this.handleChange.bind(this);
  }


  filtroschanged(e, data) {
    const { filtro } = this.state;
    if (data.name == 'status_pend')
      this.setState({
        checkedpend: true,
        checkedaut: false,
        checkedexpor: false,
        checkedrech: false
      })
    else if (data.name == 'status_aut')
      this.setState({
        checkedaut: true,
        checkedpend: false,
        checkedexpor: false,
        checkedrech: false
      })
    else if (data.name == 'status_rech')
      this.setState({
        checkedrech: true,
        checkedpend: false,
        checkedexpor: false,
        checkedaut: false,
      })
    else if (data.name == 'status_expor')
      this.setState({
        checkedexpor: true,
        checkedrech: false,
        checkedpend: false,
        checkedaut: false,
      })
    if (data.name == 'status_pend' || data.name == 'status_aut' || data.name == 'status_rech' || data.name == 'status_expor') {
      filtro.status = data.value;
    }
    else {
      if (data.value != '')
        filtro[data.name] = data.value;
      else
        delete filtro[data.name];
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


  handleFilterClick(e, data) {
    const { filtro } = this.state;
    if (window.location.href.includes('admin')) {
      if (filtro.agente_filtro) {
        this.props.getList(filtro, JSON.parse(localStorage.getItem('user')).user.id)
      }
      else {
        alertActions.info("Favor de ingresar un proovedor")
      }

    }
    else { this.props.getList(filtro, null) }
  }
  handleReject(e, data) {
    const { facturas } = this.props;
    const { filtro, invoices } = this.state;
    let statusfactura = facturas.find(f => f.id === invoices.facturas[0]).status;
    if (statusfactura != 5 && statusfactura != 6) {
      this.props.updateInvoiceStatus(invoices, filtro, JSON.parse(localStorage.getItem('user')).user.id);
    }
    else {
      alertActions.info("La factura ya fue cancelada")
    }
    this.setState({
      open: false,
      invoices: {}
    })
  }
  handleOpenModal(e, data) {
    let invoicesaux = {
      facturas: [data.id],
      status: data.value
    }
    this.setState({
      open: true,
      invoices: invoicesaux
    })
  }
  handleCloseModal() {
    this.setState({
      open: false,
      invoices: {}
    })
  }

  componentDidMount() {
    this.props.getAgentes();
    /*this.setState({
      agentes: this.props.agentes
    })*/
  }

  stringExplode(string) {
    var strArray = string.split(",");
    let strExplode = "";
    for (var i = 0; i < strArray.length; i++) {
      strExplode += strArray[i] + "\n";
    }
    return strExplode;
  }


  render() {
    const { requesting, facturas, agentes } = this.props;
    const { filtrofechasRango, checkedaut, checkedpend, checkedrech, checkedexpor, open } = this.state;
    let options = null;
    if (agentes) { this.state.agentes = agentes }
    if (this.state.agentes) {
      let { agentes } = this.state.agentes;
      if (agentes) {
        options = agentes.map(x => {
          return ({
            key: x.key,
            text: x.nombre,
            value: x.key,
          });
        });
      }
    }

    return (
      <Container fluid>
        <Header size="small" dividing>
          <Icon name="list" />
          <Header.Content>
            Lista de Facturas
            <Header.Subheader>Aquí se muestran todas las facturas cargadas por tus proveedores.</Header.Subheader>
          </Header.Content>
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h3>Filtros</h3>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
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
              {
                (window.location.href.includes('admin'))
                  ?
                  <Dropdown options={options}
                    search
                    selection
                    fluid
                    name='agente_filtro'
                    onChange={this.filtroschanged}
                    placeholder="Escribe el RFC del proveedor..." />
                  :
                  null
              }
            </Grid.Column>
            <Grid.Column>
              <Input icon='eye' type='text'
                placeholder='Serie o Folio...'
                name='serie_folio'
                onChange={this.filtroschanged}
                pattern="(^\d+\.?\d+$)|(^\d+%$)" />
            </Grid.Column>
            <Grid.Column>
              <Input icon='eye' type='text'
                placeholder='job...'
                name='job'
                onChange={this.filtroschanged}
                pattern="(^\d+\.?\d+$)|(^\d+%$)" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={4}>
            <Grid.Column>
              <Checkbox name='status_pend'
                radio
                checked={checkedpend}
                onChange={this.filtroschanged}
                label='Pendiente'
                value={1}
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
            <Grid.Column>
              <Checkbox name='status_rech'
                radio
                checked={checkedrech}
                onChange={this.filtroschanged}
                value={5}
                label='Rechazada' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button primary
                onClick={this.handleFilterClick}
              >Buscar</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="13">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="table-to-xls"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Download as XLS"
              />
              <Table id="table-to-xls"
                celled
                size="small"
              >
                <Table.Header>
                  <Table.HeaderCell width="1">Estado</Table.HeaderCell>
                  <Table.HeaderCell width="1">RFC</Table.HeaderCell>
                  <Table.HeaderCell width="1">Serie y Folio</Table.HeaderCell>
                  <Table.HeaderCell width="1">Job</Table.HeaderCell>
                  <Table.HeaderCell width="1">UUID</Table.HeaderCell>
                  <Table.HeaderCell width="1">Total de la Factura</Table.HeaderCell>
                  <Table.HeaderCell width="1">Acumulado</Table.HeaderCell>
                  <Table.HeaderCell width="1">Restante</Table.HeaderCell>
                  <Table.HeaderCell width="1">Número de Abonos</Table.HeaderCell>
                  <Table.HeaderCell width="1">Complementos</Table.HeaderCell>
                  <Table.HeaderCell width="1"></Table.HeaderCell>
                </Table.Header>
                {requesting
                  ?
                  <Table.Body>
                    <Table.Row>
                      <CustomLoader />
                    </Table.Row>
                  </Table.Body>
                  :
                  (
                    <Table.Body>
                      {facturas ? (facturas.map(factura => {
                        const estados = (factura.status == 1 ? 'Pendiente Capturar Chargecode' : factura.status == 2 || factura.status == 3 ? 'Autorizada' : factura.status == 4 ? 'Exportada' : factura.status == 5 ? 'Rechazada por SB' : factura.status == 6 ? 'Rechazada por proveedor' :  factura.status == 8 ? 'Pendiente capturar montos job' : '')
                        const statusRechazo = window.location.href.includes('admin') ? 5 : 6
                        const valuejobs = this.stringExplode(factura.job);
                        return (
                          <Table.Row>
                            <Table.Cell>{estados}</Table.Cell>
                            <Table.Cell>{factura.rfc}</Table.Cell>
                            <Table.Cell>{(factura.serie ? factura.serie + "-" : "") + factura.folio}</Table.Cell>
                            <Table.Cell>{valuejobs}</Table.Cell>
                            <Table.Cell>{factura.uuid}</Table.Cell>
                            <Table.Cell>
                              <CurrencyFormat
                                value={factura.total}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'} />
                            </Table.Cell>
                            <Table.Cell>
                              <CurrencyFormat
                                value={factura.acumulado}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'} />
                            </Table.Cell>
                            <Table.Cell>
                              <CurrencyFormat
                                value={factura.restante}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'} />
                            </Table.Cell>
                            <Table.Cell>{factura.n_abonos}</Table.Cell>
                            <Table.Cell>
                              <ul>
                                {factura.complementos.map(complemento => {
                                  const complento = complemento.serie == null ? complemento.folio : complemento.serie + "-" + complemento.folio
                                  return (
                                    <li>{complento}</li>
                                  )
                                })}
                              </ul>
                            </Table.Cell>
                            <Table.Cell>
                              <Popup trigger={
                                <Button value={statusRechazo} id={factura.id} onClick={this.handleOpenModal} icon color='red'>
                                  <Icon name='ban' />
                                </Button>}
                                content="Rechazar"
                              />
                            </Table.Cell>
                          </Table.Row>
                        )
                      })) : (null)
                      }
                    </Table.Body>
                  )
                }
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Modal open={open} basic size='mini'>
            <Header icon='file outline' content='Cancelar Factura' />
            <Modal.Content>
              <p>
                Estas seguro de cancelar la factura?
           </p>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color='red' inverted onClick={this.handleCloseModal}>
                <Icon name='remove' /> No
      </Button>
              <Button color='green' inverted onClick={this.handleReject}>
                <Icon name='checkmark' /> Si
      </Button>
            </Modal.Actions>
          </Modal>
        </Grid>

      </Container >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    requesting: state.listas.requesting,
    facturas: state.listas.facturas,
    agentes: state.listas.agentes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getList: (filtro, idUsuario) => dispatch(listasActions.getList(filtro, idUsuario)),
    getAgentes: () => dispatch(listasActions.getAgentes()),
    updateInvoiceStatus: (invoices, filtro, idUsuario) => dispatch(listasActions.updateInvoiceStatus(invoices, filtro, idUsuario))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaFacturas)
