import { supplierConstants, supplierService } from './';
import { alertActions, alertConstants } from '../Alert';
import { history } from '../../helpers';

export const supplierActions = {
    login,
    logout,
    register,
    changePassword,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        supplierService.login(username, password)
            .then(
                response => {
                    if (response.status) {
                        dispatch(success(response.data));
                        dispatch(alertActions.success(`Bienvenido: ${username}!`));
                        const { status, opinion } = (JSON.parse(localStorage.getItem('supplier')));
                        if (status && opinion) {
                            history.push('/prov/inicio');
                        } else {
                            if (!opinion) {
                                history.push('/prov/opinion');
                            } else {
                                history.push('/prov/inicio');
                            }
                        }
                    }
                    else {
                        dispatch(failure(response.message));
                        dispatch(alertActions.error(response.message))
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) {
        return { type: supplierConstants.LOGIN_REQUEST, user }
    }

    function success(user) {
        return { type: supplierConstants.LOGIN_SUCCESS, user }
    }

    function failure(error) {
        return { type: supplierConstants.LOGIN_FAILURE, error }
    }
}

function logout(user) {
    return dispatch => {
        dispatch(alertActions.info(`${user.nombre} ${user.apellido_paterno} Ha cerrado sesión.`))
        history.push('/');
        supplierService.logout();
        return {
            type: supplierConstants.LOGOUT
        };
    }
}

function register(supplier) {
    return dispatch => {
        dispatch(request(supplier));
        let body = {
            Proveedor: {
                rfc: supplier.rfc,
                nombre: supplier.razonSocial,
                email: supplier.correo
            },
            Usuario: {
                username: supplier.username,
                password: supplier.password,
                nombre: supplier.firstName ? supplier.firstName : supplier.razonSocial,
                apellido_paterno: supplier.apellidoPaterno,
                apellido_materno: supplier.apellidoMaterno
            }
        }
        supplierService.register(body)
            .then(
                response => {
                    dispatch(success());
                    history.push('/proveedor/');
                    dispatch(alertActions.success(response.message));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(supplier) { return { type: supplierConstants.REGISTER_REQUEST, supplier } }
    function success(supplier) { return { type: supplierConstants.REGISTER_SUCCESS, supplier } }
    function failure(error) { return { type: supplierConstants.REGISTER_FAILURE, error } }
}

function changePassword(data) {
    return dispatch => {
        dispatch(request())
        const { idSupplier, CurrentPassword, NewPassword, ConfirmPassword } = data
        let password;
        supplierService.getPassword(idSupplier)
            .then(
                response => {
                    password = response.data
                    if (password === CurrentPassword) {
                        if (NewPassword === ConfirmPassword) {
                            supplierService.changePassword({ "idSupplier": idSupplier, "newPassword": NewPassword })
                                .then(
                                    response => {
                                        dispatch(success(response.message))
                                        dispatch(alertActions.success(response.message))
                                    },

                                    error => {
                                        dispatch(failure(error.toString))
                                        dispatch(alertActions.error("Error al actualizar la contraseña."))
                                    }
                                )
                        } else {
                            dispatch(failure())
                            dispatch(alertActions.error("Las contraseñas no coinciden"))
                        }
                    } else {
                        dispatch(failure())
                        dispatch(alertActions.error("La contraseña es incorrecta"))
                    }
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            )
    }

    function request() { return { type: supplierConstants.CHANGE_PASSWORD_REQUEST } }
    function success() { return { type: supplierConstants.CHANGE_PASSWORD_SUCCESS } }
    function failure(error) { return { type: supplierConstants.CHANGE_PASSWORD_FAILURE, error } }
}