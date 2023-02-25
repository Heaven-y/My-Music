import { getSongMenuList, getSongMenuTags } from "../../services/module/music"

// pages/detail-menu/detail-menu.js
Page({
  data: {
    songMenus: []
  },

  onLoad() {
    this.fetchAllMenuList()
  },
  async fetchAllMenuList() {
    const tagRes = await getSongMenuTags()

    const allPromises = []
    for (const tag of tagRes.tags) {
      const promise = getSongMenuList(tag.name)
      allPromises.push(promise)
    }

    Promise.all(allPromises).then(res => {
      this.setData({ songMenus: res })
    })
  }
})