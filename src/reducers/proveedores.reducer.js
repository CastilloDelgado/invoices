import { xmlConstants } from '../modules/CargarFacturas';

export function proveedores(state = {}, action){
  switch(action.type){

    case xmlConstants.XML_LOAD_REQUEST:
      return { requesting: true }
    case xmlConstants.XML_LOAD_SUCCESS:
      return {
        requesting: false,
        strings: action.facturas,
        message: action.response
      }

    case xmlConstants.XML_JOB_LOAD:
      return {
        ...state,
        jobs: action.jobs
      }

    case xmlConstants.XML_CEDI_LOAD:
      return {
        ...state,
        cedi: action.cedi
      }

    case xmlConstants.XML_IMPORT_REQUEST:
      return { requesting: true }

    case xmlConstants.XML_VALIDATE_REQUEST:
      return { requesting: true }

    case xmlConstants.XML_SHOW:
      return {
        requesting: true,
        xmls: action.files
      }
    case xmlConstants.XML_SHOW_REQUEST:
      return{
        requesting: true,
        strings: action.strings
      }
    case xmlConstants.XML_SHOW_SUCCESS:
      return {
        requesting: false,
        strings: action.strings
      }

    case xmlConstants.XML_SHOW_CLEAR:
      return{
        requesting: false,
        strings: null
      }
    default:
      return {}
  }
}
