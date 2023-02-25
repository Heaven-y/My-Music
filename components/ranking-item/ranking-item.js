// components/ranking-item/ranking-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    key: {
      type: String,
      value: ''
    }
  },
  methods: {
    onRankingItemClick() {
      console.log('榜单的点击');
    }
  }
})
