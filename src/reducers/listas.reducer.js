import { listasConstants } from '../modules/Listas'

export function listas(state = {}, action) {
  switch (action.type) {
    case listasConstants.GET_LIST_REQUEST:
      return {
        ...state,
        requesting: true,
      }
    case listasConstants.GET_LIST_SUCCESS:
      return {
        ...state,
        requesting: false,
        facturas: action.facturas
      }
    case listasConstants.GET_AGENTES_REQUEST:
      return {
        ...state,
        requsting: true
      }
    case listasConstants.GET_AGENTES_SUCCESS:
      return {
        ...state,
        requesting: false,
        agentes: action.agentes
      }

    case listasConstants.GET_CONCEPTO_REQUEST:
      return {
        ...state,
        cargandoConceptos: true
      }
    case listasConstants.GET_CONCEPTO_SUCCESS:
      return {
        ...state,
        conceptos: action.conceptos,
        cargandoConceptos: false
      }
    case listasConstants.GET_CONCEPTO_FAILURE:
      return {
        ...state,
        cargandoConceptos: false
      }
    case listasConstants.STATUS_REQUEST:
      return {
        ...state,
        steps: ['', '', 'active']
      }

    case listasConstants.STATUS_SUCCESS:
      return {
        ...state,
        steps: ['', '', 'active']
      }

    case listasConstants.STATUS_FAILURE:
      return {
        ...state,
        steps: ['', '', 'active']
      }
    case listasConstants.GET_AGENTES_FAILURE:
    case listasConstants.GET_LIST_FAILURE:
      return {}
    default:
      return {}
  }
}
