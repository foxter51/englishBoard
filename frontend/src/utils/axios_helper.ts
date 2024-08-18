import axios, { AxiosResponse } from 'axios'
import AuthService from '../services/AuthService'
import { ApiResponse } from '../responses/ApiResponse'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export const request = async <T>(method: RequestMethod, url: string, data?: unknown
    ): Promise<ApiResponse<T>> => {
    let headers = {}

    if (AuthService.getAuthToken() !== null && AuthService.getAuthToken() !== "null") {
        headers = { "Authorization": `Bearer ${AuthService.getAuthToken()}` }
    }

    try {
        const response: AxiosResponse<T> = await axios({
            method: method,
            headers: headers,
            url: url,
            data: data
        })
        return { data: response.data, status: response.status }
    } catch (err) {
        console.log(err)
        throw err
    }
}