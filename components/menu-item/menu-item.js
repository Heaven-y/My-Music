// components/menu-item/menu-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onMenuItemClick() {
      console.log('单个歌单的点击');
    }
  }
})
