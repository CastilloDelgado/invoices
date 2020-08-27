import { xmlCargar } from '.';
import { uriDevelop, headers } from '../../service'

export const xmlService = { cargarXML };

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

function cargarXML(requestBody){
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  };

  return fetch(`${uriDevelop}${xmlCargar}`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}
