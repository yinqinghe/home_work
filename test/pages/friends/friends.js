/*
 * @Author: 殷清贺 987746808@qq.com
 * @Date: 2023-02-03 18:59:50
 * @LastEditors: 殷清贺 987746808@qq.com
 * @LastEditTime: 2023-02-07 17:23:31
 * @FilePath: \newd:\殷清贺\Documents\微信小程序\test\pages\my\my.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// pages/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    const child = this.selectComponent(".navigation"); //获取子组件对象
    console.log("===onLoad_log", child);
    child.setData({
      active: "friends",
    });
    child.show_active();
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