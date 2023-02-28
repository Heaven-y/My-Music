// components/nav-bar/nav-bar.js
const app = getApp()
Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '标题'
    }
  },  
  data: {
    statusBarHeight: 20
  },
  lifetimes: {
    attached() {
      this.setData({ statusBarHeight: app.globalData.statusBarHeight })
    }
  },
  methods: {
    onNavLeftTap() {
      this.triggerEvent('navlefttap')
    }
  }
})
