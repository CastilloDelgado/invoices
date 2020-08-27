import { agentesConstants, allowedColumns, agentesService } from './';
import { alertActions } from '../Alert';

export const agentesActions = {
    createImport,
    getAll,
    filtering
};

function createImport(table) {
    return dispatch => {
        const { cols, data } = table;
        dispatch(request());
        const columns = cols.map((item) => {
            return item.name;
        })
        if(allowedColumns.every(i => columns.includes(i))){
            agentesService.importar({columns,data})
            .then(
                response => {
                    if(response.status){
                        dispatch(success());
                        dispatch(alertActions.success(response.message))
                    }
                    else{
                        cols.push({name: 'ERROR', key: cols.length})
                        let result = {cols, data: response.data.errores}
                        dispatch(failure(result));
                        dispatch(alertActions.error(response.message))
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
        return { type: agentesConstants.IMPORT_REQUEST } 
    }

    function success() { 
        return { type: agentesConstants.IMPORT_SUCCESS } 
    }

    function failure(result) { 
        return { type: agentesConstants.IMPORT_FAILURE, result } 
    }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        agentesService.getAll()
            .then(
                response => {
                    dispatch(success(response.data))
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: agentesConstants.GETALL_REQUEST } }
    function success({agentes}) { return { type: agentesConstants.GETALL_SUCCESS, agentes } }
    function failure(error) { return { type: agentesConstants.GETALL_FAILURE, error } }
}

function filtering(search) {
    return dispatch => {
        dispatch(filter(search));

    };

    function filter(search) { return { type: agentesConstants.FILTER, search } }
}

/* 

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
} */