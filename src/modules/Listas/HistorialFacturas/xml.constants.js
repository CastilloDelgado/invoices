export const xmlConstants = {
  XML_LOAD_REQUEST: 'LoadXML_Request',
  XML_LOAD_SUCCESS: 'LoadXML_Success',
  XML_LOAD_FAILURE: 'LoadXML_Failure',
  XML_VALIDATE_REQUEST: 'ValidateXML_Request',
  XML_VALIDATE_SUCCESS: 'ValidateXML_Success',
  XML_VALIDATE_FAILURE: 'ValidateXML_Failure',
  XML_SHOW: 'ShowXML',
  XML_SHOW_REQUEST: 'ShowXML_Request',
  XML_SHOW_SUCCESS: 'ShowXML_Success',
  XML_SHOW_CLEAR: 'ShowXML_Clear',
  XML_JOB_LOAD: 'Xml_Job_Load',
}

export const xmlCargar = '/proveedor/importar-fact2'

export var parser = require('fast-xml-parser');
export var he = require('he');

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

export var columns = ["Conceptos","Job", "Serie", "Folio", "UUID", "Total", "Metodo de Pago", "Moneda", "Fecha", "Traslado", "Retencion"]
