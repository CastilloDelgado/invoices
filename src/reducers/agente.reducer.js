import { agentesConstants } from '../modules/Agente';

export function agente(state = {}, action) {
  switch (action.type) {
    case agentesConstants.IMPORT_REQUEST:
    case agentesConstants.GETALL_REQUEST:
      return { 
        requesting: true,
      };
    case agentesConstants.IMPORT_SUCCESS:
      return {
        requesting : false,
      };
    case agentesConstants.IMPORT_FAILURE:
      return {
        columns: action.result.cols,
        data: action.result.data
      };
    case agentesConstants.GETALL_SUCCESS:
      return {
        all_agentes: action.agentes,
        agentes: action.agentes,
        requesting: false
      };
    case agentesConstants.GETALL_FAILURE:
      return {
        requesting: false
      };
    case agentesConstants.FILTER :
      return {
        ...state,
        agentes: state.all_agentes.filter(agente => {
          return agente.nombre.toLowerCase().indexOf(action.search.toLowerCase())>=0 
                  || agente.rfc.toLowerCase().indexOf(action.search.toLowerCase())>=0
        })
      };
    default:
      return {}
  }
}