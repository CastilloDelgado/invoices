import { cuentasConstants, cuentaService, allowedColumns } from '.';
import { alertActions } from '../Alert';

export const cuentasActions = {
    createImport,
    getAll,
    getCuentaAgenteAll
};

function createImport(table) {
    return dispatch => {
        const { cols, data } = table;
        dispatch(request());
        const columns = cols.map((item) => {
            return item.name;
        })
        if(allowedColumns.every(i => columns.includes(i))){
            cuentaService.importar({columns,data})
            .then(
                response => {
                    if(response.status){
                        dispatch(success());
                        dispatch(alertActions.success(response.message))
                    }
                    else{
                        cols.push({name: 'ERROR', key: cols.length}) 
                        let result = {cols, data: response.data.errores};
                        dispatch(failure(result));
                        dispatch(alertActions.error(response.message));
                    } 
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
        } else {
            dispatch(failure("Las columnas del archivo no corresponden con la acción especificada."));
            dispatch(alertActions.error("Las columnas del archivo no corresponden con la acción especificada"));
        }
    };

    function request() { 
        return { type: cuentasConstants.IMPORT_REQUEST } 
    }

    function success() { 
        return { type: cuentasConstants.IMPORT_SUCCESS } 
    }

    function failure(result) { 
        return { type: cuentasConstants.IMPORT_FAILURE, result } 
    }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        cuentaService.getAll()
            .then(
                response => dispatch(success(response.data)),
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: cuentasConstants.GETALL_REQUEST } }
    function success({cuentas}) { return { type: cuentasConstants.GETALL_SUCCESS, cuentas } }
    function failure(error) { return { type: cuentasConstants.GETALL_FAILURE, error } }
}

function getCuentaAgenteAll(idAgente) {
    return dispatch => {
        dispatch(request());

        cuentaService.getAgenteCuenta(idAgente)
            .then(
                response => dispatch(success(response.data)),
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: cuentasConstants.GETAGENTECUENTA_REQUEST } }
    function success({cuentas}) { return { type: cuentasConstants.GETAGENTECUENTA_SUCCESS, cuentas } }
    function failure(error) { return { type: cuentasConstants.GETAGENTECUENTA_FAILURE, error } }
}
/*

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
} */