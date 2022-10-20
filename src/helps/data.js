import { isObject } from "./utils"

export const transformData = (data) => {
  if (!isObject(data)) return data
  return JSON.stringify(data)
}
