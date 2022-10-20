export class Cancel {
  message
  constructor(message) {
    this.message = message
  }
}

export const isCancel = val => {
  return val instanceof Cancel
}

export default class CancelToken {
  promise
  reason

  constructor(executor) {
    let resolvePromise
    this.promise = new Promise(resolve => {
      resolvePromise = resolve
    })

    const paramFn = message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    }

    executor(paramFn)
  }

  static source() {
    let cancel
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      token,
      cancel,
    }
  }
}
