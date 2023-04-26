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
    value: '',
    list_items: [],
    showcontent: true,
    showbtn: -1,
    selected: -1,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'link' },
    ],
  },
  onViewClick(event) {
    const id = event.currentTarget.dataset.id;
    var item = this.data.list_items
    const tom = item.find(student => student.id === id);
    console.log('===item_tom', tom)
    wx.navigateTo({
      url: '/pages/item-detail/item-detail?id=' + id + '&item=' + tom,
    });
  },
  onEditClick(event) {
    const id = event.currentTarget.dataset.id;
    var isPic = ''
    console.log('长按事件被触发了！', event.currentTarget.dataset);
    if (event.currentTarget.dataset.type == '图片') {
      var isPic = true
    }
    wx.navigateTo({
      url: '/pages/textEdit/textEdit?id=' + id + '&list_items=' + this.data.list_items + '&update=' + true + '&isPic=' + isPic,
    });
  },
  onShareClick(event) {
    const id = event.currentTarget.dataset.id;
    this.setData({ showShare: true });
    this.setData({ share_item: id });
  },
  onClose() {
    this.setData({ showShare: false });
  },
  onSelect(event) {
    console.log('===', event.detail.userid)
    console.log('===', this.data.share_item)
    var that = this
    var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
    wx.request({
      url: "http://127.0.0.1:8888/my/share",
      data: { token: token, workid: that.data.share_item, can_userid: event.detail.userid },
      method: "POST", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      }, // 设置请求的 header
      success: function (res) {
        if (res['data']['code'] === 4000) {
          console.log("===res", res['data']['code'])
        } else if (res['data']['code'] === 200) {
          that.setData({ show: false, });
        }
      },
    });
    this.onClose();
  },
  show_btn(event) {
    console.log('===点击',)
    var index = event.currentTarget.dataset.index;
    if (this.data.selected == -1) {
      this.setData({ selected: index });
    } else {
      this.setData({ selected: -1 });
      console.log('===', this.data.selected)
    }
  },
  onItemClick(event) {
    var index = event.currentTarget.dataset.index;
    if (this.data.selected == -1) {
      this.setData({ selected: index });
    } else {
      this.setData({ selected: -1 });
    }
  },
  done() {
    var list_items = this.data.list_items
    for (var i in list_items) {
      // console.log('Name:', list_items[i]);
      if (list_items[i].image_url) {
        list_items[i].image_url = 'http://127.0.0.1:8888/' + list_items[i].image_url
        list_items[i].type = '图片'
      } else if (list_items[i].video_url == null) {
        list_items[i].type = '文本'
      } else {
        list_items[i].video_url = 'http://127.0.0.1:8888/' + list_items[i].video_url
        list_items[i].type = '视频'
      }
      list_items[i].image = 'http://127.0.0.1:8888/medias/day-diary.jpg'
    }
    this.setData({ list_items: list_items });
  },
  onSearch() {
    console.log('搜索' + this.data.value);
    var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
    var that = this;
    wx.request({
      url: "http://127.0.0.1:8888/my/search?token=" + token + "&key=" + this.data.value,
      method: "GET",
      success: function (res) {
        var data = []
        for (var i in res['data']['data']) {
          for (var ii in res['data']['data'][i]) {
            data.push(res['data']['data'][i][ii])
          }
        }
        console.log('===data', data)
        that.setData({ list_items: data })
        that.done()
        console.log('===', that.data.list_items)

      },
    });
  },
  getFriends() {
    var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
    var that = this;
    var options = this.data.options
    wx.request({
      url: "http://127.0.0.1:8888/friend/?token=" + token,
      method: "GET",
      success: function (res) {
        that.setData({ friends: res['data']['data']['friends'] })
        console.log('===', that.data.friends)
        for (var i in that.data.friends) {
          for (var ii in that.data.friends[i]['ouser']) {
            console.log('===', that.data.friends[i]['ouser'][ii].username)
            const myObj = { icon: 'link' };
            myObj['name'] = that.data.friends[i]['ouser'][ii].username;
            myObj['userid'] = that.data.friends[i]['ouser'][ii].id;

            options.push(myObj);
          }
        }
        that.setData({ options: options })
        console.log('===', that.data.options)
      },
    });
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getFriends()
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