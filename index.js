import createInstance from "./src/core/createInstance"
import CancelToken, { Cancel, isCancel } from "./src/core/cancelToken"

const axios = createInstance({
  method: 'get',
  url: '/',
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
})

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
