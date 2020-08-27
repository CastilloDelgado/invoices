
import { listMountsDir, updateMountsDir } from '.'
import { uriDevelop, headers } from '../../../service'

export const mountCaptureService = {
    getMounts,
    updateMounts
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }
        return data
    })
}

function getMounts(filtro, idUsuario) {
    let requestBody = { filtro: filtro, idUsuario: idUsuario }
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    }

    return fetch(`${uriDevelop}${listMountsDir}`, requestOptions)
        .then(handleResponse)
}

function updateMounts(body) {
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(
            { "mounts": body }
        )
    }

    return fetch(`${uriDevelop}${updateMountsDir}`, requestOptions)
        .then(handleResponse)
}