import { 
    cuentaImportar,
    getCuentas,
    getCuentaAgente
} from '.';

import { uriDevelop, headers } from '../../service'

export const cuentaService = {
    importar,
    getAll,
    getAgenteCuenta
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

    return fetch(`${uriDevelop}${cuentaImportar}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: headers
    };

    return fetch(`${uriDevelop}${getCuentas}`, requestOptions)
            .then(handleResponse);
}

function getAgenteCuenta(idAgente) {
    const requestOptions = {
        method: 'GET',
        headers: headers
    };

    return fetch(`${uriDevelop}${getCuentaAgente}?idAgente=${idAgente}`, requestOptions)
            .then(handleResponse);
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