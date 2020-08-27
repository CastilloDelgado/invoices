import { complementosConstants } from '../modules/CargarComplementos'

export function cargarComplementos(state = {}, action){
  switch(action.type){
    case complementosConstants.FILE_SHOW_REQUEST:
      return {
        requesting: true,
        complementos: action.files
      }
    case complementosConstants.FILE_SHOW_SUCCESS:
      return {
        requesting: false,
        complementos: action.complementos
      }
    case complementosConstants.FILE_SHOW_FAIL:
      return {
        requesting: false
      }
    case complementosConstants.FILE_SHOW_CLEAR:
      return {
        requesting: false,
        complementos: null
      }
    case complementosConstants.FILE_VALIDATE_REQUEST:
      return {
        requesting: true
      }
    case complementosConstants.FILE_VALIDATE_SUCCESS:
      return {
        requesting: false
      }
    case complementosConstants.FILE_VALIDATE_FAIL:
      return {
        requesting: false
      }
    case complementosConstants.FILE_POST_REQUEST:
      return {
        requesting: true
      }
    case complementosConstants.FILE_POST_SUCCESS:
      return {
        requesting: false,
        complementos: action.complementos,
        message: action.response
      }
    case complementosConstants.FILE_POST_FAIL:
      return {
        requesting: false
      }
    default:
      return {}
  }
}
