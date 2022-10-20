export const initializeHeaders = (method, headers) => {
  if (method.toLowerCase() !== 'post') return headers
  if (headers['Content-Type']) return headers

  headers['Content-Type'] = 'application/json;charset=utf-8'
  return headers
}

export const parseHeaders = (headers) => {
  if (!headers) return {}

  let parsed = {}
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    parsed[key] = value
  })
  return parsed
}
