import qs from "qs"
import { isObject } from "./utils"

const urlParsingNode = document.createElement('a')

export const buildUrl = (url, params) => {
  if (!isObject(params)) return url

  let query = qs.stringify(params)
  if (query) query = `?${query}`
  return `${url}${query}`
}

export const resolveURL = url => {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return { protocol, host }
}

export const isURLSameOrigin = url => {
  const currentOrigin = resolveURL(window.location.href)
  const parsedOrigin = resolveURL(url)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && 
    parsedOrigin.host === currentOrigin.host
  )
}
