import { getAgente, actualizarChargeCodeUrl, actualizarConceptoJobUrl, listarConPenUrl, listarConCapUrl,listarConJobUrl, listarFactJobsUrl, actualizarFactJobsUrl } from './'
import { uriDevelop, headers } from '../../../service'

export const chargeCodeService = {
  getAgentes,
  actualizarChargeCode,
  actualizarConceptoJob,
  listarConPen,
  listarConCap,
  listarConJob,
  listarFactJobs,
  actualizarFactJobs
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}

function getAgentes() {
  const requestOptions = {
    method: 'GET',
    headers: headers
  }

  return fetch(`${uriDevelop}${getAgente}`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}

function actualizarChargeCode(conceptoList) {
  let requestBody = { conceptos: conceptoList }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  }

  return fetch(`${uriDevelop}${actualizarChargeCodeUrl}`, requestOptions)
    .then(handleResponse)
}

function actualizarConceptoJob(conceptoList, listafacturas) {
  let requestBody = { conceptos: conceptoList, facturas: listafacturas }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  }

  return fetch(`${uriDevelop}${actualizarConceptoJobUrl}`, requestOptions)
    .then(handleResponse)
}

function listarConPen(filtro, idUsuario) {
  let requestBody = { filtro: filtro, idUsuario: idUsuario }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  }

  return fetch(`${uriDevelop}${listarConPenUrl}`, requestOptions)
    .then(handleResponse)
}

function listarConCap(filtro, idUsuario) {
  let requestBody = { filtro: filtro, idUsuario: idUsuario }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  }

  return fetch(`${uriDevelop}${listarConCapUrl}`, requestOptions)
    .then(handleResponse);
}

function listarConJob(filtro, idUsuario) {
  let requestBody = { filtro: filtro, idUsuario: idUsuario }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  }

  return fetch(`${uriDevelop}${listarConJobUrl}`, requestOptions)
    .then(handleResponse);
}

function listarFactJobs(filtro, idUsuario) {
  let requestBody = { filtro: filtro, idUsuario: idUsuario }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  }

  return fetch(`${uriDevelop}${listarFactJobsUrl}`, requestOptions)
    .then(handleResponse)
}

function actualizarFactJobs(requestBody) {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "facturas": requestBody
    })
  }

  return fetch(`${uriDevelop}${actualizarFactJobsUrl}`, requestOptions)
    .then(handleResponse)
}

