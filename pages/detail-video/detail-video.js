import { getMVInfo, getMVRelated, getMVUrl } from "../../services/module/video"

// pages/detail-video/detail-video.js
Page({
  data: {
    id: '',
    MVUrl: '',
    MVInfo: {},
    relatedVideo: []
  },
  onLoad(options) {
    this.data.id = options.id

    this.fetchMVUrl()
    this.fetchMVInfo()
    this.fetchMVRelated()
  },


  async fetchMVUrl() {
    const res = await getMVUrl(this.data.id)
    const MVUrl = res.data.url
    this.setData({ MVUrl })
  },
  async fetchMVInfo() {
    const res = await getMVInfo(this.data.id)
    this.setData({ MVInfo: res.data })
  },
  async fetchMVRelated() {
    const res = await getMVRelated(this.data.id)
    this.setData({ relatedVideo: res.data })
  }
})