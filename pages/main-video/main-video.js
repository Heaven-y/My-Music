import { getTopMV } from "../../services/module/video"

// pages/main-video/main-video.js
Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true
  },
  onLoad() {
    this.fetchTopMV()
  },
  async onPullDownRefresh() {
    this.setData({ videoList: [] })
    this.data.offset = 0
    this.data.hasMore = true

    await this.fetchTopMV()

    // 停止下拉刷新的动作
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    if (!this.data.hasMore) return
    this.fetchTopMV()
  },

  async fetchTopMV() {
    const res = await getTopMV(this.data.offset)
    const videoList = [...this.data.videoList, ...res.data]
    this.setData({ videoList })
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore
  }
})