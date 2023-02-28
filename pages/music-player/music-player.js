// pages/music-player/music-player.js
import { getSongDetail, getSongLyric } from "../../services/module/player"
import { parseLyric } from "../../utils/pares-lyric"
import mythrottle from '../../utils/throttle'

const app = getApp()
// 创建播放器
const audioContext = wx.createInnerAudioContext()

Page({
  data: {
    pageTitles: ['歌曲','歌词'],
    currentPage: 0,
    contentHeight: 0,

    currentSong: {},
    lyricInfos: [],
    currentLyricIndex: -1,
    currentLyricText: '',

    lyricScrollTop: 0,

    currentTime: 0,
    durationTime: 0,
    sliderValue: 0,
    isSliderChanging: false,
    isPlaying: true
  },
  onLoad(options) {
    this.setData({ contentHeight: app.globalData.contentHeight })

    const id = options.id
    this.fetchSongDetail(id)
    this.fetchSongLyric(id)

    this.playSong(id)
  },

  fetchSongDetail(id) {
    getSongDetail(id).then(res => {
      this.setData({ 
        currentSong: res.songs[0],
        durationTime: res.songs[0].dt
      })
    })
  },
  fetchSongLyric(id) {
    getSongLyric(id).then(res => {
      const lyricString = res.lrc.lyric
      const lyricInfos = parseLyric(lyricString)
      this.setData({ lyricInfos })
    })
  },

  playSong(id) {
    const throttleUpdateProgress = mythrottle(this.updateProgress, 500, { leading: false })
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    audioContext.autoplay = true
    audioContext.onTimeUpdate(() => {
      if (!this.data.isSliderChanging) {
        throttleUpdateProgress()
      }

      this.updateLyric()
    })
    // 修复bug: 改变滑块进度后,onTimeUpdate不进行监听了
    // 跳跃后,歌曲需要进行缓存
    audioContext.onWaiting(() => {
      audioContext.pause()
    })
    audioContext.onCanplay(() => {
      audioContext.play()
    })
  },
  updateProgress() {
    const sliderValue = this.data.currentTime / this.data.durationTime * 100
    this.setData({
      currentTime: audioContext.currentTime * 1000,
      sliderValue
    })
  },
  updateLyric() {
    if (!this.data.lyricInfos.length) return
    let index = this.data.lyricInfos.length - 1
    for (let i = 0; i < this.data.lyricInfos.length; i++) {
      if (this.data.lyricInfos[i].time > audioContext.currentTime * 1000) {
        index = i - 1
        break
      }
    }
    if (index === this.data.currentLyricIndex) return
    const currentLyricText = this.data.lyricInfos[index].text
    this.setData({ 
      currentLyricText, 
      currentLyricIndex: index,
      lyricScrollTop: 35 * index
    })
  },


  onNavTabItemTap(event) {
    const index = event.currentTarget.dataset.index
    this.setData({ currentPage: index })
  },
  onNavLeftClick() {
    wx.navigateBack()
  },
  onSwiperChange(event) {
    this.setData({ currentPage: event.detail.current })
  },
  onPlayOrPauseTap() {
    if (!audioContext.paused) {
      audioContext.pause()
      this.setData({ isPlaying: false })
    } else {
      audioContext.play()
      this.setData({ isPlaying: true })
    }
  },
  onSliderChange(event) {
    this.data.isSliderChanging = false

    const sliderValue = event.detail.value
    const currentTime = sliderValue / 100 * this.data.durationTime

    audioContext.seek(currentTime / 1000)
    this.setData({ sliderValue, currentTime })
  },
  onSliderChanging: mythrottle(function(event) {
    this.data.isSliderChanging = true

    const sliderValue = event.detail.value
    const currentTime = sliderValue / 100 * this.data.durationTime

    this.setData({ currentTime })
  }, 80)
})