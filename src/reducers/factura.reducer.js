import { facturaConstants } from '../modules/Factura';

export function factura(state = {}, action) {
  switch (action.type) {
    case facturaConstants.IMPORT_REQUEST:
    case facturaConstants.GETALL_REQUEST:
      return {
        requesting: true,
      };
    case facturaConstants.IMPORT_SUCCESS:
      return {
        requesting : false,
        columns: action.result.cols,
        data: action.result.data
      };

    case facturaConstants.IMPORT_FAILURE:
      return {
        columns: action.result.cols,
        data: action.result.data
      };
    case facturaConstants.GETALL_SUCCESS:
      return {
        facturas: action.data.facturas,
        agente: action.data.agente,
        requesting: false
      };
    case facturaConstants.GETALL_FAILURE:
      return {
        requesting: false
      };
    case facturaConstants.CREATE_REQUEST:
      return {
        ...state,
        creating : true
      }
    case facturaConstants.CREATE_SUCCESS:
    case facturaConstants.CREATE_FAILURE:
      return {
        agente: state.agente,
        response : action.response,
        created: true
      };

    case facturaConstants.SHOW_DATA:
      return{
        requesting: false,
        cols: action.table.cols,
        data: action.table.data,
      };

    case facturaConstants.MASSIVE_CREATE_REQUEST:
      return{
        requesting: true,
        cols: action.table.cols,
        data: action.table.data
      };

    case facturaConstants.MASSIVE_CREATE_SUCCESS:
    case facturaConstants.MASSIVE_CREATE_FAILURE:
      return{
        ...state,
        requesting: false,
        status: action.response.status,
        response: action.response,
      };

    case facturaConstants.MASSIVE_CLEAR:
      return{};

      case facturaConstants.XML_FACTURACREATE_REQUEST:
      return { requesting: true }
    case facturaConstants.XML_FACTURACREATE_SUCCESS:
      return {
        requesting: false,
        strings: action.facturas,
        message: action.response
      }

    case facturaConstants.XML_FACTURASSHOW:
      return {
        requesting: true,
        xmls: action.files
      }
    case facturaConstants.XML_FACTURACREATE_REQUEST:
      return{
        requesting: true,
        strings: action.strings
      }
    case facturaConstants.XML_FACTURASHOW_SUCCESS:
      return {
        requesting: false,
        strings: action.strings
      }

    case facturaConstants.XML_FACTURASHOW_CLEAR:
      return{
        requesting: false,
        strings: null
      }

    /*  return {
        ...state,
        error : action.error,
        creating: false
      };*/
    default:
      return {}
  }
}
