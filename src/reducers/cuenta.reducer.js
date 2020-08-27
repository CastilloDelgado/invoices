import { cuentasConstants } from '../modules/Cuenta';

export function cuenta(state = {}, action) {
  switch (action.type) {
    case cuentasConstants.IMPORT_REQUEST:
    case cuentasConstants.GETALL_REQUEST:
      return { 
        requesting: true,
      };
    case cuentasConstants.IMPORT_SUCCESS:
      return {
        requesting : false,
      };
    case cuentasConstants.IMPORT_FAILURE:
      return {
        columns: action.result.cols,
        data: action.result.data
      };
    case cuentasConstants.GETALL_SUCCESS:
        return {
          cuentas: action.cuentas,
          requesting: false
        };
    case cuentasConstants.GETALL_FAILURE:
      return {
        requesting: false
      };
    default:
      return {}
  }
}