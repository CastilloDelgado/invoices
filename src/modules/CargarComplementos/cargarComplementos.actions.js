import { alertActions } from '../Alert'
import { complementosConstants, complementosService, options, he, parser, columns } from '.'

export const complementosActions = {
  showComplementos,
  clearComplementos,
  cargarComplementos,
}

function showComplementos(files) {
  return dispatch => {
    const xmls = files
    dispatch(request())

    function arrayBufferToString(arrayBuffer, decoderType = 'utf-8') {
      let decoder = new TextDecoder(decoderType)
      return decoder.decode(arrayBuffer)
    }

    let strings = []
    function readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => { resolve(reader.result) }
        reader.onerror = reject;
        reader.readAsArrayBuffer(file)
      });
    }

    async function processFile(file) {
      try {
        let xmlToJson = [];
        for (let i = 0; i < file.length; i++) {
          let arrayBuffer = await readFileAsync(file[i]);
          xmlToJson[i] = parser.parse(arrayBufferToString(arrayBuffer.slice(0)), options);
        }
        dispatch(success(xmlToJson));
      }
      catch (err) { console.log(err); }
    }
    processFile(xmls);
  }
  function request(complementos) { return { type: complementosConstants.FILE_SHOW_REQUEST, complementos } }
  function success(complementos) { return { type: complementosConstants.FILE_SHOW_SUCCESS, complementos } }
}

function clearComplementos() {
  return dispatch => { dispatch(clear()); }
  function clear() { return { type: complementosConstants.FILE_SHOW_CLEAR } }
}

function cargarComplementos(data) {
  return dispatch => {
    let complementos = data.filter(xmls => xmls["cfdi:Comprobante"].TipoDeComprobante === "P");
    dispatch(request());
    let complementosBody = []
    for (let i = 0; i < complementos.length; i++) {
      const comprobante = complementos[i]["cfdi:Comprobante"]
      const complemento = comprobante["cfdi:Complemento"]["pago10:Pagos"]["pago10:Pago"]
      const doctosRelacionados = complemento["pago10:DoctoRelacionado"]
      const pagosDocsRelac = complemento
      let body = {}
      let bodyRelacionados = []
      if (typeof (doctosRelacionados) != "undefined") {
        if (doctosRelacionados[0]) {
          for (let x = 0; x < doctosRelacionados.length; x++) {
            let bodyR = {
              uuid: doctosRelacionados[x].IdDocumento,
              monto: doctosRelacionados[x].ImpPagado,
            }
            bodyRelacionados.push(bodyR)
          }
        } else {
          let bodyR = {
            uuid: doctosRelacionados.IdDocumento,
            monto: doctosRelacionados.ImpPagado,
          }
          bodyRelacionados.push(bodyR)
        }
        body = {
          serie: comprobante.Serie,
          folio: comprobante.Folio,
          uuid: comprobante["cfdi:Complemento"]["tfd:TimbreFiscalDigital"].UUID,
          total: complemento.Monto,
          fecha_emision: comprobante.Fecha,
          facturas: bodyRelacionados
        }
      }
      else {
        let ctotal = 0;
        if (pagosDocsRelac[0]) {
          for (let x = 0; x < pagosDocsRelac.length; x++) {
            ctotal += parseFloat(pagosDocsRelac[x]["pago10:DoctoRelacionado"].ImpPagado);
            let bodyR = {
              uuid: pagosDocsRelac[x]["pago10:DoctoRelacionado"].IdDocumento,
              monto: pagosDocsRelac[x]["pago10:DoctoRelacionado"].ImpPagado,
            }
            bodyRelacionados.push(bodyR)
          }
        } else {
          ctotal += parseFloat(pagosDocsRelac["pago10:DoctoRelacionado"].ImpPagado);
          let bodyR = {
            uuid: pagosDocsRelac["pago10:DoctoRelacionado"].IdDocumento,
            monto: pagosDocsRelac["pago10:DoctoRelacionado"].ImpPagado,
          }
          bodyRelacionados.push(bodyR)
        }
        body = {
          serie: comprobante.Serie,
          folio: comprobante.Folio,
          uuid: comprobante["cfdi:Complemento"]["tfd:TimbreFiscalDigital"].UUID,
          total: ctotal,
          fecha_emision: comprobante.Fecha,
          facturas: bodyRelacionados
        }
      }
      complementosBody.push(body);
    }

    let requestBody = {
      "idAgente": JSON.parse(localStorage.getItem('supplier')).user.id_agente, //Usuario en sesion
      "complementos": complementosBody,
    }
    complementosService.cargarComplemento(requestBody)
      .then(
        response => {
          if (response.status) {
            dispatch(alertActions.success(response.message))
            dispatch(success(response.message, complementos))
          } else {
            dispatch(failure(response.message))
            dispatch(alertActions.success(response.message))
          }
        },
        error => {
          dispatch(alertActions.error(error.toString()))
          console.log(error)
          dispatch(failure(error.toString()))
        }
      )

    function request() { return { type: complementosConstants.FILE_POST_REQUEST } }
    function success(response, complementos) { return { type: complementosConstants.FILE_POST_SUCCESS, response, complementos } }
    function failure(response) { return { type: complementosConstants.FILE_POST_FAIL, response } }
  }
}
