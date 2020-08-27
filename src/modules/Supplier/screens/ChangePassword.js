import React from 'react'
import { Container, Grid, Header, Icon, Form, Button, Input, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { supplierActions } from '../'

class ChangePassword extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            idSupplier: null,
            CurrentPassword: null,
            NewPassword: null,
            ConfirmPassword: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event, data){
        const {name, value} = event.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleClick(event){
        const {CurrentPassword, NewPassword, ConfirmPassword, idSupplier} = this.state
        this.props.changePassword({idSupplier, CurrentPassword, NewPassword, ConfirmPassword})
    }

    componentDidMount(){
        this.setState({
            idSupplier: JSON.parse(localStorage.getItem("supplier")).user.id
        })
    }

    render(){
        const {CurrentPassword, NewPassword, ConfirmPassword} = this.state
        const {loading} = this.props
        let newPasswordStatus = false
        if(NewPassword){
            if(NewPassword.length > 7){
                newPasswordStatus = true
            }
        }

        return(
            <Container fluid>
                <Header size="small" dividing>
                    <Icon name="spy"/>
                    <Header.Content>
                        Cambiar Contraseña
                        <Header.Subheader>Aquí puedes cambiar la contraseña de tu cuenta.</Header.Subheader>
                    </Header.Content>
                </Header>
                <Grid>
                    <Grid.Column width="5">        
                        <Form 
                            widths="equal" 
                            warning
                            className={loading ? "loading" : ""}>
                            <Message
                                warning
                                header='Tu nueva contraseña debe cumplir con lo siguiente:'
                                list={[
                                    'Deberá tener un minimo de 7 caracteres.',
                                    'Deberás ingresar tu contraseña actual para poder actualizarla.'
                                ]}
                            />
                            <Form.Field>
                                <label>Contraseña Actual</label>
                                <input 
                                    type="password"
                                    name="CurrentPassword"
                                    onChange={this.handleChange}
                                    placeholder="Ingresa tu contraseña actual..."></input>
                            </Form.Field>   
                            <Form.Field
                                control={Input}
                                label="Contraseña Nueva" 
                                type="password"
                                name="NewPassword"
                                className={newPasswordStatus ? "" : "error"}
                                onChange={this.handleChange}
                                placeholder="Ingresa tu contraseña nueva..."
                            />
                            <Form.Field
                                control={Input}
                                label="Confirmar Contraseña Nueva" 
                                type="password"
                                name="ConfirmPassword"
                                className={(NewPassword === ConfirmPassword ) ? "" : "error"}
                                onChange={this.handleChange}
                                placeholder="Confirma tu contraseña nueva..."
                            />
                            <Button 
                                className={
                                    (newPasswordStatus) &&
                                    (CurrentPassword) && 
                                    (NewPassword && ConfirmPassword) && 
                                    (NewPassword === ConfirmPassword) ? "enabled": "disabled"
                                }
                                onClick={this.handleClick} 
                                primary>
                                Actualizar Contraseña</Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}

function mapStateToProps (state){
    return {
        loading: state.supplier.loading
    }
}

function mapDispatchToProps (dispatch) {
    return {
        changePassword: (data) => dispatch(supplierActions.changePassword(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)