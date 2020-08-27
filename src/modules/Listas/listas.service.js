import {
  getListaFacturasUrl,
  getListaConceptosUrl,
  getAgente,
} from './'
import { uriDevelop, headers } from '../../service'

export const listasService = {
  getListaFacturas,
  getListaConceptos,
  getAgentes,
  handleResponse,
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

function getListaFacturas(filtro, idUsuario) {
  let requestBody = { filtro: filtro }
  //Validar si es Admin o Proveedor por URL
  if (window.location.href.includes('admin')) {
    requestBody.idUsuario = idUsuario
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    };
    return fetch(`${uriDevelop}${getListaFacturasUrl}`, requestOptions)
      .then(handleResponse)
  } else {
    const supplierData = JSON.parse(localStorage.getItem('supplier'))
    filtro.agente_filtro = supplierData.user.id_agente
    let requestBody = { filtro: filtro }
    requestBody.idUsuario = null
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    };
    return fetch(`${uriDevelop}${getListaFacturasUrl}`, requestOptions)
      .then(handleResponse)
  }
}

function getListaConceptos(selectecFactura) {
  const requestOptions = {
    method: 'GET',
    headers: headers
  }
  return fetch(`${uriDevelop}${getListaConceptosUrl}${selectecFactura}`, requestOptions)
    .then(handleResponse)
}


function getAgentes() {
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(`${uriDevelop}${getAgente}`, requestOptions)
    .then(handleResponse);
}
