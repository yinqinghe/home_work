/*
 * @Author: 殷清贺 987746808@qq.com
 * @Date: 2023-02-06 12:03:49
 * @LastEditors: 殷清贺 987746808@qq.com
 * @LastEditTime: 2023-02-06 17:57:05
 * @FilePath: \newd:\殷清贺\Documents\微信小程序\test\pages\home\home.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// pages/home/home.js
Page({
    data: {
    active: 'home',
    },
      onChange(event) {
    this.setData({ active: event.detail });
    },
    toPerson() {
                wx.navigateTo({
        url: '/pages/person/person'
                });
        
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})