import {
  getListFactOpi,
  getListFactNoAut,
  getAgente
} from './'
import { uriDevelop, headers } from '../../service'

export const reporteService = {
  getListaFacturasSinAut,
  getListaFacturaOpinion,
  getAgentes
}

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

function getAgentes() {
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(`${uriDevelop}${getAgente}`, requestOptions)
    .then(handleResponse);
}

function getListaFacturasSinAut(filtro) {
  let requestBody = { filtro: filtro }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  };
  return fetch(`${uriDevelop}${getListFactNoAut}`, requestOptions)
    .then(handleResponse)
}

function getListaFacturaOpinion(filtro) {
  let requestBody = { filtro: filtro }
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  };
  return fetch(`${uriDevelop}${getListFactOpi}`, requestOptions)
    .then(handleResponse)
}