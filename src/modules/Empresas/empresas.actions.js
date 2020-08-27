import { empresasConstants, empresasService } from './';
import { alertActions } from '../Alert';
import { history } from '../../helpers';

export const empresasActions = {
    getAssigned,
    select,
    unselect
/*     getAll,
    _delete */
};

function getAssigned(searchText) {
    return dispatch => {
        dispatch(request());

        const user = JSON.parse(localStorage.getItem('user'));
        if(user.companies){
            if(searchText)
                dispatch(success(
                    user.companies.filter(
                        company => company.nombre.toLowerCase().indexOf(searchText.toLowerCase())>=0
                    )
                ))
            else
                dispatch(success(user.companies));
        }
        else {
            dispatch(failure("No se han encontrado empresas asignadas a este usuario"));
        }
    };

    function request() { 
        return { type: empresasConstants.GETASSIGNED_REQ } 
    }

    function success(companies) { 
        return { type: empresasConstants.GETASSIGNED_SUCCESS, companies } 
    }

    function failure(error) { 
        return { type: empresasConstants.GETASSIGNED_FAILURE, error } 
    }
}

function select(company){
    return dispatch => {
        localStorage.setItem('company', JSON.stringify(company));
        dispatch(selectCompany(company));
        history.push('/admin');
    }

    function selectCompany(company){
        return { type : empresasConstants.SELECT, company }
    }
}

function unselect(){
    localStorage.deleteItem('company');
    history.push('/');
}

function getAll() {
    return dispatch => {
        dispatch(request());

        empresasService.getAll()
            .then(
                response => dispatch(success(response.data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: empresasConstants.GETALL_REQ } }

    function success(centros) { return { type: empresasConstants.GETALL_SUCCESS, centros } }

    function failure(error) { return { type: empresasConstants.GETALL_FAILURE, error } }
}


function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        empresasService._delete(id)
            .then(
                response => {
                    if(response.status){
                        dispatch(success(response.data.id))
                        dispatch(alertActions.success(response.message))
                    }
                    else{
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

    function request(id) { return { type: empresasConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: empresasConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: empresasConstants.DELETE_FAILURE, id, error } }
}