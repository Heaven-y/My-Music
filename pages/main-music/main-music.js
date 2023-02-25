import { getMusicBanner, getPlaylistDetail, getSongMenuList } from "../../services/module/music"
import querySelect from "../../utils/query-select"

const rankingMap = {
  newRanking: 3779629,
  originRanking: 2884035,
  upRanking: 19723756
}

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
    this.fetchRecommendSongs()
    this.fetchSongMenuList()
    this.fetchRankingData()
  },

  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({ banners: res.banners })
  },

  async fetchRecommendSongs() {
    const res = await getPlaylistDetail(3778678)
    const recommendSongs = res.playlist.tracks.slice(0, 6)
    this.setData({ recommendSongs })
  },
  
  fetchSongMenuList() {
    getSongMenuList('华语').then(res => {
      this.setData({ ChMenuList: res.playlists })
    }),
    getSongMenuList('流行').then(res => {
      this.setData({ PopMenuList: res.playlists })
    })
  },

  fetchRankingData() {
    for(const key in rankingMap) {
      const id = rankingMap[key]
      getPlaylistDetail(id).then(res => {
        const newRankingInfos = {...this.data.rankingInofs, [key]: res.playlist}
        this.setData({ rankingInofs: newRankingInfos })
      })
    }
  },


  onSearchClick() {
    wx.navigateTo({ url: '/pages/detail-search/detail-search' })
  },
  // 获取图片加载完后的高度
  onBannerLoad() {
    querySelect('.banner-image').then(res => {
      this.setData({ bannerHeight: res[0].height })
    })
  },
  onRecommendMoreClick() {
    console.log('推荐歌曲更多的点击');
  }
})