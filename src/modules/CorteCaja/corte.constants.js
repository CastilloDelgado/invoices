import { constants } from "fs";

export const corteConstants = {
  GETFACTURA_REQUEST: 'GetFacturaCorte_Request',
  GETFACTURA_SUCCESS: 'GetFacturaCorte_Success',
  GETFACTURA_FAILURE: 'GetFacturaCorte_Failure',

  CREATECORTE_REQUEST: 'CreateCorte_Request',
  CREATECORTE_SUCCESS: 'CreateCorte_Success',
  CREATECORTE_FAILURE: 'CreateCorte_Failure',

  GETLISTCORTE_REQUEST: 'Getlistcorte_Request',
  GETLISTCORTE_SUCCESS: 'Getlistcorte_Success',
  GETLISTCORTE_FAILURE: 'Getlistcorte_Failure',

  CREATEPOLIZA_REQUEST: 'CreatePoliza_Request',
  CREATEPOLIZA_SUCCESS: 'CreatePoliza_Success',
  CREATEPOLIZA_FAILURE: 'CreatePoliza_Failure',

  FILTER_FACTURAS: 'FilterFacturas',
  FILTER_FACTURAS_CLEAR: 'FilterFacturasClear',
  FILTER_CORTES_CLEAR: 'FilterCortesClear',
  FILTER_CORTES: 'Filtercortes',

};

export const formatDate = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false,
  timeZone: 'America/Los_Angeles'
};

export const getFacturasCorte = '/corte/listar'
export const CreateCorteCaja = '/corte/crear-corte'
export const getListarCortes = '/corte/listar-corte'
export const createPoliza = '/corte/crear-poliza'