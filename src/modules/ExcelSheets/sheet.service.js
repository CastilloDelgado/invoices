/* import { authHeader } from '../../helpers';
import { 
    uriDevelop, 
    createCentroGastos, 
    getCentrosGastos,
    deleteCentrosGastos
} from '../../_constants';

export const empresasService = {
   /*  create,
    getAll,
    _delete 
}; */

/* function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
} */
/* 
function create(empresa) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Empresa : empresa })
    };

    return fetch(`${uriDevelop}${createEmpresa}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        });
}

function getAll() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${uriDevelop}${getCentrosGastos}`, requestOptions)
            .then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${uriDevelop}${deleteCentrosGastos}?id=${id}`, requestOptions)
            .then(handleResponse);
}
 */