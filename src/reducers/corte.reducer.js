import { corteConstants } from '../modules/CorteCaja';

export function corte(state = {}, action) {
  switch (action.type) {
    case corteConstants.GETFACTURA_REQUEST:
      return {
        requesting: true,
      };
    case corteConstants.GETFACTURA_SUCCESS:
      return {
        facturas_all: action.data.facturas,
        facturas: action.data.facturas,
        bancos: action.data.bancos,
        requesting: false
      };
    case corteConstants.GETFACTURA_FAILURE:
      return {
        requesting: false
      };
    case corteConstants.CREATECORTE_REQUEST:
      return {
        ...state,
        creating: true,
        requesting: true
      }
    case corteConstants.CREATECORTE_SUCCESS:
      return {
        csv: action.response.data.CSV,
        created: true
      };
    case corteConstants.CREATECORTE_FAILURE:
      return {
        error: action.response.message,
        created: true
      };
    case corteConstants.GETLISTCORTE_REQUEST:
      return {
        requesting: true,
      };
    case corteConstants.GETLISTCORTE_SUCCESS:
      return {
        cortes: action.data.cortes,
        cortes_all: action.data.cortes,
        requesting: false
      };
    case corteConstants.GETLISTCORTE_FAILURE:
      return {
        requesting: false
      };
    case corteConstants.CREATEPOLIZA_REQUEST:
      return {
        ...state,
        creating: true,
        requesting: false
      }
    case corteConstants.CREATEPOLIZA_SUCCESS:
      return {
        
        created: true
      };
    case corteConstants.CREATEPOLIZA_FAILURE:
      return {
        error: action.response.message,
        created: true
      };
    case corteConstants.FILTER_FACTURAS:
      return {
        ...state,
        facturas: state.facturas_all.filter(factura => factura.fecha === action.fecha)
      };
    case corteConstants.FILTER_FACTURAS_CLEAR:
      return {
        ...state,
        facturas: state.facturas_all
      };
    case corteConstants.FILTER_CORTES:
      return {
        ...state,
        cortes: state.cortes_all.filter(corte => {
          return (action.filtro.fechacorte !== '' &&  action.filtro.empresa !== '') ?
         (corte.fecha_creacion === action.filtro.fechacorte && corte.empresa === action.filtro.empresa):
         (corte.fecha_creacion === action.filtro.fechacorte || corte.empresa === action.filtro.empresa)
        })
      };
      case corteConstants.FILTER_CORTES_CLEAR:
      return {
        ...state,
        cortes:  state.cortes_all
      };

    default:
      return {}
  }
}
