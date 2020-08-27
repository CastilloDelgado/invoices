export const listasConstants = {
  GET_LIST_REQUEST: 'Get_List_Request',
  GET_LIST_SUCCESS: 'Get_List_Success',
  GET_LIST_FAILURE: 'Get_List_Failure',

  GET_CONCEPTO_REQUEST: 'Get_Concepto_Request',
  GET_CONCEPTO_SUCCESS: 'Get_Concepto_Success',
  GET_CONCEPTO_FAILURE: 'Get_Concepto_Failure',

  GET_AGENTES_REQUEST: 'Get_Agentes_Request',
  GET_AGENTES_SUCCESS: 'Get_Agentes_Success',
  GET_AGENTES_FAILURE: 'Get_Agentes_Failure',

  STATUS_REQUEST : 'Status_Request',
  STATUS_SUCCESS : 'Status_Success',
  STATUS_FAILURE : 'Status_Failure',
}

export const getListaFacturasUrl = '/proveedor/listar-facturas'
export const getListaConceptosUrl = '/proveedor/listar-conceptos?idFactura='
export const getAgente = '/agente/listar'
