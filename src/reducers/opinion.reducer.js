import { opinionConstants } from '../modules/Opinion'

export function opinion(state={}, action){
  switch(action.type){
    case opinionConstants.CARGAR_OPINION_REQUEST:
      return {
        loading: true
      }
    case opinionConstants.CARGAR_OPINION_SUCCESS:
      return {
        loading: false,
        opinionCargada: true
      }
    default:
      return {

      }
  }
}
