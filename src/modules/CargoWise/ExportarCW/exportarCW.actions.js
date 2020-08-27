import { alertActions } from '../../Alert'
import { exportarCWConstants, exportarCWService } from '.'

export const exportarCWActions = {
  getAgentes,
  step1,
  step2,
  step3,
  crearCSV,
  updateInvoiceStatus
}

function getAgentes(){
  return dispatch => {
    dispatch(request())
    exportarCWService.getAgentes()
      .then(
        response => {
          dispatch(success(response.data));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
  }
  function request(){ return {type: exportarCWConstants.GET_AGENTES_REQUEST } }
  function success(agentes){ return {type: exportarCWConstants.GET_AGENTES_SUCCESS, agentes } }
  function failure(){ return {type: exportarCWConstants.GET_AGENTES_FAILURE } }
}

function crearCSV(agentes, idUsuario){
  const listaAgentes = agentes.map(agente => { return agente.key})
  if(listaAgentes[0] === "Todos"){
    return dispatch => {
      dispatch(request())
      exportarCWService.getCSV("Todos", idUsuario)
        .then(
          response => {
            dispatch(success(response.data))
          },
          error => {
            dispatch(failure(error.toString()))
            dispatch(alertActions.error(error.toString()))
          }
        );
    }
  } else{
    return dispatch => {
      let cadenaAgentes = ""
      listaAgentes.forEach((agente, index) => {
        if(index > 0){
          cadenaAgentes = cadenaAgentes.concat(",")
        }
        cadenaAgentes = cadenaAgentes.concat(agente)
      });
      dispatch(request())
      exportarCWService.getCSV(cadenaAgentes, idUsuario)
        .then(
          response => {
            dispatch(success(response.data))
          },
          error => {
            dispatch(failure(error.toString()))
            dispatch(alertActions.error(error.toString()))
          }
        );
    }
  }
 
  function request(){ return {type: exportarCWConstants.CREATE_CSV_REQUEST } }
  function success(facturasCSV){ return {type: exportarCWConstants.CREATE_CSV_SUCCESS, facturasCSV} }
  function failure(){ return {type: exportarCWConstants.CREATE_CSV_FAIULRE } }
}

function step1(){
  return dispatch => { dispatch(success()) }
  function success(){return {type: exportarCWConstants.CHANGE_STEP_1} }
}

function step2(){
  return dispatch => { dispatch(success()) }
  function success(){return {type: exportarCWConstants.CHANGE_STEP_2} }
}

function step3(){
  return dispatch => { dispatch(success()) }
  function success(){return {type: exportarCWConstants.CHANGE_STEP_3} }
}

function updateInvoiceStatus(invoices){
  return dispatch => {
    dispatch(request)
    exportarCWService.updateInvoiceStatus(invoices)
      .then(
        response => {
          dispatch(success(response.data))
        },
        error => {
          dispatch(failure(error.toStringo))
          dispatch(alertActions.error(error.toString()))
        }
      )
  }

  function request(){ return { type: exportarCWConstants.UPDATE_STATUS_REQUEST } }
  function success(){ return { type: exportarCWConstants.UPDATE_STATUS_SUCCESS } }
  function failure(){ return { type: exportarCWConstants.UPDATE_STATUS_FAILURE } }
}
