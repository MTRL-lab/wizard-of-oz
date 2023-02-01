import axios from "axios"

// eslint-disable-next-line no-undef
export const url = process.env.REACT_APP_SERVER_URL

export const baseURL = `${url}/api/`

console.info('API url', baseURL)
const ax = axios.create({
    baseURL,
    withCredentials: true,
})

const validateResponse = (response) => {

    if (
        (typeof response.data === 'object' && response.data !== null) ||
        (Array.isArray(response.data)) || 
        (typeof response.data === 'boolean')
        ) {

        return response;
    }
    else {
        const error = new Error();
        error.message = 'No endpoint';
        error.name = 'AxiosError';
        error.code = '404'
        console.error(error)
        throw error;
    }

}

export const get = (url) => ax.get(url)
    .then(res => validateResponse(res))
    .then(res => res.data)
export const post = (url, data) => ax.post(url, data)
    .then(res => validateResponse(res))
    .then(res => res.data)
export const patch = (url, data) => ax.patch(url, data)
    .then(res => validateResponse(res))
    .then(res => res.data)
export const del = (url,data) => ax.delete(url,{data})
    .then(res => validateResponse(res))
    .then(res => res.data)

export default {
    get, post, patch, del
}