import { send } from "./xhr"
import { mergeDeep } from "./../helps/utils"
import { transformData } from "./../helps/data"
import { buildUrl } from "./../helps/url"
import { initializeHeaders } from "./../helps/header"
import Interceptor from "./interceptor"

class Axios {
  default = {}
  interceptors = {}

  constructor(initConfig) {
    this.default = initConfig
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor(),
    }
  }

  _mergeConfig(method, url, config) {
    return this.request({
      ...mergeDeep(config, this.default),
      url,
      method,
    })
  }

  _dealRequest(config) {
    const { url, params, data, method, headers = {} } = config
    config.url = buildUrl(url, params)
    config.data = transformData(data)
    config.headers = initializeHeaders(method, headers)
    return send(config)
  }

  request(config) {
    const chain = [
      {
        resolved: this._dealRequest,
        rejected: undefined,
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()
      promise = promise.then(resolved, rejected)
    }
    return promise
  }

  get(url, config) {
    return this._mergeConfig('get', url, config)
  }

  post(url, config) {
    return this._mergeConfig('post', url, config)
  }
}

export default Axios
