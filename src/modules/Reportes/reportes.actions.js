import { alertActions } from '../Alert'
import { reportesConstants, reporteService } from '.'
//import { exportarCWConstants, exportarCWService } from '../CargoWise/ExportarCW'

export const reportesActions = {
    getAgentes,
    getListFactSinaut,
    getListFactOpinion,
}

function getAgentes() {
    return dispatch => {
        dispatch(request());

        reporteService.getAgentes()
            .then(
                response => {
                    dispatch(success(response.data))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()))
                }

            );
    };

    function request() { return { type: reportesConstants.GET_AGENTESR_REQUEST } }
    function success(agentes) { return { type: reportesConstants.GET_AGENTESR_SUCCESS, agentes } }
    function failure() { return { type: reportesConstants.GET_AGENTESR_FAILURE } }
}

function getListFactSinaut(filtro) {
    return dispatch => {
        dispatch(request())
        reporteService.getListaFacturasSinAut(filtro)
            .then(
                response => {
                    if (response.status) {
                        dispatch(alertActions.success(response.message));
                        dispatch(success(response.data));
                    }
                    else {

                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );

    }

    function request() { return { type: reportesConstants.GET_LISTFACTNOAUT_REQUEST } }
    function success({ reporte }) { return { type: reportesConstants.GET_LISTFACTNOAUT_SUCCESS, reporte } }
    function failure(error) { return { type: reportesConstants.GET_LISTFACTNOAUT_FAILURE, error } }
}

function getListFactOpinion(filtro) {
    return dispatch => {
        dispatch(request())
        reporteService.getListaFacturaOpinion(filtro)
            .then(
                response => {
                    if (response.status) {
                        dispatch(alertActions.success(response.message));
                        dispatch(success(response.data));
                    }
                    else {

                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );

    }

    function request() { return { type: reportesConstants.GET_LISTFACTOPI_REQUEST } }
    function success({ reporte }) { return { type: reportesConstants.GET_LISTFACTOPI_SUCCESS, reporte } }
    function failure(error) { return { type: reportesConstants.GET_LISTFACTOPI_FAILURE, error } }
}