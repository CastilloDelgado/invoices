import { alertActions } from "../Alert";
import { xmlConstants, xmlService, options, parser, columns } from ".";

export const xmlActions = {
  cargarXML,
  showXML,
  clearXML,
  cargarJobs,
  cargarXML2,
  cargarCedi,
};

function showXML(files) {
  return (dispatch) => {
    const xmls = files;
    dispatch(show());

    function arrayBufferToString(arrayBuffer, decoderType = "utf-8") {
      let decoder = new TextDecoder(decoderType);
      return decoder.decode(arrayBuffer);
    }

    let strings = [];
    function readFileAsync(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    }

    async function processFile(file) {
      try {
        let xmlToJson = [];
        for (let i = 0; i < file.length; i++) {
          let arrayBuffer = await readFileAsync(file[i]);
          xmlToJson[i] = parser.parse(
            arrayBufferToString(arrayBuffer.slice(0)),
            options
          );
        }
        dispatch(request(xmlToJson));
        dispatch(success(xmlToJson));
      } catch (err) {}
    }

    processFile(xmls);
  };
  function show() {
    return { type: xmlConstants.XML_SHOW, files };
  }
  function request(strings) {
    return { type: xmlConstants.XML_SHOW_REQUEST, strings };
  }
  function success(strings) {
    return { type: xmlConstants.XML_SHOW_SUCCESS, strings };
  }
}

function clearXML() {
  return (dispatch) => {
    dispatch(clear());
  };
  function clear() {
    return { type: xmlConstants.XML_SHOW_CLEAR };
  }
}

