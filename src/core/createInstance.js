import Axios from "./axios"
import { extend } from "./../helps/utils"

function createInstance(initConfig) {
  const context = new Axios(initConfig)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, Axios.prototype, context)
  return instance
}

export default createInstance
