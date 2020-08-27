import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Form, Button, Divider } from 'semantic-ui-react'
import { supplierActions } from '../'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                razonSocial: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                rfc: '',
                razonSocial: '',
                correo: '',
                username: '',
                password: '',
                firstName : ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.rfc && user.razonSocial && user.username && user.password) {
          this.props.register(this.state.user)
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (

            <div >
              <Grid columns={3} >
                <Grid.Row></Grid.Row>
                <Grid.Row>
                  <Grid.Column ></Grid.Column>
                  <Grid.Column centered color="blue">
                    <h2>Registro de Proveedores</h2>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column></Grid.Column>
                  <Grid.Column color="">
                  <h3>Llena los siguientes campos: </h3>
                  <Form name="form" onSubmit={this.handleSubmit}>
                      <Form.Field className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                          <label htmlFor="firstName">Nombre</label>
                          <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                          {/*submitted && !user.firstName &&
                              <div className="help-block">First Name is required</div>
                          */}
                      </Form.Field>
                      <Form.Group>
                        <Form.Field  inline className={'form-group' + (submitted && !user.apellidoPaterno ? ' has-error' : '')}>
                            <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                            <input type="text" className="form-control" name="apellidoPaterno" value={user.apellidoPaterno} onChange={this.handleChange} />
                            {/*submitted && !user.apellidoPaterno &&
                                <div className="help-block">Last Name is required</div>
                            */}
                        </Form.Field >
                        <Form.Field  inline className={'form-group' + (submitted && !user.apellidoMaterno ? ' has-error' : '')}>
                            <label htmlFor="apellidoMaterno">Apellido Materno</label>
                            <input type="text" className="form-control" name="apellidoMaterno" value={user.apellidoMaterno} onChange={this.handleChange} />
                            {/*submitted && !user.apellidoMaterno &&
                                <div className="help-block">Last Name is required</div>
                            */}
                        </Form.Field >
                      </Form.Group>

                      <Form.Field className={'form-group' + (submitted && !user.razonSocial ? ' has-error' : '')}>
                          <label htmlFor="razonSocial">Razon Social</label>
                          <input type="text" className="form-control" name="razonSocial" value={user.razonSocial} onChange={this.handleChange} />
                          {submitted && !user.razonSocial &&
                              <div className="help-block">la razon social es requerida</div>
                          }
                      </Form.Field>

                      <Form.Field className={'form-group' + (submitted && !user.rfc ? ' has-error' : '')}>
                          <label htmlFor="rfc">RFC</label>
                          <input type="text" className="form-control" name="rfc" value={user.rfc} onChange={this.handleChange} />
                          {submitted && !user.rfc &&
                              <div className="help-block">rfc es requerido</div>
                          }
                      </Form.Field>

                      <Form.Field  className={'form-group' + (submitted && !user.correo ? ' has-error' : '')}>
                          <label htmlFor="correo">Correo</label>
                          <input type="text" className="form-control" name="correo" value={user.correo} onChange={this.handleChange} />
                          {/*submitted && !user.correo &&
                              <div className="help-block">correo is required</div>
                          */}
                      </Form.Field >

                      <Form.Field  className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                          <label htmlFor="username">Username</label>
                          <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                          {submitted && !user.username &&
                              <div className="help-block">Usuario es requerido</div>
                          }
                      </Form.Field >

                      <Form.Field className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                          <label htmlFor="password">Password</label>
                          <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                          {submitted && !user.password &&
                              <div className="help-block">contraseña es requerida</div>
                          }
                      </Form.Field >
                      <div className="form-group">
                        <Divider horizontal> </Divider>
                          <Button.Group>
                            <Button primary>Register</Button>
                            <Button.Or />
                            {registering &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Button negative href="/login" className="btn btn-link">Cancel</Button>

                          </Button.Group>

                      </div>
                  </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

            </div>
        );
    }
}

function mapDispatchToProps (dispatch) {
    return {
        register: (data) => dispatch(supplierActions.register(data))
    };
}

const connectedRegisterPage = connect(null, mapDispatchToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
