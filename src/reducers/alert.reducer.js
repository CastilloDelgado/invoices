import { alertConstants } from '../modules/Alert';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        ...state,
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        ...state,
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.INFO:
      return {
        ...state,
        type: 'alert-warning',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {
        ...state
      };
    default:
      return {}
  }
}