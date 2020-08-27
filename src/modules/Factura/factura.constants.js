export const facturaConstants = {
    IMPORT_REQUEST : 'ImportFactura_Request',
    IMPORT_SUCCESS : 'ImportFactura_Success',
    IMPORT_FAILURE : 'ImportFactura_Failure',

    GETALL_REQUEST : 'GetFactura_Request',
    GETALL_SUCCESS : 'GetFactura_Success',
    GETALL_FAILURE : 'GetFactura_Failure',

    CREATE_REQUEST : 'Create_Request',
    CREATE_SUCCESS : 'Create_Success',
    CREATE_FAILURE : 'Create_Failure',

    SHOW_DATA: 'Show_MassiveImportData',
    MASSIVE_CREATE_REQUEST: 'Massive_Create_Request',
    MASSIVE_CREATE_SUCCESS: 'Massive_Create_Success',
    MASSIVE_CREATE_FAILURE: 'Massive_Create_Failure',
    MASSIVE_CLEAR: 'Massive_Clear',

    XML_FACTURACREATE_REQUEST: 'LoadFacturaXML_Request',
    XML_FACTURACREATE_SUCCESS: 'LoadFacturaXML_Success',
    XML_FACTURACREATE_FAILURE: 'LoadFacturaXML_Failure',
    XML_FACTURASSHOW: 'ShowFacturaXML',
    XML_FACTURASHOW_REQUEST: 'ShowFacturaXML_Request',
    XML_FACTURASHOW_SUCCESS: 'ShowFacturaXML_Success',
    XML_FACTURASHOW_CLEAR: 'ShowFacturaXML_Clear',

};

export const allowedColumns = [
    'Serie' ,
    'Folio',
    'UUID',
    'RFC Receptor',
    'Total',
    'Metodo de Pago',
    'Moneda',
    'Fecha'
]

export const colsParaMostrar = [
  'Receptor',
  'Cantidad',
  'Descripcion',
  'ValorUnit',
  'FormaDePago',
  'MetodoDePago',
];

export const colsParaFacturas = [
  'Receptor',
  'UsoCfdi',
	'Cantidad',
	'ValorUnit',
	'ClaveUnidad',
	'Descripcion',
	'ClaveProdServ',
	'FormaDePago',
  'MetodoDePago',
  'Cuenta',
  'Correo_1',
  'Correo_2',
  'Correo_3',
  'Correo_4',
];

export const formasDePago = [
  {

    key: '01',
    text: 'Efectivo',
    value: 'efectivo',
  },
  {

    key: '02',
    text: 'Cheque nominativo',
    value: 'cheque',
  },
  {

    key: '03',
    text: 'Transferencia electrónica de fondos',
    value: 'transferencia',
  },
  {

    key: '04',
    text: 'Tarjeta de crédito',
    value: 'tarjeta_credito',
  },
];

export var he = require('he');
export var parser = require('fast-xml-parser');

export const options = {
  attributeNamePrefix : "",
  textNodeName : "",
  ignoreAttributes : "",
  ignoreNameSpace : "",
  allowBooleanAttributes : false,
  parseNodeValue : true,
  parseAttributeValue : false,
  trimValues: true,
  cdataPositionChar: "",
  localeRange: "", //To support non english character in tag/attribute values.
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
  tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ["parse-me-as-string"]
}

export const facturaImportar = '/factura/importar'
export const getFacturas = '/factura/listar'
export const facturaComplemento = '/factura/complemento'
export const facturaMasiva = '/factura/crear-facturas'
export const xmlCargarfacturas = '/factura/importar-xml'
