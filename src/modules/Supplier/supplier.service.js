import { authHeader } from '../../helpers';
import { uriDevelop, headers, registerUri } from '../../service';
import { supplierLogin, getPasswordDir, changePasswordDir } from './';

export const supplierService = {
    login,
    logout,
    register,
    getPassword,
    changePassword
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ LoginProv : { username, password } })
    };

    return fetch(`${uriDevelop}${supplierLogin}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response.status) {
                localStorage.setItem('supplier', JSON.stringify(response.data));
            }

            return response;
        });
}

function logout() {
    localStorage.removeItem('supplier');
}

function register(supplier) {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(supplier)
    };

    return fetch(`${uriDevelop}${registerUri}`, requestOptions)
    .then(handleResponse)
        .then(response => {
            return response;
        });
    }


function getPassword(idSupplier){
    const requestOptions = {
        method: 'GET',
        headers: headers
    }

    return fetch(`${uriDevelop}${getPasswordDir}${"idSupplier="}${idSupplier}`, requestOptions)
    .then(handleResponse)
        .then(response => {
            return response
        })
}

function changePassword(body){
    const requestOptions = {
        method:'POST',
        headers: headers,
        body: JSON.stringify(body)
    }

    return fetch(`${uriDevelop}${changePasswordDir}`, requestOptions)
    .then(handleResponse)
        .then(response => {
            return response
        })
}