import {
  importar_chargeCode,
} from '.'

import { uriDevelop, headers } from '../../../service'

export const importarCWService = {
  importarChargeCode,
}

function handleResponse(response){
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if(!response.ok){
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error)
    }

    return data
  });
}


function importarChargeCode({newCols, data}) {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({'columns': newCols, 'rows': data})
  }
  return fetch(`${uriDevelop}${importar_chargeCode}`, requestOptions)
    .then(handleResponse)
    .then(response => {
      return response
    })
}