function cargarXML2(data, jobData, cedi) {
  return (dispatch) => {
    if (data) {
      data.forEach((factura, i) => {
        factura.job = jobData[i];
        factura.cedi = cedi[i];
      });
      let facturasFiltered = data.filter(
        (xml) =>
          xml["cfdi:Comprobante"].TipoDeComprobante === "I" &&
          ((xml["cfdi:Comprobante"].MetodoPago === "PPD" &&
            xml["cfdi:Comprobante"].FormaPago === "99") ||
            (xml["cfdi:Comprobante"].MetodoPago === "PUE" &&
              xml["cfdi:Comprobante"].FormaPago === "03")) &&
          xml["cfdi:Comprobante"]["cfdi:Receptor"].UsoCFDI === "G03"
      );
      dispatch(request());
      const facturas = facturasFiltered.map((x, i) => {
        let tipoFactura = 1;
        const comprobante = x["cfdi:Comprobante"];
        const impuestos = comprobante["cfdi:Impuestos"];
        const conceptosFactura = comprobante["cfdi:Conceptos"]["cfdi:Concepto"];
        const id = JSON.parse(localStorage.getItem("supplier")).user.id_agente;
        const emisor = comprobante["cfdi:Emisor"]["Rfc"];
        const receptor = comprobante["cfdi:Receptor"]["Rfc"];
        let trasladoFac =
          typeof impuestos !== "undefined" &&
          impuestos.TotalImpuestosTrasladados
            ? impuestos.TotalImpuestosTrasladados
            : 0;
        let retencionFac =
          typeof impuestos !== "undefined" && impuestos.TotalImpuestosRetenidos
            ? impuestos.TotalImpuestosRetenidos
            : 0;
        let conceptos = [];
        if (conceptosFactura[0]) {
          conceptosFactura.forEach((concepto) => {
            let trasladoCon =
              concepto["cfdi:Impuestos"] &&
              concepto["cfdi:Impuestos"]["cfdi:Traslados"]
                ? concepto["cfdi:Impuestos"]["cfdi:Traslados"]["cfdi:Traslado"]
                : null;
            let retencionCon =
              concepto["cfdi:Impuestos"] &&
              concepto["cfdi:Impuestos"]["cfdi:Retenciones"]
                ? concepto["cfdi:Impuestos"]["cfdi:Retenciones"][
                    "cfdi:Retencion"
                  ]
                : null;

            let trasladoTotal = 0;
            let retencionTotal = 0;

            if (trasladoCon) {
              if (trasladoCon[0]) {
                for (let i in trasladoCon) {
                  trasladoTotal += parseFloat(
                    trasladoCon[i].Importe ? trasladoCon[i].Importe : 0
                  );
                }
              } else {
                trasladoTotal = trasladoCon.Importe
                  ? parseFloat(trasladoCon.Importe)
                  : 0;
              }
            }

            if (retencionCon) {
              if (retencionCon[0]) {
                for (let i in retencionCon) {
                  retencionTotal += parseFloat(
                    retencionCon[i].Importe ? retencionCon[i].Importe : 0
                  );
                }
              } else {
                retencionTotal = retencionCon.Importe
                  ? parseFloat(retencionCon.Importe)
                  : 0;
              }
            }

            conceptos.push({
              tipo: 0,
              cantidad: concepto.Cantidad,
              clave_producto_servicio: concepto.ClaveProdServ,
              clave_unidad: concepto.ClaveUnidad,
              descripcion: concepto.Descripcion,
              importe: concepto.Importe,
              valor_unitario: concepto.ValorUnitario,
              traslado: trasladoTotal,
              retencion: retencionTotal,
              descuento: concepto.Descuento ? concepto.Descuento : 0,
            });

            if (concepto["cfdi:ComplementoConcepto"]) {
              const cuentaPorTerceros =
                concepto["cfdi:ComplementoConcepto"][
                  "terceros:PorCuentadeTerceros"
                ];
              if (cuentaPorTerceros[0]) {
                tipoFactura = 2;
                cuentaPorTerceros.forEach((cuenta) => {
                  const parte = cuenta["terceros:Parte"];
                  const impuestos = cuenta["terceros:Impuestos"];
                  if (parte[0]) {
                    parte.forEach((linea) => {
                      conceptos.push({
                        tipo: 1,
                        cantidad: linea.cantidad,
                        clave_producto_servicio: "",
                        clave_unidad: linea.unidad,
                        descripcion: linea.descripcion,
                        importe: linea.importe,
                        valor_unitario: linea.valorUnitario,
                        traslado: impuestos["terceros:Traslado"]
                          ? impuestos["terceros:Traslado"]["terceros:Traslado"]
                              .importe
                          : 0,
                        retencion: impuestos["terceros:Retencion"]
                          ? impuestos["terceros:Retencion"][
                              "terceros:Retencion"
                            ].importe
                          : 0,
                      });
                    });
                  } else {
                    conceptos.push({
                      tipo: 1,
                      cantidad: parte.cantidad,
                      clave_producto_servicio: "",
                      clave_unidad: parte.unidad,
                      descripcion: parte.descripcion,
                      importe: parte.importe,
                      valor_unitario: parte.valorUnitario,
                      traslado: impuestos["terceros:Traslado"]
                        ? impuestos["terceros:Traslado"]["terceros:Traslado"]
                            .importe
                        : 0,
                      retencion: impuestos["terceros:Retencion"]
                        ? impuestos["terceros:Retencion"]["terceros:Retencion"]
                            .importe
                        : 0,
                    });
                  }
                });
              } else {
                tipoFactura = 2;
                const parte = cuentaPorTerceros["terceros:Parte"];
                const impuestos = cuentaPorTerceros["terceros:Impuestos"];
                if (parte[0]) {
                  parte.forEach((linea) => {
                    conceptos.push({
                      tipo: 1,
                      cantidad: linea.cantidad,
                      clave_producto_servicio: "",
                      clave_unidad: linea.unidad,
                      descripcion: linea.descripcion,
                      importe: linea.importe,
                      valor_unitario: linea.valorUnitario,
                      traslado: impuestos["terceros:Traslado"]
                        ? impuestos["terceros:Traslado"]["terceros:Traslado"]
                            .importe
                        : 0,
                      retencion: impuestos["terceros:Retencion"]
                        ? impuestos["terceros:Retencion"]["terceros:Retencion"]
                            .importe
                        : 0,
                    });
                  });
                } else {
                  conceptos.push({
                    tipo: 1,
                    cantidad: parte.cantidad,
                    clave_producto_servicio: "",
                    clave_unidad: parte.unidad,
                    descripcion: parte.descripcion,
                    importe: parte.importe,
                    valor_unitario: parte.valorUnitario,
                    traslado: impuestos["terceros:Traslado"]
                      ? impuestos["terceros:Traslado"]["terceros:Traslado"]
                          .importe
                      : 0,
                    retencion: impuestos["terceros:Retencion"]
                      ? impuestos["terceros:Retencion"]["terceros:Retencion"]
                          .importe
                      : 0,
                  });
                }
              }
            }
          });
        } else {
          let impuestoConcepto = conceptosFactura["cfdi:Impuestos"];
          let trasladoCon =
            typeof conceptosFactura["cfdi:Impuestos"] !== "undefined" &&
            conceptosFactura["cfdi:Impuestos"]["cfdi:Traslados"]
              ? conceptosFactura["cfdi:Impuestos"]["cfdi:Traslados"][
                  "cfdi:Traslado"
                ]
              : null;
          let retencionCon =
            typeof conceptosFactura["cfdi:Impuestos"] !== "undefined" &&
            conceptosFactura["cfdi:Impuestos"]["cfdi:Retenciones"]
              ? conceptosFactura["cfdi:Impuestos"]["cfdi:Retenciones"][
                  "cfdi:Retencion"
                ]
              : null;

          let trasladoTotal = 0;
          let retencionTotal = 0;

          if (trasladoCon) {
            if (trasladoCon[0]) {
              for (let i in trasladoCon) {
                trasladoTotal += parseFloat(
                  trasladoCon[i].Importe ? trasladoCon[i].Importe : 0
                );
              }
            } else {
              trasladoTotal = trasladoCon.Importe
                ? parseFloat(trasladoCon.Importe)
                : 0;
            }
          }

          if (retencionCon) {
            if (retencionCon[0]) {
              for (let i in retencionCon) {
                retencionTotal += parseFloat(
                  retencionCon[i].Importe ? retencionCon[i].Importe : 0
                );
              }
            } else {
              retencionTotal = retencionCon.Importe
                ? parseFloat(retencionCon.Importe)
                : 0;
            }
          }

          conceptos = {
            tipo: 0,
            cantidad: conceptosFactura.Cantidad,
            clave_producto_servicio: conceptosFactura.ClaveProdServ,
            clave_unidad: conceptosFactura.ClaveUnidad,
            descripcion: conceptosFactura.Descripcion,
            importe: conceptosFactura.Importe,
            valor_unitario: conceptosFactura.ValorUnitario,
            traslado: trasladoTotal,
            retencion: retencionTotal,
            descuento: conceptosFactura.Descuento
              ? conceptosFactura.Descuento
              : 0,
          };
        }

        const is_multijob = x.job.indexOf(",") !== -1 ? 1 : 0;

        return {
          id_agente: id,
          tipo: tipoFactura,
          rfc_emisor: emisor,
          rfc_receptor: receptor,
          conceptos: conceptos,
          job: x.job,
          cedi: x.cedi,
          serie: comprobante.Serie,
          folio: comprobante.Folio,
          uuid: comprobante["cfdi:Complemento"]["tfd:TimbreFiscalDigital"].UUID,
          total: comprobante.Total,
          metodo_pago: comprobante.MetodoPago,
          moneda: comprobante.Moneda,
          fecha: comprobante.Fecha,
          traslado: trasladoFac,
          retencion: retencionFac,
          is_multijob: is_multijob,
        };
      });

      let requestBody = {
        facturas: facturas,
      };

      console.log("Request Body: ", requestBody);

       xmlService.cargarXML(requestBody)
       .then(
         response => {
           if (response.status) {
             dispatch(alertActions.success(response.message))
             dispatch(success(response.message, facturasFiltered))
            } else {
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
  };

  function request() {
    return { type: xmlConstants.XML_LOAD_REQUEST };
  }
  function success(response, facturas) {
    return { type: xmlConstants.XML_LOAD_SUCCESS, response, facturas };
  }
  function failure(response) {
    return { type: xmlConstants.XML_LOAD_FAILURE };
  }
}

function cargarXML(data, jobData) {
  return (dispatch) => {
    if (data) {
      let obData;
      let retencion = null;
      let traslados = null;

      // agregar el job a las facturas
      data.forEach((factura, i) => {
        factura.job = jobData[i];
      });

      let facturas = data.filter(
        (xml) =>
          xml["cfdi:Comprobante"].TipoDeComprobante === "I" &&
          ((xml["cfdi:Comprobante"].MetodoPago === "PPD" &&
            xml["cfdi:Comprobante"].FormaPago === "99") ||
            (xml["cfdi:Comprobante"].MetodoPago === "PUE" &&
              xml["cfdi:Comprobante"].FormaPago === "03")) &&
          xml["cfdi:Comprobante"]["cfdi:Receptor"].UsoCFDI === "G03"
      );
      dispatch(request());
      let rows = [];
      for (let i = 0; i < facturas.length; i++) {
        const comprobante = facturas[i]["cfdi:Comprobante"];
        const impuestos = comprobante["cfdi:Impuestos"];
        const conceptos = comprobante["cfdi:Conceptos"]["cfdi:Concepto"];
        let body = [];
        if (conceptos[0]) {
          body.push(
            conceptos.map((x) => {
              return {
                Cantidad: x.Cantidad,
                ClaveProdServ: x.ClaveProdServ,
                ClaveUnidad: x.ClaveUnidad,
                Descripcion: x.Descripcion,
                Importe: x.Importe,
                ValorUnitario: x.ValorUnitario,
              };
            })
          );
        } else {
          body.push({
            Cantidad: conceptos.Cantidad,
            ClaveProdServ: conceptos.ClaveProdServ,
            ClaveUnidad: conceptos.ClaveUnidad,
            Descripcion: conceptos.Descripcion,
            Importe: conceptos.Importe,
            ValorUnitario: conceptos.ValorUnitario,
          });
        }
        body.push(facturas[i].job);
        body.push(comprobante.Serie);
        body.push(comprobante.Folio);
        body.push(
          comprobante["cfdi:Complemento"]["tfd:TimbreFiscalDigital"].UUID
        );
        body.push(comprobante.Total);
        body.push(comprobante.MetodoPago);
        body.push(comprobante.Moneda);
        body.push(comprobante.Fecha);
        if (
          ((comprobante.MetodoPago === "PPD" &&
            comprobante.FormaPago === "99") ||
            (comprobante.MetodoPago === "PUE" &&
              comprobante.FormaPago === "03")) &&
          comprobante["cfdi:Receptor"].UsoCFDI === "G03"
        ) {
          rows.push(body);
        }
        if (impuestos.TotalImpuestosTrasladados) {
          body.push(impuestos.TotalImpuestosTrasladados);
          traslados = true;
        }

        if (impuestos.TotalImpuestosRetenidos && traslados) {
          body.push(impuestos.TotalImpuestosRetenidos);
          retencion = "true";
        }
      }

      if (!traslados && !retencion) {
        obData = columns.slice(0, 7);
      } else if (traslados) {
        if (retencion) {
          obData = columns.slice(0, 10);
        } else {
          obData = columns.slice(0, 9);
        }
      }

      let requestBody = {
        idUsuarioProv: JSON.parse(localStorage.getItem("supplier")).user.id,
        columns: obData,
        rows: rows,
      };

      /*
      xmlService.cargarXML(requestBody).then(
        (response) => {
          if (response.status) {
            dispatch(alertActions.success(response.message));
            dispatch(success(response.message, facturas));
          } else {
            dispatch(failure(response.message));
            dispatch(alertActions.success(response.message));
          }
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        }
      );
      */
    }
  };

  function request() {
    return { type: xmlConstants.XML_LOAD_REQUEST };
  }
  function success(response, facturas) {
    return { type: xmlConstants.XML_LOAD_SUCCESS, response, facturas };
  }
  function failure(response) {
    return { type: xmlConstants.XML_LOAD_FAILURE };
  }
}

function cargarJobs(jobs) {
  return (dispatch) => {
    dispatch(jobCargado(jobs));
  };

  function jobCargado(jobs) {
    return { type: xmlConstants.XML_JOB_LOAD, jobs };
  }
}

function cargarCedi(cedi) {
  return (dispatch) => {
    dispatch(cediCargado(cedi));
  };

  function cediCargado(cedi) {
    return { type: xmlConstants.XML_CEDI_LOAD, cedi };
  }
}
