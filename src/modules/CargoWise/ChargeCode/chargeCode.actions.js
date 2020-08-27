import { alertActions } from '../../Alert'
import { chargeCodeConstants, chargeCodeService } from '.'
import { exportarCWActions } from '../'

export const chargeCodeActions = {
  cargarChargeCode,
  actualizarChargeCode,
  actualizarConceptoJob,
  listarConceptosPendientes,
  listarConceptosCapturados,
  listarFacturasJobs,
  listarConceptosJobs,
  actualizarJobs
}

function cargarChargeCode(listaConceptos, filtro, idUsuario) {
  return dispatch => {
    dispatch(request())
    if (listaConceptos) {
      chargeCodeService.actualizarChargeCode(listaConceptos)
        .then(
          response => {
            dispatch(success(response.data))
            dispatch(alertActions.success(response.message))
            //dispatch(exportarCWActions.getAgentes())
            dispatch(listarConceptosPendientes(filtro, idUsuario))
          },
          error => {
            dispatch(failure(error.toString()))
            dispatch(alertActions.error(error.toString()))
          }
        )
    }
  }

  function request() { return { type: chargeCodeConstants.CODE_LOAD_REQUEST } }
  function success(response) { return { type: chargeCodeConstants.CODE_LOAD_SUCCESS, response } }
  function failure() { return { type: chargeCodeConstants.CODE_LOAD_FAILURE } }
}


function actualizarChargeCode(listaConceptos, filtro, idUsuario) {
  return dispatch => {
    dispatch(request())
    if (listaConceptos) {
      chargeCodeService.actualizarChargeCode(listaConceptos)
        .then(
          response => {
            dispatch(success(response.data))
            dispatch(alertActions.success(response.message))
            dispatch(exportarCWActions.getAgentes())
            dispatch(listarConceptosCapturados(filtro, idUsuario))
          },
          error => {
            dispatch(failure(error.toString()))
            dispatch(alertActions.error(error.toString()))
          }
        )
    }
  }
  function request() { return { type: chargeCodeConstants.CODE_LOAD_REQUEST } }
  function success(response) { return { type: chargeCodeConstants.CODE_LOAD_SUCCESS, response } }
  function failure() { return { type: chargeCodeConstants.CODE_LOAD_FAILURE } }
}

function actualizarConceptoJob(listaConceptos, listafacturas, filtro, idUsuario) {
  return dispatch => {
    dispatch(request())
    if (listaConceptos) {
      chargeCodeService.actualizarConceptoJob(listaConceptos, listafacturas)
        .then(
          response => {
            dispatch(success(response.data))
            dispatch(alertActions.success(response.message))
            dispatch(exportarCWActions.getAgentes())
            dispatch(listarConceptosJobs(filtro, idUsuario))
          },
          error => {
            dispatch(failure(error.toString()))
            dispatch(alertActions.error(error.toString()))
          }
        )
    }
  }
  function request() { return { type: chargeCodeConstants.CODE_LOAD_REQUEST } }
  function success(response) { return { type: chargeCodeConstants.CODE_LOAD_SUCCESS, response } }
  function failure() { return { type: chargeCodeConstants.CODE_LOAD_FAILURE } }
}


function listarConceptosPendientes(filtro, idUsuario) {
  return dispatch => {
    dispatch(request())
    chargeCodeService.listarConPen(filtro, idUsuario)
      .then(
        response => {
          dispatch(success(response.data))
          //dispatch(alertActions.success(response.message))
        },
        error => {
          dispatch(failure(error.toString()))
          //dispatch(alertActions.error(error.toString()))
        }
      )
  }

  function request() { return { type: chargeCodeConstants.GET_CONCEPTOS_PENDIENTES_REQUEST } }
  function success(response) { return { type: chargeCodeConstants.GET_CONCEPTOS_PENDIENTES_SUCCESS, response } }
  function failure() { return { type: chargeCodeConstants.GET_CONCEPTOS_PENDIENTES_FAILURE } }
}

function listarConceptosCapturados(filtro, idUsuario) {
  return dispatch => {
    dispatch(request())
    chargeCodeService.listarConCap(filtro, idUsuario)
      .then(
        response => {
          dispatch(success(response.data))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      )
  }
  function request() { return { type: chargeCodeConstants.GET_CONCEPTOS_CAPTURADOS_REQUEST } }
  function success(response) { return { type: chargeCodeConstants.GET_CONCEPTOS_CAPTURADOS_SUCCESS, response } }
  function failure() { return { type: chargeCodeConstants.GET_CONCEPTOS_CAPTURADOS_FAILURE } }
}

function listarConceptosJobs(filtro, idUsuario) {
  return dispatch => {
    dispatch(request())
    chargeCodeService.listarConJob(filtro, idUsuario)
      .then(
        response => {
          dispatch(success(response.data))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      )
  }
  function request() { return { type: chargeCodeConstants.GET_CONCEPTOS_JOBS_REQUEST } }
  function success(response) { return { type: chargeCodeConstants.GET_CONCEPTOS_JOBS_SUCCESS, response } }
  function failure() { return { type: chargeCodeConstants.GET_CONCEPTOS_JOBS_FAILURE } }
}

function listarFacturasJobs(filtro, idUsuario) {
  return dispatch => {
    dispatch(request())
    chargeCodeService.listarFactJobs(filtro, idUsuario)
      .then(
        response => {
          dispatch(success(response.data))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      )
  }

  function request() { return { type: chargeCodeConstants.GET_FACTURAS_JOBS_REQUEST } }
  function success(response) { return { type: chargeCodeConstants.GET_FACTURAS_JOBS_SUCCESS, response } }
  function failure() { return { type: chargeCodeConstants.GET_FACTURAS_JOBS_FAILURE } }

}

function actualizarJobs(body, filtro, idUsuario) {
  return dispatch => {
    dispatch(request())
    chargeCodeService.actualizarFactJobs(body)
      .then(
        response => {
          dispatch(success(response.date))
          dispatch(alertActions.success(response.message))
          dispatch(listarFacturasJobs(filtro, idUsuario))
        },
        error => {
          dispatch(failure(error.toString()))
        }
      )
  }

  function request() { return { type: chargeCodeConstants.UPDATE_FACTURAS_JOBS_REQUEST } }
  function success(response) { return { type: chargeCodeConstants.UPDATE_FACTURAS_JOBS_SUCCESS, response } }
  function failure() { return { type: chargeCodeConstants.UPDATE_FACTURAS_JOBS_FAILURE } }
}