import { facturaConstants, facturaService, allowedColumns, columnasNecesarias, colsParaFacturas,parser,options} from '.';
import { alertActions } from '../Alert';
import { formatDate } from '../../utils';

export const facturaActions = {
    createMassiveImport,
    createImport,
    getAll,
    crearComplemento,
    showMassiveImport,
    clearMassiveImport,
    cargarXML,
    showXML,
    clearXML
};

function showMassiveImport(table){
  return dispatch => {
    console.log("show massive import");
    dispatch(show());

  }
    function show(){ return { type: facturaConstants.SHOW_DATA, table} }
}

function createMassiveImport(table){
  return dispatch => {
    let facturas = [];
    const {cols, data, idCompany} = table;
    let complementos = [];
    let direcciones = [];
    // Ver posición de las columnas necesarias para la factura en el arreglo;
    for(let x=0; x<colsParaFacturas.length; x++){ for(let i=0; i<(cols.length); i++){ if(cols[i].name === colsParaFacturas[x]){ direcciones.push(i); } } }
    for(var i = 0; i<table.data.length; i++){
      let correos;
      correos = table.data[i].map(function(x){
        if(x){
          let y = String(x).indexOf('@');
          if(y > 0) return x;
        }
      });
      let correosFiltered = correos.filter(mail => mail);
      let datosParaFactura = {
        rfc              : table.data[i][direcciones[0]],
        uso_cfdi         : table.data[i][direcciones[1]],
        cantidad         : table.data[i][direcciones[2]],
        valor_unit       : table.data[i][direcciones[3]],
        clave_unidad     : table.data[i][direcciones[4]],
        descripcion      : table.data[i][direcciones[5]],
        clave_prod_serv  : String(table.data[i][direcciones[6]]),
        forma_de_pago    : table.data[i][direcciones[7]],
        metodo_de_pago   : table.data[i][direcciones[8]],
        correos          : correosFiltered
      }

      facturas.push(datosParaFactura);
    }
    const requestBody = {
      id_empresa: idCompany,
      facturas: facturas
    }

    facturaService.crearFacturaMasiva(requestBody).then(
        response => {
            if(response.status) {
                dispatch(success(response))
            } else {
                dispatch(failure(response))
            }
        },
        error => {
            dispatch(failure(error.toString()))
            dispatch(alertActions.error(error.toString()))
        }
    );
    dispatch(request());
  };

  function show()             { return {type: facturaConstants.SHOW_DATA, table} }
  function request()          { return {type: facturaConstants.MASSIVE_CREATE_REQUEST, table} }
  function success(response)  { return {type: facturaConstants.MASSIVE_CREATE_SUCCESS, response}}
  function failure(response)  { return {type: facturaConstants.MASSIVE_CREATE_FAILURE, response}}

}

function clearMassiveImport(){
  return dispatch => {
    dispatch(clear());
  }
  function clear() {return {type: facturaConstants.MASSIVE_CLEAR}}
}

