import axios from "axios"

// eslint-disable-next-line no-undef
export const url = process.env.REACT_APP_SERVER_URL

export const baseURL = `${url}/api/`

console.info('API url',baseURL)
export default axios.create({
    baseURL
})