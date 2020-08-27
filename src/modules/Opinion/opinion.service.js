import { postOpinion } from '.'
import { uriDevelop, headers } from '../../service'

export const opinionService = {
  cargarOpinion
}

function handleResponse(response){
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if(!response.ok){
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

function cargarOpinion(requestBody){
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
  }

  return fetch(`${uriDevelop}${postOpinion}`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response;
    });
}
