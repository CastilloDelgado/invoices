import {
    facturaImportar,
    getFacturas,
    facturaComplemento,
    facturaMasiva,
    xmlCargarfacturas,
} from '.';

import { uriDevelop, headers } from '../../service'

export const facturaService = {
    importar,
    getAll,
    crearComplemento,
    crearFacturaMasiva,
    cargarFacturasXML
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function importar({columns, data}) {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ columns: columns, 'rows': data })
    };

    return fetch(`${uriDevelop}${facturaImportar}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function getAll(idAgente) {
    const requestOptions = {
        method: 'GET',
        headers: headers
    };

    return fetch(`${uriDevelop}${getFacturas}?idAgente=${idAgente}`, requestOptions)
            .then(handleResponse);
}

function crearFacturaMasiva(requestBody){
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  };
  return fetch(`${uriDevelop}${facturaMasiva}`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}

function crearComplemento(requestBody) {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    };

    return fetch(`${uriDevelop}${facturaComplemento}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function cargarFacturasXML(requestBody){
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    };
  
    return fetch(`${uriDevelop}${xmlCargarfacturas}`, requestOptions)
      .then(handleResponse)
      .then(response => {
        return response;
      });
  }

 /*
function _delete(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${uriDevelop}${deleteCentrosGastos}?id=${id}`, requestOptions)
            .then(handleResponse);
} */
