import { alertActions } from '../Alert'
import { opinionConstants, opinionService } from '.'

export const opinionActions = {
  cargarOpinion
}

function cargarOpinion(file){
  return dispatch => {
    dispatch(request())
    if(file.type === "application/pdf"){
      const base64 = file.base64.slice(28);
      let requestBody = {
        base64: base64,
        idAgente: JSON.parse(localStorage.getItem('supplier')).user.id_agente
      }
      opinionService.cargarOpinion(requestBody)
        .then(
          response => {
            if(response.status){
              dispatch(alertActions.success(response.message));
              dispatch(success(response.data));
            } else {
                dispatch(alertActions.error(response.message))
                dispatch(failure());
            }
          },
          error => {
            dispatch(alertActions.error(error.toString()))
            dispatch(failure(error.toString()));
          }
        );

    } else {
      dispatch(failure("Este no es un archivo valido"));
    }
  }

  function request(){ return{ type: opinionConstants.CARGAR_OPINION_REQUEST } }
  function success(){ return{ type: opinionConstants.CARGAR_OPINION_SUCCESS } }
  function failure(){ return{ type: opinionConstants.CARGAR_OPINION_FAILURE } }
}
