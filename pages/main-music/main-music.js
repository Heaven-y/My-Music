import { getMusicBanner, getSongMenuList } from "../../services/module/music"
import rankingStore, { rankingMap } from "../../stores/rankingStore"
import recommendStore from "../../stores/recommendStore"
import querySelect from "../../utils/query-select"
import throttle  from '../../utils/throttle'

const querySelectThrottle = throttle(querySelect, 100)
// pages/main-music/main-music.js
Page({
  data: {
    searchValue: '',
    banners: [],
    bannerHeight: 0,

    recommendSongs: [],

    ChMenuList: [],
    PopMenuList: [],

    rankingInofs: {}
  },


  onLoad() {
    this.fetchMusicBanner()

    recommendStore.onState('recommendInfo', value => {
      if (Object.keys(value).length) {
        this.setData({ recommendSongs: value.tracks.slice(0, 6) })
      }
    })
    recommendStore.dispatch('fetchRecommendSongsAction')

    this.fetchSongMenuList()

    for (const key in rankingMap) {
      rankingStore.onState(key, value => {
        if (Object.keys(value).length) {
          const newRankingInfos = {...this.data.rankingInofs, [key]: value}
          this.setData({ rankingInofs: newRankingInfos })
        }
      })
    }
    rankingStore.dispatch('fetchRankingDataAction')
  },

  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({ banners: res.banners })
  },

  fetchSongMenuList() {
    getSongMenuList('华语').then(res => {
      this.setData({ ChMenuList: res.playlists })
    }),
    getSongMenuList('流行').then(res => {
      this.setData({ PopMenuList: res.playlists })
    })
  },


  onSearchClick() {
    wx.navigateTo({ url: '/pages/detail-search/detail-search' })
  },
  // 获取图片加载完后的高度
  onBannerLoad() {
    querySelectThrottle('.banner-image').then(res => {
      this.setData({ bannerHeight: res[0].height })
    })
  },
  onRecommendMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  }
})