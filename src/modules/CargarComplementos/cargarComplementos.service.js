import { cargarComplementos } from '.';
import { uriDevelop, headers } from '../../service';

export const complementosService = { cargarComplemento }

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

function cargarComplemento(requestBody){
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  }

  return fetch(`${uriDevelop}${cargarComplementos}`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response
    })
}
