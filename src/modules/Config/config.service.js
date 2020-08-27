import { obtenerGeneral, obtenerUsuario } from '.';
import { uriDevelop, headers } from '../../service'
import Encryption from '../../utils/encrypt'

export const configService = { 
  getConfig,
  getUserConfig
};

function handleResponse(response) {
    let encrypt = new Encryption();
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return JSON.parse(encrypt.decrypt(data,'Krono201$'));
  });
}

function getConfig(){
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(`${uriDevelop}${obtenerGeneral}`, requestOptions)
    .then(handleResponse);
}

function getUserConfig(idUser){
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(`${uriDevelop}${obtenerUsuario}?idUser=${idUser}`, requestOptions)
    .then(handleResponse);
}
