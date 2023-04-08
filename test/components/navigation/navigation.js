/*
 * @Author: 殷清贺 987746808@qq.com
 * @Date: 2023-02-06 18:23:16
 * @LastEditors: 殷清贺 987746808@qq.com
 * @LastEditTime: 2023-02-07 17:20:35
 * @FilePath: \newd:\殷清贺\Documents\微信小程序\test\components\navigation\navigation.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// components/navigation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholderText: {
      type: String,
      value: "请输入",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: "home",
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
    show_active() {
      console.log("===", this.data.active);
    },
    onChange(event) {
      this.setData({active: event.detail});
    },
    toPerson() {
      wx.navigateTo({
        url: "/pages/person/person",
      });
      console.log("===", this.data.active);
    },
    toHome() {
      wx.navigateTo({
        url: "/pages/home/home",
      });
    },
    toMy() {
      wx.navigateTo({
        url: "/pages/friends/friends",
      });
    },
        toDocument() {
      wx.navigateTo({
        url: "/pages/document-f/document-f",
      });
    },
  },
});