function createImport(table) {
    return dispatch => {
        const { cols, data } = table;
        dispatch(request());
        const columns = cols.map((item) => {
            return item.name;
        })
        if(allowedColumns.every(i => columns.includes(i))){
            facturaService.importar({columns,data})
            .then(
                response => {
                    if(response.status){
                        dispatch(success());
                        dispatch(alertActions.success(response.message))
                    }
                    else{
                        cols.push({name: 'ERROR', key: cols.length})
                        let result = {cols, data: response.data.errores};
                        dispatch(failure(result));
                        dispatch(alertActions.error(response.message));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
        } else {
            dispatch(failure("Las columnas del archivo no corresponden con la acción especificada."));
            dispatch(alertActions.error("Las columnas del archivo no corresponden con la acción especificada"));
        }
    };

    function request() {
        return { type: facturaConstants.IMPORT_REQUEST }
    }

    function success() {
        return { type: facturaConstants.IMPORT_SUCCESS }
    }

    function failure(result) {
        return { type: facturaConstants.IMPORT_FAILURE, result }
    }
}

function getAll(idAgente) {
    return dispatch => {
        dispatch(request());

        facturaService.getAll(idAgente)
            .then(
                response => {
                    dispatch(success(response.data))
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: facturaConstants.GETALL_REQUEST } }
    function success(data) { return { type: facturaConstants.GETALL_SUCCESS, data }  }
    function failure(error) { return { type: facturaConstants.GETALL_FAILURE, error } }
}

function crearComplemento(data) {
    return dispatch => {
        dispatch(request());
        let complementos = [];
        const { checkedItems, monto, idCompany, idAgente, fechaPago, formaDePago} = data;
        for (var i in checkedItems) {
            let comp = {
                idFactura : checkedItems[i].key,
                serie: checkedItems[i].serie,
                folio : checkedItems[i].folio,
                uuid : checkedItems[i].uuid,
                restante : checkedItems[i].restante,
                n_abonos : checkedItems[i].n_abonos,
                importe_pago : checkedItems[i].importe_pago,
                total : checkedItems[i].total,
                fecha : checkedItems[i].fecha,
            }
            complementos.push(comp);
        }
        let requestBody = {
            id_empresa : idCompany,
            id_agente : idAgente,
            formaPago : formaDePago,
            fechaPago : `${formatDate(fechaPago)} 12:00:00`,
            monto,
            complementos
        }
        facturaService.crearComplemento(requestBody)
            .then(
                response => {
                    if(response.status) {
                        dispatch(success(response));
                    } else {
                        dispatch(failure(response))
                    }
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            );
    };

    function request() { return { type: facturaConstants.CREATE_REQUEST } }
    function success(response) { return { type: facturaConstants.CREATE_SUCCESS, response }  }
    function failure(response) { return { type: facturaConstants.CREATE_FAILURE, response } }
}
function showXML(files){
    return dispatch => {
      const xmls = files;
      dispatch(show());
  
      function arrayBufferToString(arrayBuffer, decoderType = 'utf-8') {
        let decoder = new TextDecoder(decoderType);
        return decoder.decode(arrayBuffer);
      }
  
      let strings = []
      function readFileAsync(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
  
          reader.onload = () => {
            resolve(reader.result);
          };
  
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        })
      }
  
      async function processFile(file) {
        try {
          let xmlToJson = [];
          for(let i=0; i<file.length; i++){
            let arrayBuffer = await readFileAsync(file[i]);
            xmlToJson[i] = parser.parse(arrayBufferToString(arrayBuffer.slice(0)), options);
          }
          dispatch(request(xmlToJson));
          dispatch(success(xmlToJson));
        }
        catch (err) {
          console.log(err);
        }
      }
  
      processFile(xmls);
    }
    function show(){ return { type: facturaConstants.XML_FACTURASSHOW, files} }
    function request(strings){ return {type: facturaConstants.XML_FACTURASHOW_REQUEST , strings } }
    function success(strings){ return { type: facturaConstants.XML_FACTURASHOW_SUCCESS, strings } }
  };
  
  function clearXML(){
    return dispatch => {
      dispatch(clear());
    }
    function clear(){ return { type: facturaConstants.XML_FACTURASHOW_CLEAR } }
  };

function cargarXML(data){
    return dispatch => {
      if(data){
        let facturasFiltered = data.filter(xml => xml["cfdi:Comprobante"].TipoDeComprobante === "I" );
        dispatch(request());
        //console.log(facturasFiltered);
        const facturas = facturasFiltered.map((x, i) => {
          const comprobante = x["cfdi:Comprobante"];
          const impuestos = typeof(comprobante["cfdi:Impuestos"]) === 'undefined' ? null:comprobante["cfdi:Impuestos"];
          const impuestostraslados = impuestos === null ? null: typeof(impuestos["cfdi:Traslados"]) === 'undefined' ? null : impuestos["cfdi:Traslados"];
          const impuestosretenciones = impuestos === null ? null:  typeof(impuestos["cfdi:Retenciones"]) === 'undefined' ? null : impuestos["cfdi:Retenciones"];
          let id_empresa= JSON.parse(localStorage.getItem("company")).id;
          let totaltrasladoFac  = impuestos === null ? 0:  typeof(impuestos.TotalImpuestosTrasladados) === 'undefined' ? 0: impuestos.TotalImpuestosTrasladados
          let totalretencionFac  = impuestos === null ? 0:  typeof(impuestos.TotalImpuestosRetenidos) === 'undefined' ? 0: impuestos.TotalImpuestosRetenidos
          let impuestosFactura = [];
          if( impuestostraslados !==null){
          if(impuestostraslados[0]){
            impuestosFactura.push(impuestostraslados.map(y => {
            return {
              "id_tipo_impuesto": y.Impuesto,
              "tras_ret": 0,
              "subtotal_impuesto":y.Importe
            }
          }))
          } else {
            let impuestoTras = {
              "id_tipo_impuesto": impuestostraslados["cfdi:Traslado"].Impuesto,
                "tras_ret": 0,
                "subtotal_impuesto":impuestostraslados["cfdi:Traslado"].Importe
            }
            impuestosFactura.push(impuestoTras);
          }
          }
          if( impuestosretenciones !==null ){
          if(impuestosretenciones[0]){
            impuestosFactura.push(impuestosretenciones.map(y => {
            return {
              "id_tipo_impuesto": y.Impuesto,
              "tras_ret": 1,
              "subtotal_impuesto":y.Importe
            }
          }))
          } else {
            let impuestoRet = {
              "id_tipo_impuesto": impuestosretenciones["cfdi:Retencion"].Impuesto,
                "tras_ret": 1,
                "subtotal_impuesto":impuestosretenciones["cfdi:Retencion"].Importe
            }
            impuestosFactura.push(impuestoRet);
          }
          }
  
          return {
            "id_empresa" :id_empresa,
            "serie": comprobante.Serie,
            "folio": comprobante.Folio,
            "uuid": comprobante["cfdi:Complemento"]["tfd:TimbreFiscalDigital"].UUID,
            "total": comprobante.Total,
            "metodo_pago": comprobante.MetodoPago,
            "moneda": comprobante.Moneda,
            "fecha": comprobante.Fecha,
            'totaltraslado': totaltrasladoFac,
            'totalretencion': totalretencionFac,
            'impuestos_factura':impuestosFactura,
          }
        })
  
        let requestBody = {
          "facturas": facturas
        }
  
        facturaService.cargarFacturasXML(requestBody)
          .then(
            response => {
              if(response.status){
                dispatch(alertActions.success(response.message))
                dispatch(success(response.message, facturasFiltered))
              } else{
                dispatch(failure(response.message))
                dispatch(alertActions.success(response.message))
              }
            },
            error => {
              dispatch(failure(error.toString()))
              dispatch(alertActions.error(error.toString()))
            }
          );
  
      }
    }
  
    function request(){ return { type: facturaConstants.XML_FACTURACREATE_REQUEST } }
    function success(response, facturas) { return { type: facturaConstants.XML_FACTURACREATE_SUCCESS, response, facturas } }
    function failure(response) { return { type: facturaConstants.XML_FACTURACREATE_FAILURE } }
  }
