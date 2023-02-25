import { HYEventStore } from 'hy-event-store'
import { getPlaylistDetail } from '../services/module/music'

const recommendStore = new HYEventStore({
  state: {
    recommendInfo: {}
  },
  actions: {
    fetchRecommendSongsAction(ctx) {
      getPlaylistDetail(3778678).then(res => {
        ctx.recommendInfo = res.playlist
      })
    }
  }
})

export default recommendStore