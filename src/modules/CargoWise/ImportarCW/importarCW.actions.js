import { importarCWConstants, importarCWService } from './'
import { alertActions } from '../../Alert'

export const importarCWActions = {
  createImport
}

function createImport(table){
  return dispatch => {
    const { cols, data } = table
    const newCols = cols.map(x => {
      return x.name
    })
    dispatch(request())
    // Aquí debemos validar el archivo
    importarCWService.importarChargeCode({newCols, data})
      .then(
        response => {
          if(response.status){
            dispatch(success)
            dispatch(alertActions.success(response.message))
          } else{
            cols.push({name: 'Error: ', key: cols.length})
            let result = {cols, data: response.data.errores}
            dispatch(failure(result))
            dispatch(alertActions.error(response.message))
          }
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }

  function request(){ return {type: importarCWConstants.CHARGECODE_IMPORT_REQUEST } }
  function success(){ return {type: importarCWConstants.CHARGECODE_IMPORT_SUCCESS } }
  function failure(){ return {type: importarCWConstants.CHARGECODE_IMPORT_FAILURE } }
}
