export default function mythrottle(fn, interval, { leading = true, trailing = false } = {}){
  let startTime = 0
  let timer = null

  const _throttle = function(...args) {
    return new Promise((resolve,reject) => {
      try {
        const nowTime = new Date().getTime()

        if (!leading && startTime === 0){
          startTime = nowTime
        }

        const waitTime = interval - (nowTime - startTime)
        if (waitTime <= 0) {
          if (timer) clearTimeout(timer)
          const res = fn.apply(this, args)
          resolve(res)
          startTime = nowTime
          timer = null
          return
        }

        if (trailing && !timer) {
          timer = setTimeout(() => {
            const res = fn.apply(this, agrs)
            resolve(res)
            startTime = new Date().getTime()
            timer = null
          }, waitTime)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  return _throttle
}