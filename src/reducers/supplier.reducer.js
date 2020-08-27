import { supplierConstants } from '../modules/Supplier';

let user = JSON.parse(localStorage.getItem('supplier'));
const initialState = user ? { loggedIn: true, user } : {};

export function supplier(state = initialState, action) {
  switch (action.type) {
    case supplierConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case supplierConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.data
      };
    case supplierConstants.LOGIN_FAILURE:
      return {};
    case supplierConstants.LOGOUT:
      return {};

    case supplierConstants.CHANGE_PASSWORD_REQUEST:
      return {
        loading: true
      };
    case supplierConstants.CHANGE_PASSWORD_SUCCESS:
      return {

      };
    case supplierConstants.CHANGE_PASSWORD_FAILURE:
      return {

      };


    default:
      return {}
  }
}
