import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react';
import { CustomLoader } from '../../_custom';

const ImportStatus = ({ cols, data, requesting }) => {
    if(requesting){
        return <CustomLoader/>
    }
    if(cols && data){
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        {cols.map(item =>
                            <Table.HeaderCell key={item.key}>{item.name}</Table.HeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map((r,i) =>
                        <Table.Row key={i} negative>
                            {cols.map(c => <Table.Cell key={c.key}>{ r[c.key] }</Table.Cell>)}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        );
    }
    else{
        return null;
    }
};

const mapStateToProps = (state) => {
    return {
        cols: state.factura.columns ,
        data: state.factura.data,
        requesting: state.factura.requesting
    }
}

export default connect(mapStateToProps)(ImportStatus);
