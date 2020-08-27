import { convertToJson } from 'fast-xml-parser';

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
  XML_CEDI_LOAD: 'Xml_Cedi_Load'
}

export const cediOptions = [
  {key:'TJN', value:'TJN', text:'TJN'},
  {key:'PUE', value:'PUE', text:'PUE'},
  {key:'MTY', value:'MTY', text:'MTY'},
  {key:'MX5', value:'MX5', text:'MX5'},
  {key:'MXX', value:'MXX', text:'MXX'},
  {key:'LRD', value:'LRD', text:'LRD'},
  {key:'IRP', value:'IRP', text:'IRP'},
  {key:'GDL', value:'GDL', text:'GDL'},
  {key:'CUU', value:'CUU', text:'CUU'},
  {key:'CUN', value:'CUN', text:'CUN'},
  {key:'CJS', value:'CJS', text:'CJS'},
  {key:'MPT', value:'MPT', text:'MPT'},
  {key:'JAP', value:'JAP', text:'JAP'},
  {key:'001', value:'001', text:'001'}
]

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
