import { configConstants } from '../modules/Config'

export function config(state = {}, action) {
  switch (action.type) {
    case configConstants.GET_REQUEST:
        return { 
            ...state,
            requesting: true,
        };
    case configConstants.GET_SUCCESS:
        return {
            ...state,
            requesting : false,
            json : action.json
        };
    case configConstants.GET_FAILURE:
        return {
            ...state,
            requesting : false,
            error : action.error
        };
    case configConstants.GETUSER_REQUEST:
        return { 
            ...state,
            requestUserConfig: true,
        };
    case configConstants.GETUSER_SUCCESS:
        return {
            ...state,
            requestUserConfig : false,
            userConfig : action.json
        };
    case configConstants.GETUSER_FAILURE:
        return {
            ...state,
            requestUserConfig : false,
            error : action.error
        };
    case configConstants.CLEARUSER_CONFIG:
        return {
            json : state.json
        }
    default:
        return {...state}
  }
}