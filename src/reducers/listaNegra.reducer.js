import { listaNegraConstants } from '../modules/ListaNegra'

export function listaNegra(state = {}, action){
  switch(action.type){
    case listaNegraConstants.SHOW_LISTA_NEGRA:
      return {
        requesting: true,
        cols: action.table.cols,
        data: action.table.data
      }

    case listaNegraConstants.VALIDAR_LISTA_NEGRA:
      return {
        requesting: true,
        status: action.status,
        errores: action.errores,
        cols: action.table.columnas,
        data: action.table.datos
      }

    case listaNegraConstants.CARGAR_LISTA_REQUEST:
      return {
        requesting: true,
        status: action.status,
        errores: action.errores,
        cols: action.table.columnas,
        data: action.table.datos,
        tablaCargada: true
      }

      case listaNegraConstants.CARGAR_LISTA_SUCCESS:
        return {
          requesting: false,
          tablaCargada: true,
          response: action.response
        }
    default:
      return {  }
  }
}
