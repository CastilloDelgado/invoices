import { alertActions } from '../Alert'
import { listasConstants, listasService } from '.'
import { exportarCWConstants, exportarCWService } from '../CargoWise/ExportarCW'

export const listasActions = {
  getList,
  getAgentes,
  getListaConceptos,
  updateInvoiceStatus
}

function getAgentes() {
  return dispatch => {
    dispatch(request());

    listasService.getAgentes()
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

  function request() { return { type: listasConstants.GET_AGENTES_REQUEST } }
  function success(agentes) { return { type: listasConstants.GET_AGENTES_SUCCESS, agentes } }
  function failure() { return { type: listasConstants.GET_AGENTES_FAILURE } }
}

function getList(filtro, idUsuario) {
  return dispatch => {
    dispatch(request())
    listasService.getListaFacturas(filtro, idUsuario)
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

  function request() { return { type: listasConstants.GET_LIST_REQUEST } }
  function success({ facturas }) { return { type: listasConstants.GET_LIST_SUCCESS, facturas } }
  function failure(error) { return { type: listasConstants.GET_LIST_FAILURE, error } }
}


function getListaConceptos(selectedFactura) {
  return dispatch => {
    dispatch(request())
    listasService.getListaConceptos(selectedFactura)
      .then(
        response => {
          if (response.status) {
            //dispatch(alertActions.success(response.message))
            dispatch(success(response.data))
          } else {

          }

        },
        error => {
          dispatch(failure(error.toString()))
        }
      )
  }
  function request() { return { type: listasConstants.GET_CONCEPTO_REQUEST } }
  function success(conceptos) { return { type: listasConstants.GET_CONCEPTO_SUCCESS, conceptos } }
  function failure(error) { return { type: listasConstants.GET_CONCEPTO_FAILURE, error } }
}

function updateInvoiceStatus(invoices, filtro, cedi) {
  return dispatch => {

    dispatch(request)
    exportarCWService.updateInvoiceStatusFactura(invoices)
      .then(
        response => {
          dispatch(success(response.data))
          dispatch(alertActions.success(response.message))
          dispatch(this.getList(filtro, cedi));
        },
        error => {
          dispatch(failure(error.toStringo))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }

  function request() { return { type: listasConstants.STATUS_REQUEST } }
  function success() { return { type: listasConstants.STATUS_SUCCESS } }
  function failure() { return { type: listasConstants.STATUS_FAILURE } }
}
