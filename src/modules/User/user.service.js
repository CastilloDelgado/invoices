import { authHeader } from '../../helpers';
import { uriDevelop, loginUri, headers } from '../../service';

export const userService = {
    login,
    logout,
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
        body: JSON.stringify({ LoginForm : { username, password } })
    };

    return fetch(`${uriDevelop}${loginUri}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response.status) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response;
        });
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('company');
    //cookies.remove("_csrf-api");
}
/* 
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: headers
    };

    return fetch(`localhost/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`localhost/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`localhost/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`localhost/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`localhost/users/${id}`, requestOptions).then(handleResponse);
}
*/
