import { listaNegraConstants, listaNegraService } from '.'
import { alertActions } from '../Alert'

export const listaNegraActions = {
  showListaNegra,
  validarListaNegra,
  cargarListaNegra
}

function showListaNegra(table){
  return dispatch => { dispatch(show(table)) }
  function show(table){ return {type: listaNegraConstants.SHOW_LISTA_NEGRA, table} }
}

function validarListaNegra(table){
  return dispatch => {
    let status = "enabled"
    let errores = []
    let {columnas, datos} = table
    if(columnas[0].name.toUpperCase() === "RFC" && columnas[1].name.toUpperCase() === "STATUS"){
      for(let i=0; i<datos.length; i++){
        if(typeof datos[i][0] !== "string" || (datos[i][1] !== 0 && datos[i][1] !== 1 && datos[i][1] !== 2)){
          status = "disabled"
          errores.push([i, datos[i]])
        }
      }
    }
    console.log(status)
    dispatch(validar(status, errores, {columnas, datos}))
  }

  function validar(status, errores, table){ return { type: listaNegraConstants.VALIDAR_LISTA_NEGRA, status, errores, table } }
}

function cargarListaNegra(table){
  return dispatch => {
    const {cols, data} = table
    dispatch(request(table))
    console.log(cols, data)
    let columnas = ['RFC', 'Status'];
    let requestBody = {
      columns: columnas,
      rows: data
    }

    listaNegraService.cargarListaNegra(requestBody)
      .then(
        response => {
          if(response.status){
            dispatch(success(response));
            dispatch(alertActions.success(response.message))
          } else{
            dispatch(failure(response));
          }
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )

  }

  function request(table) {return {type: listaNegraConstants.CARGAR_LISTA_REQUEST, table}}
  function success(response) {return {type: listaNegraConstants.CARGAR_LISTA_SUCCESS, response}}
  function failure(response) {return {type: listaNegraConstants.CARGAR_LISTA_FAILURE, response}}
}
