import React, { Component } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { cuentasActions } from '..';
import { CustomLoader } from '../../_custom';


class CuentasList extends Component {
    componentDidMount(){
        this.props.getAll();
    }

    render(){
        const {cuentas, requesting, _delete} = this.props;
        if(requesting){
            return  <CustomLoader active inline />;
        }
        return (
            <Table celled selectable compact='very'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>RFC</Table.HeaderCell>
                        <Table.HeaderCell>N° Cuenta</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {cuentas.map(a => 
                        (
                            <Table.Row key={a.key}>
                                <Table.Cell>
                                    {a.rfc}
                                </Table.Cell>
                                <Table.Cell>
                                    {a.cuenta}
                                </Table.Cell>
                                <Table.Cell  >
                                    <Button color='red' floated='right' size='tiny' onClick={() => _delete(a.key)}>
                                        <Icon name='trash'/>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                            )
                    )}
                </Table.Body>
            </Table>
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
        cuentas: state.cuenta.cuentas ? state.cuenta.cuentas : [],
        requesting: state.cuenta.requesting
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAll : () => dispatch(cuentasActions.getAll()),
        /* _delete : (id) => dispatch(tiposErogacionActions._delete(id))  */       
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(CuentasList)