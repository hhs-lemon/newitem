import axios from 'axios'
import qs from 'querystring'

const axiosInstance = axios.create()

const stringify = (obj, sep, eq, name) => {
  if (obj) {
    // 过滤空参数
    const noneEmptyObj = {}
    Object.keys(obj).forEach(key => {
      if (obj[key] !== undefined && obj[key] !== null) {
        noneEmptyObj[key] = obj[key]
      }
    })
    return qs.stringify(noneEmptyObj, sep, eq, name)
  }
  return qs.stringify(obj, sep, eq, name)
}

export const http = {
  request: (config) => {
    return axiosInstance.request(config)
  },
  get: (url, params, config) => {
    let query = stringify(params)
    if (query) {
      query = `?${query}`
    }
    return axiosInstance.get(`${url}${query}`, config)
  },
  delete: (url, params, config) => {
    let query = stringify(params)
    if (query) {
      query = `?${query}`
    }
    return axiosInstance.delete(`${url}${query}`, config)
  },
  head: (url, params, config) => {
    let query = stringify(params)
    if (query) {
      query = `?${query}`
    }
    return axiosInstance.head(`${url}${query}`, config)
  },
  post: (url, params, config) => {
    return axiosInstance.post(url, params, config)
  },
  put: (url, params, config) => {
    return axiosInstance.put(url, params, config)
  },
  patch: (url, params, config) => {
    return axiosInstance.patch(url, params, config)
  },
  postFormData: (url, params, config) => {
    return axiosInstance.post(url, stringify(params), config)
  }
}

export const HttpPlugin = {
  install: function (Vue, options) {
    const errorHandler = options.errorHandler
    if (errorHandler) {
      axiosInstance.interceptors.response.use(
        function (response) {
          // Do something with response data
          return response
        },
        errorHandler
      )
    }

    Vue.prototype.$http = http
  }
}
