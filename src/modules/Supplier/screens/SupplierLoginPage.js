import React from 'react';
import { connect } from 'react-redux';
import { Form, Grid, Image, Segment, Divider } from 'semantic-ui-react'

import { supplierActions } from '../supplier.actions';
import { AppButton } from '../../_custom'
import { colors, Logo } from '../../../utils'

class SupplierLoginPage extends React.Component {
    constructor(props) {
        super(props);
        const supplier = localStorage.getItem('supplier');
        console.log(supplier);
        if(supplier){
            this.props.dispatch(supplierActions.logout(JSON.parse(supplier).user));
        }


        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(supplierActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className='login-form'>
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 500 }}>
                        <Form size='large' onSubmit={this.handleSubmit} inverted loading={loggingIn}>
                            <Segment stacked inverted>
                                <h3>Proveedores</h3>
                                <Logo/>
                                <Divider/>
                                <Form.Input
                                    fluid icon='user'
                                    label='Usuario'
                                    name='username'
                                    error={submitted && !username}
                                    iconPosition='left'
                                    placeholder='Username'
                                    value={username}
                                    onChange={this.handleChange}
                                />
                                {submitted && !username &&
                                    <div className="help-block">Username is required</div>
                                }
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    label='Contraseña'
                                    name='password'
                                    error={submitted && !password}
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    value={password}
                                    onChange={this.handleChange}
                                />
                                {submitted && !password &&
                                    <div className="help-block">Password is required</div>
                                }
                                <AppButton color='black' backgroundColor={colors.blueKrono} fluid size='large'>
                                    Login
                                </AppButton>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.supplier;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(SupplierLoginPage);
export { connectedLoginPage as SupplierLoginPage };
