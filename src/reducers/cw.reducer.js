import { exportarCWConstants, chargeCodeConstants, mountCaptureConstants } from '../modules/CargoWise'

export function cw(state = {}, action) {
  switch (action.type) {
    case exportarCWConstants.GET_AGENTES_REQUEST:
      return {
        ...state,
        steps: ['active', '', ''],
        loading: "loading"
      }
    case exportarCWConstants.GET_AGENTES_SUCCESS:
      return {
        ...state,
        steps: ['active', '', ''],
        loading: "",
        agentes: action.agentes
      }
    case exportarCWConstants.GET_AGENTES_FAILURE:
      return {
        ...state,
        steps: ['active', '', ''],
      }
    case exportarCWConstants.CREATE_CSV_REQUEST:
      return {
        steps: ['', 'active', ''],
        loading: "loading",
      }
    case exportarCWConstants.CREATE_CSV_SUCCESS:
      return {
        steps: ['', 'active', ''],
        facturasCSV: action.facturasCSV
      }
    case exportarCWConstants.CREATE_CSV_FAIULRE:
      return {
        steps: ['', 'active', ''],
      }
    case exportarCWConstants.CHANGE_STEP_1:
      return {
        steps: ['active', '', '']
      }
    case exportarCWConstants.CHANGE_STEP_2:
      return {
        ...state,
        steps: ['', 'active', '']
      }
    case exportarCWConstants.CHANGE_STEP_3:
      return {
        ...state,
        steps: ['', '', 'active']
      }
    case chargeCodeConstants.CODE_LOAD_REQUEST:
      return {
        ...state,
        cargarCode: "loading",
        eraseList: true,
        conceptos: null
      }
    case chargeCodeConstants.CODE_LOAD_SUCCESS:
      return {
        ...state,
        cargarCode: "",
        eraseLista: false,
        conceptos: null
      }
    case chargeCodeConstants.CODE_LOAD_FAILURE:
      return {
        ...state,
        cargarCode: "",
      }
    case chargeCodeConstants.GET_CONCEPTOS_PENDIENTES_REQUEST:
      return {
        cargandoConceptos: true
      }
    case chargeCodeConstants.GET_CONCEPTOS_PENDIENTES_SUCCESS:
      return {
        cargandoConceptos: false,
        conceptosPendientes: action.response
      }
    case chargeCodeConstants.GET_CONCEPTOS_PENDIENTES_FAILURE:
      return {
        cargandoConceptos: false,
      }
    case chargeCodeConstants.GET_CONCEPTOS_CAPTURADOS_REQUEST:
      return {
        cargandoConceptos: true
      }
    case chargeCodeConstants.GET_CONCEPTOS_CAPTURADOS_SUCCESS:
      return {
        cargandoConceptos: false,
        conceptosCapturados: action.response
      }
    case chargeCodeConstants.GET_CONCEPTOS_CAPTURADOS_FAILURE:
      return {
        cargandoConceptos: false,
      }

    case chargeCodeConstants.GET_CONCEPTOS_JOBS_REQUEST:
      return {
        cargandoConceptos: true
      }
    case chargeCodeConstants.GET_CONCEPTOS_JOBS_SUCCESS:
      return {
        cargandoConceptos: false,
        conceptosCapturados: action.response
      }
    case chargeCodeConstants.GET_CONCEPTOS_JOBS_FAILURE:
      return {
        cargandoConceptos: false,
      }

    case mountCaptureConstants.GET_MOUNTS_REQUEST:
      return {
        loading: true
      }
    case mountCaptureConstants.GET_MOUNTS_SUCCESS:
      return {
        loading: false,
        mountsList: action.response
      }
    case mountCaptureConstants.GET_MOUNTS_FAILURE:
      return {
        loading: false
      }
    case mountCaptureConstants.POST_MOUNTS_REQUEST:
      return {
        loading: true
      }
    case mountCaptureConstants.POST_MOUNTS_SUCCESS:
      return {
        update: true
      }
    case mountCaptureConstants.POST_MOUNTS_FAILURE:
      return {

      }
    case chargeCodeConstants.GET_FACTURAS_JOBS_REQUEST:
      return {
        loading: true
      }
    case chargeCodeConstants.GET_FACTURAS_JOBS_SUCCESS:
      return {
        facturas: action.response,
        success: true
      }
    case chargeCodeConstants.GET_FACTURAS_JOBS_FAILURE:
      return {

      }
      case exportarCWConstants.UPDATE_STATUS_REQUEST:
        return {
          ...state,
          steps: ['','','active']
        }
      
      case exportarCWConstants.UPDATE_STATUS_SUCCESS:
        return {
          ...state,
          steps: ['','','active']
        }
      
      case exportarCWConstants.UPDATE_STATUS_FAILURE:
        return {
          ...state,
          steps: ['','','active']
        }
      
    default:
      return {}
  }
}
