import { parseHeaders } from './../helps/header'
import { isURLSameOrigin } from './../helps/url'

const send = (config) => {
  return new Promise((resolve, reject) => {
    const {
      method = 'get',
      url,
      data = null,
      headers = {},
      responseType = 'json',
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
    } = config

    const xhr = new XMLHttpRequest()
    xhr.open(method.toLowerCase(), url, true)

    if (responseType) xhr.responseType = responseType
    if (withCredentials) xhr.withCredentials = withCredentials
    if (
      withCredentials || 
      (isURLSameOrigin(url) && xsrfCookieName)
    ) {
      const xsrfVal = cookie.read(xsrfCookieName)
      if (xsrfVal && xsrfHeaderName) headers[xsrfHeaderName] = xsrfVal
    }

    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })

    if (cancelToken) {
      cancelToken.promise
        .then(reason => {
          xhr.abort()
          reject(reason)
        })
        .catch(() => {})
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return
      if (xhr.status === 0) return

      const responseHeader = parseHeaders(xhr.getAllResponseHeaders())
      const responseData = responseType === 'text' ? xhr.responseText : xhr.response
      const response = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeader,
        config,
        request: xhr,
      }
      resolve(response)
    }

    xhr.send(data)
  })
}

export {
  send,
}
