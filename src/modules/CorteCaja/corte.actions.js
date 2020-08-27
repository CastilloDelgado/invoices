import { corteConstants, corteService } from '.';
import { alertActions } from '../Alert';
import { sheetActions } from '../ExcelSheets';
import { history } from '../../helpers'
import { empresasActions } from '../Empresas';

export const corteActions = {
    getAll,
    crearCorte,
    getCorteAll,
    crearPoliza,
    filtering,
    filteringCorte
};
function getAll(idEmpresa) {
    return dispatch => {
        dispatch(request());

        corteService.getAll(idEmpresa)
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

    function request() { return { type: corteConstants.GETFACTURA_REQUEST } }
    function success(data) { return { type: corteConstants.GETFACTURA_SUCCESS, data } }
    function failure(error) { return { type: corteConstants.GETFACTURA_FAILURE, error } }
}

function crearCorte(data) {
    return dispatch => {
        dispatch(request());
        const { listItems, sumaTotales, idCompany, banco, montotarjeta, fechaCorte, montoamex } = data;
        let CorteCaja = {
            id_empresa: idCompany,
            total_corte: sumaTotales,
            total_tarjeta: montotarjeta,
            total_amex: montoamex,
            fechaCorte: fechaCorte,
            banco: banco
        }
        let requestBody = {
            CorteCaja,
            facturas: listItems
        }
        corteService.crearCorteCaja(requestBody)
            .then(
                response => {
                    if (response.status) {
                        dispatch(success(response));
                    } else {
                        dispatch(failure(response))
                    }
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: corteConstants.CREATECORTE_REQUEST } }
    function success(response) { return { type: corteConstants.CREATECORTE_SUCCESS, response } }
    function failure(response) { return { type: corteConstants.CREATECORTE_FAILURE, response } }
}

function crearPoliza(data) {
    return dispatch => {
        dispatch(request());
        const { idempresa, idcorte, fechaPoliza, tipodeposito, nombre, extension } = data;
        let corteCaja = {
            id_empresa: idempresa,
            id_corte: idcorte,
            tipo_pago: tipodeposito
        }
        let requestBody = {
            corteCaja,
            fechapoliza: fechaPoliza
        }
        corteService.crearPoliza(requestBody)
            .then(
                response => {
                    if (response.status) {
                        let idCompany = JSON.parse(localStorage.getItem("company")).id;
                        dispatch(success(response.data.CSV));
                        dispatch(sheetActions.exportFile(nombre, response.data.CSV, extension, () => getCorteAll(idCompany)));
                    } else {
                        dispatch(failure(response))
                    }
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: corteConstants.CREATEPOLIZA_REQUEST } }
    function success(csv) { return { type: corteConstants.CREATEPOLIZA_SUCCESS, csv } }
    function failure(response) { return { type: corteConstants.CREATEPOLIZA_FAILURE, response } }
}

function getCorteAll(idUsuario) {
    return dispatch => {
        dispatch(request());

        corteService.getAllCortes(idUsuario)
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

    function request() { return { type: corteConstants.GETLISTCORTE_REQUEST } }
    function success(data) { return { type: corteConstants.GETLISTCORTE_SUCCESS, data } }
    function failure(error) { return { type: corteConstants.GETLISTCORTE_FAILURE, error } }
}


function filtering(fecha) {
    return dispatch => {
        if (typeof (fecha) === 'undefined')
            dispatch(filterClear());
        else
            dispatch(filter(fecha));

    };

    function filter(fecha) { return { type: corteConstants.FILTER_FACTURAS, fecha } }
    function filterClear() { return { type: corteConstants.FILTER_FACTURAS_CLEAR } }
}

function filteringCorte(filtro) {
    return dispatch => {
        if (typeof (filtro) === 'undefined')
            dispatch(filterClear());
        else
            dispatch(filterCorte(filtro));

    };

    function filterCorte(filtro) { return { type: corteConstants.FILTER_CORTES, filtro } }
    function filterClear() { return { type: corteConstants.FILTER_CORTES_CLEAR } }
}



