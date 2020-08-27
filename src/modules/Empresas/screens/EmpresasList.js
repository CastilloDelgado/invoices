import React, { Component } from 'react';
import { Grid, Header, Input, Loader, Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { empresasActions } from '../';
import { Logo } from '../../../utils';

class EmpresasList extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText : ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        const { searchText } = this.state;
        await this.props.getAssigned(searchText);
    }

    handleChange(e){
        this.setState({
            searchText: e.target.value
        });
        this.props.getAssigned(e.target.value)
    }    

    render() {
        const { companies, requesting, selectCompany } = this.props;
        if(requesting){
            return  <Loader active inline />;
        }
        
        return (
            <Grid columns={1}>
                <Grid.Row centered>
                    <Header as='h1' color='grey'>Selecciona una empresa</Header>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Input fluid icon='search' placeholder='Buscar por nombre...' onChange={this.handleChange} />
                    </Grid.Column>                    
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Card.Group itemsPerRow={6}>
                            {companies.map(company =>                                                                                                              
                                (<Card key={company.id} link onClick={() => selectCompany(company)}>
                                    <Logo/>
                                    <Card.Content> 
                                        <Card.Header>{company.nombre}</Card.Header>
                                    </Card.Content>
                                </Card>)
                            )}
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
                
        );
    }
}

const mapStateToProps = (state) => {
    const { companies, requesting } = state.empresas;
    return {
        companies: companies ? companies : [],
        requesting
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAssigned : (searchText) => dispatch(empresasActions.getAssigned(searchText)),
        selectCompany : (company) => dispatch(empresasActions.select(company))
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(EmpresasList);