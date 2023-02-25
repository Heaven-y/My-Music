import { getPlaylistDetail } from "../../services/module/music"
import rankingStore from "../../stores/rankingStore"
import recommendStore from "../../stores/recommendStore"

// pages/detail-song/detail-song.js
Page({
  data: {
    type: '',
    songInfo: {},
  },
  onLoad(query) {
    const type = query.type
    this.setData({type})

    if (type === 'recommend') {
      recommendStore.onState('recommendInfo', this.fetchSongInfo)
    } else if (type === 'ranking') {
      const key = query.key
      rankingStore.onState(key, this.fetchSongInfo)
    } else if (type === 'menu') {
      const id = query.id
      this.fetchMenuSongInfo(id)
    }
  },

  fetchSongInfo(value) {
    if(Object.keys(value).length) {
      this.setData({ songInfo: value })
      wx.setNavigationBarTitle({
        title: value.name,
      })
    }
  },

  async fetchMenuSongInfo(id) {
    const res = await getPlaylistDetail(id)
    this.setData({songInfo: res.playlist})
  }
})