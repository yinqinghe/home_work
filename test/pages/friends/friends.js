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
    show: false,
    username: '',
    friends: [
      {
        id: '001',
        name: '小明',
        avatarUrl: 'https://example.com/avatar1.png'
      },
      {
        id: '002',
        name: '小红',
        avatarUrl: 'https://example.com/avatar2.png'
      },
      {
        id: '003',
        name: '小刚',
        avatarUrl: 'https://example.com/avatar3.png'
      }
    ]
  },
  onLongPress(event) {
    const id = event.currentTarget.dataset.id;
    console.log('长按事件被触发了！', id);
    var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]

    wx.showModal({
      content: '确定删除该好友吗？',
      cancelColor: '#666666',//666666
      confirmColor: '#666666',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: "http://127.0.0.1:8888/friend/delete/?token=" + token + "&id=" + id,
            method: "GET",
            success: function (res) {
              wx.reLaunch({
                url: '/pages/friends/friends'
              })
            },
          });

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  },
  button_a() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  save() {
    console.log('===save',)
    var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
    wx.request({
      url: "http://127.0.0.1:8888/friend/add",
      data: { token: token, friend_name: this.data.username },
      method: "POST", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      }, // 设置请求的 header
      success: function (res) {
        if (res['data']['code'] === 4000) {
          console.log("===res", res['data']['code'])

          Notify({
            message: res['data']['message'],
            type: 'danger'
          });
        } else if (res['data']['code'] === 200) {
          console.log('===', res)
          wx.reLaunch({
            url: '/pages/friends/friends'
          })
        }
      },
    });
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

    var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
    var that = this;
    wx.request({
      url: "http://127.0.0.1:8888/friend/?token=" + token,
      method: "GET",
      success: function (res) {
        // console.log('===用户信息', res['data']['data'])
        that.setData({ friends: res['data']['data']['friends'] })
        console.log('===', that.data.friends)
        for (var i in that.data.friends) {
          console.log('Name:', that.data.friends[i]);
          for (var ii in that.data.friends[i]['ouser']) {
            console.log('===', that.data.friends[i]['ouser'][ii].username)
          }
        }
      },
    });

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