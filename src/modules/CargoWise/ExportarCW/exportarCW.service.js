import {
  getAgente,
  get_CSV,
  updateInvoiceStatusURL

}  from './'

import {
  uriDevelop,
  headers
} from '../../../service'

export const exportarCWService = {
  getAgentes,
  getCSV,
  updateInvoiceStatus,
  updateInvoiceStatusFactura
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      const error = (data && data.message) || response.statusText
      return Promise.reject(error);
    }
    return data;
  });
}

function getAgentes() {
  const requestOptions = {
    method: 'GET',
    headers: headers
  }

  return fetch(`${uriDevelop}${getAgente}`, requestOptions)
    .then(handleResponse);
}


function getCSV(agentes, idUsuario) {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "idAgentes": agentes,
      "idUsuario": idUsuario
    })
  }

  return fetch(`${uriDevelop}${get_CSV}`, requestOptions)
    .then(handleResponse);
}

function updateInvoiceStatus(invoices){
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "facturas": invoices,
      "status": 4
    })
  }

  return fetch(`${uriDevelop}${updateInvoiceStatusURL}`, requestOptions)
    .then(handleResponse);
}

function updateInvoiceStatusFactura(invoices) {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "facturas": invoices["facturas"],
      "status": invoices["status"]
    })
  }

  return fetch(`${uriDevelop}${updateInvoiceStatusURL}`, requestOptions)
    .then(handleResponse);
}
