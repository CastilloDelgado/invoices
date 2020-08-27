import React, { Component } from 'react';
import { Button, Icon, Table, Grid, Input, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { agentesActions } from '..';
import { CustomLoader } from '../../_custom';


class AgentesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            selected: null,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            searchText: e.target.value
        });
        this.props.filtering(e.target.value)
    }

    componentDidMount() {
        this.props.getAll();
    }

    render() {
        const { agentes, requesting, match } = this.props;
        if (requesting) {
            return <CustomLoader active inline />;
        }
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Input fluid icon='search' placeholder='Buscar por nombre...' onChange={this.handleChange} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Table celled selectable compact='very'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nombre</Table.HeaderCell>
                                <Table.HeaderCell>RFC</Table.HeaderCell>
                                <Table.HeaderCell>Tipo</Table.HeaderCell>
                                <Table.HeaderCell>Organisation code</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {agentes.map(a =>
                                (
                                    <Table.Row key={a.key}>
                                        <Table.Cell>{a.nombre}</Table.Cell>
                                        <Table.Cell>{a.rfc}</Table.Cell>
                                        <Table.Cell>{a.tipo}</Table.Cell>
                                        <Table.Cell>{a.organisation_code}</Table.Cell>
                                        {/*<Table.Cell>
                                            <Popup trigger={
                                                <Button as={Link} 
                                                    to={``} icon color='teal'>
                                                    <Icon name='edit'/>
                                                </Button> }
                                                content="editar"
                                            />
                                            </Table.Cell>*/}
                                    </Table.Row>
                                )
                            )}
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        agentes: state.agente.agentes ? state.agente.agentes : [],
        requesting: state.agente.requesting
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAll: () => dispatch(agentesActions.getAll()),
        filtering: (search) => dispatch(agentesActions.filtering(search))
        /* _delete : (id) => dispatch(tiposErogacionActions._delete(id))  */
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentesList)