// components/song-item-v1/song-item-v1.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onSongItemClick() {
      console.log('歌曲的点击');
    }
  }
})
