import {
    getFacturasCorte,
    CreateCorteCaja,
    getListarCortes,
    createPoliza
} from '.';

import { uriDevelop, headers } from '../../service'

export const corteService = {
    getAll,
    crearCorteCaja,
    getAllCortes,
    crearPoliza
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

function getAll(idEmpresa) {
    const requestOptions = {
        method: 'GET',
        headers: headers
    };

    return fetch(`${uriDevelop}${getFacturasCorte}?idEmpresa=${idEmpresa}`, requestOptions)
    .then(handleResponse)
            .then(response => {
                return response;
            });
}

function getAllCortes(idUsuario) {
    const requestOptions = {
        method: 'GET',
        headers: headers
    };

    return fetch(`${uriDevelop}${getListarCortes}?idUsuario=${idUsuario}`, requestOptions)
    .then(handleResponse)
            .then(response => {
                return response;
            });
}

function crearCorteCaja(requestBody) {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    };

    return fetch(`${uriDevelop}${CreateCorteCaja}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function crearPoliza(requestBody) {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    };

    return fetch(`${uriDevelop}${createPoliza}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}