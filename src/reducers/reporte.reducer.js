import { reportesConstants } from '../modules/Reportes'

export function reporte(state = {}, action) {
    switch (action.type) {
        case reportesConstants.GET_LISTFACTNOAUT_REQUEST:
            return {
                requesting: true,
            }
        case reportesConstants.GET_LISTFACTNOAUT_SUCCESS:
            return {
                requesting: false,
                reporte: action.reporte
            }

        case reportesConstants.GET_LISTFACTNOAUT_FAILURE:
            return {
                requesting: false,
                error: action.error
            }
        case reportesConstants.GET_LISTFACTOPI_REQUEST:
            return {
                requesting: true,
            }
        case reportesConstants.GET_LISTFACTOPI_SUCCESS:
            return {
                requesting: false,
                reporte: action.reporte
            }
        case reportesConstants.GET_LISTFACTOPI_FAILURE:
            return {
                requesting: false,
                error: action.error
            }

        case reportesConstants.GET_AGENTESR_REQUEST:
            return {
                ...state,
                requsting: true
            }
        case reportesConstants.GET_AGENTESR_SUCCESS:
            return {
                ...state,
                requesting: false,
                agentes: action.agentes
            }
        case reportesConstants.GET_AGENTESR_FAILURE:
            return {}
        default:
            return {}
    }
}
