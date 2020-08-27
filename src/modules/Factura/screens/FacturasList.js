import React, { Component } from 'react';
import {Icon, Table, Header, Grid, Checkbox} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Currency from 'react-currency-formatter';

import { facturaActions } from '..';
import { CustomLoader } from '../../_custom';
import ComplementoPago from './ComplementoPago';


class FacturasList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compMode : false,
            filteredBills : null
        }
    }

    componentDidMount(){
        const { id } = this.props.match.params
        this.props.getFacturas(id);
    }

    checkedChanged = () =>  {
        const { facturas } = this.props;
        this.setState((prevState) => ({
            compMode : !prevState.compMode,
            filteredBills : facturas.filter((item) => item.acumulado !== item.total)
        }))
    }

    //Falta redireccionar a not found cuando no se encuentre el id agente
    render(){
        const { facturas, requesting, fagente } = this.props;
        const { compMode, filteredBills } = this.state;
        if(requesting || typeof fagente === 'undefined'){
            return  <CustomLoader active inline />;
        }
        else {
            return (
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Header size='medium' dividing>
                                <Icon name='money bill alternate'/>
                                <Header.Content>
                                    {`Facturas de: ${fagente.nombre}`}
                                    <Header.Subheader>{`${fagente.rfc}`}</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Checkbox slider label='Crear complemento'
                            onChange={this.checkedChanged} />
                        </Grid.Column>
                    </Grid.Row>
                        {
                            compMode ?
                                <ComplementoPago
                                    facturas={filteredBills}
                                    fagente={fagente}
                                />
                            :
                            <Grid.Row>
                                <Grid.Column>
                                    <Table selectable>
                                        <Table.Header fullWidth>
                                            <Table.Row>
                                                <Table.HeaderCell>Fecha Factura</Table.HeaderCell>
                                                <Table.HeaderCell>Serie-Folio</Table.HeaderCell>
                                                <Table.HeaderCell>Moneda</Table.HeaderCell>
                                                <Table.HeaderCell>Total Factura</Table.HeaderCell>
                                                <Table.HeaderCell>Abonado</Table.HeaderCell>
                                                <Table.HeaderCell>Parcialidades</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {facturas.map(f =>
                                                (
                                                <Table.Row key={f.key} {...(f.acumulado === f.total ? {positive:true} : {})}>
                                                    <Table.Cell>{f.fecha.split(" ")[0]}</Table.Cell>
                                                    <Table.Cell>{`${f.serie}-${f.folio}`}</Table.Cell>
                                                    <Table.Cell>{f.moneda}</Table.Cell>
                                                    <Table.Cell>
                                                        <Currency quantity={f.total}/>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {f.acumulado === f.total ? <Icon name='checkmark'/> : null}
                                                        <Currency quantity={f.acumulado}/>
                                                    </Table.Cell>
                                                    <Table.Cell>{`${f.n_abonos}`}</Table.Cell>
                                                </Table.Row>
                                                )
                                            )}
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            </Grid.Row>
                        }
                </Grid>
            );
        }

    }

}

const mapStateToProps = (state) => {
    return {
        facturas: state.factura.facturas ? state.factura.facturas : [],
        fagente: state.factura.agente,
        requesting: state.factura.requesting
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFacturas : (idAgente) => dispatch(facturaActions.getAll(idAgente)),
        /* _delete : (id) => dispatch(tiposErogacionActions._delete(id))  */
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacturasList)
