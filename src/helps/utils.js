export const extend = (to, from, ctx) => {
  Object.getOwnPropertyNames(from).forEach(key => {
    to[key] = from[key].bind(ctx)
  })
  for (let key in ctx) {
    if (ctx.hasOwnProperty(key)) {
      to[key] = ctx[key]
    }
  }
  return to
}

export const isObject = (data) => {
  return Object.prototype.toString.call(data) === '[object Object]'
}

export const mergeDeep = (obj1, obj2) => {
  for (let key in obj2) {
    obj1[key] = obj1[key] && isObject(obj1[key])
      ? mergeDeep(obj1[key], obj2[key]) 
      : obj2[key]
  }
  return obj1
}
