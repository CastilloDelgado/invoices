import { alertActions } from '../Alert';
import { configConstants, configService } from '.';

export const configActions = {
  getConfig,
  getUserConfig,
  clearUserConfig
}

function getConfig(){
    return dispatch => {
        dispatch(request());

        //Show loader at least 2 secs
        setTimeout(() => {
            configService.getConfig()
            .then(
                response => {
                    if(response.status)
                        dispatch(success(response.data.json))
                    else {
                        dispatch(failure(response.message))
                        dispatch(alertActions.error(response.message))
                    }
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            )
        }  
        , 2000)
    }

    function request() { return { type: configConstants.GET_REQUEST } }
    function success(json) { return { type: configConstants.GET_SUCCESS, json } }
    function failure(error) { return { type: configConstants.GET_FAILURE, error } }
}

function getUserConfig(idUser){

    return dispatch => {
        dispatch(request());
        configService.getUserConfig(idUser)
        .then(
            response => {
                if(response.status)
                    dispatch(success(response.data.json))
                else {
                    dispatch(failure(response.message))
                    dispatch(alertActions.error(response.message))
                }
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertActions.error(error.toString()))
            }
        )
    } 

    function request() { return { type: configConstants.GETUSER_REQUEST } }
    function success(json) { return { type: configConstants.GETUSER_SUCCESS, json } }
    function failure(error) { return { type: configConstants.GETUSER_FAILURE, error } }
}

function clearUserConfig(){
    return dispatch => {
        dispatch(clear());
    }

    function clear () { return { type: configConstants.CLEARUSER_CONFIG } }
}
