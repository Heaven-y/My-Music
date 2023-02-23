class MYRequest {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  request(options) {
    wx.showLoading({
      title: '正在加载中',
      mask: true
    })
    const { url } = options
    options.url = this.baseURL + url
    return new Promise((resolve,reject) =>{
      wx.request({
        ...options,
        success: (res) => {
          wx.hideLoading()
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }

  get(options) {
    return this.request({ ...options, method: "get" })
  }
  post(options) {
    return this.request({ ...options, method: "post" })
  }
}

export default MYRequest