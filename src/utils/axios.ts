import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import qs from 'qs'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const API = axios.create({
  baseURL: API_URL,
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false })
  },
})

const requestBefore = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return config
}

const requestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error)

const responseBefore = (response: AxiosResponse): AxiosResponse => {
  const token = response?.headers['Session-ID']
  if (token) localStorage.setItem('authorization', token)
  return response
}

const responseError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error)

API.interceptors.request.use(requestBefore, requestError)
API.interceptors.response.use(responseBefore, responseError)

export default API
