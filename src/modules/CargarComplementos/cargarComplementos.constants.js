export const complementosConstants = {
  FILE_SHOW_REQUEST: 'File_Show_Request',
  FILE_SHOW_SUCCESS: 'File_Show_Success',
  FILE_SHOW_FAIL: 'File_Show_Fail',
  FILE_SHOW_CLEAR: 'File_Show_Clear',

  FILE_VALIDATE_REQUEST: 'File_Validate_Request',
  FILE_VALIDATE_SUCCESS: 'File_Validate_Success',
  FILE_VALIDATE_FAIL: 'File_Validate_Fail',

  FILE_POST_REQUEST: 'File_Post_Request',
  FILE_POST_SUCCESS: 'File_Post_Success',
  FILE_POST_FAIL: 'File_Post_Fail'
}

export const cargarComplementos = '/proveedor/importar-comp'
export var parser = require('fast-xml-parser')
export var he = require('he')
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
export const columns = ["Serie", "Folio", "UUID", "Total", "Metodo de Pago", "Moneda", "Fecha"];
