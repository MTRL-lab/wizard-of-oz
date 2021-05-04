import axios from "axios"

export const url = 'http://localhost:3002'
export const baseURL = `${url}/api/`

export default axios.create({
    baseURL
})