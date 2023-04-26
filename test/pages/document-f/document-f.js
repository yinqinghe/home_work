// pages/document-f/document-f.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share_item: '',
    value: 4,
    showbtn: -1,
    showcontent: true,
    show_all: true,
    show_diary: false,
    list_items: [],
    list_diary: [],
    list_record: [],
    list_cate: [],
    style: [],
    selected: -1,
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'link' },
    ],
    richText: '<div><p>这是一段富文本内容</p><p>这是另一段富文本内容</p></div>',
    myLabel: [],
    option1: [],
    option2: [
      { text: '近三天', value: 0 },
      { text: '近一周', value: 1 },
      { text: '近一个月', value: 2 },
      { text: '由近到远', value: 3 },
      { text: '由远到近', value: 4 },
    ],

  },
  onLongPress(event) {
    var isPic = true
    const id = event.currentTarget.dataset.id;
    console.log('长按事件被触发了！', event.currentTarget.dataset);
    if (event.currentTarget.dataset.type == '视频') {
      var isPic = false
      console.log('===删除视频',)
    }
    var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
    wx.showModal({
      content: '确定删除该作品作业吗？',
      cancelColor: '#666666',//666666
      confirmColor: '#666666',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: "http://127.0.0.1:8888/delete/works?" + token + "&workid=" + id + "&isPic=" + isPic,
            method: "GET",
            success: function (res) {
              wx.reLaunch({ url: '/pages/document-f/document-f' })
            },
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  },
  addWork() {
    wx.reLaunch({
      url: '/pages/textEdit/textEdit',
    })
  },
  choose(value) {
    console.log('===', typeof value.detail)
    if (value.detail === -1) {
      console.log('===还原',)
      this.setData({ list_cate: this.data.list_items })
    } else {
      var choose_show = []
      console.log('===choose', value.detail)
      for (var i in this.data.list_items) {
        console.log('===', this.data.list_items)
        if (value.detail === this.data.list_items[i].workcategory[0].workid) {
          choose_show.push(this.data.list_items[i])
        }
      }
      this.setData({ list_cate: choose_show })
    }
    console.log('===list_cate', this.data.list_cate)
  },
  select_date(value) {       //时间选择
    console.log('===', value.detail)
    var list_items = this.data.list_items
    console.log('===', list_items)
    if (value.detail == 0) {
      var threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3); // 得到3天前的日期
      var list_items = list_items.filter(item => {
        var itemDate = new Date(item.createDate);
        return itemDate >= threeDaysAgo;
      });
      console.log("最近三天的", list_items);
    } else if (value.detail == 1) {
      var sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // 得到3天前的日期
      var list_items = list_items.filter(item => {
        var itemDate = new Date(item.createDate);
        return itemDate >= sevenDaysAgo;
      });
      console.log("最近一周的", list_items);
    } else if (value.detail == 2) {
      var monthDaysAgo = new Date();
      monthDaysAgo.setDate(monthDaysAgo.getDate() - 30); // 得到3天前的日期
      var list_items = list_items.filter(item => {
        var itemDate = new Date(item.createDate);
        return itemDate >= monthDaysAgo;
      });
      console.log("最近一月的", list_items);
    } else {
      console.log('===list_items', list_items)
      list_items.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
      console.log('===list_items', list_items)
    }

    this.setData({ list_cate: list_items })
  },
  choose_a(event) {

    var id = event.currentTarget.dataset.id;
    if (id === '1') {
      this.setData({ list_cate: this.data.list_diary })
      console.log('===diary',)
    } else if (id === '2') {
      console.log('===reading',)
      this.setData({ list_cate: this.data.list_reading })
      console.log('===reading', this.data.list_cate)
    } else if (id === '3') {
      this.setData({ list_cate: this.data.list_drawing })
    } else if (id === '4') {
      this.setData({ list_cate: this.data.list_creation })
    } else if (id === '5') {
      this.setData({ list_cate: this.data.list_record })
    } else if (id === '0') {
      if (this.data.show_all === false) {
        this.setData({ show_all: !this.data.show_all })
        this.setData({ show_diary: !this.data.show_diary })
      }
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
  show_btn(event) {
    var index = event.currentTarget.dataset.index;
    if (this.data.selected == -1) {
      this.setData({ selected: index });
    } else {
      this.setData({ selected: -1 });
      console.log('===', this.data.selected)
    }
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
  setItems() {
    console.log('===setItems', this.data.list_items)
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
    this.setData({ list_cate: list_items });
    const app = getApp()
    app.globalData.list_items = this.data.list_items
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const child = this.selectComponent(".navigation"); //获取子组件对象
    child.setData({
      active: "document",
    });
    child.show_active();
    var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
    var that = this;
    wx.request({
      url: "http://127.0.0.1:8888/cuser/workitems?token=" + token,
      method: "GET",
      success: function (res) {
        console.log('===用户信息', res['data']['data'].image)
        var data = []
        for (var i in res['data']['data']) {
          for (var ii in res['data']['data'][i]) {
            // console.log('===', res['data']['data'][i][ii])
            data.push(res['data']['data'][i][ii])
          }
        }
        console.log('===data', data)
        that.setData({ list_items: data })
        console.log('===list_items', that.data.list_items)
        that.setItems();
        that.getFriends()
        const app = getApp()
        app.globalData.userInfo = res['data'][0]
      },
    });
    wx.request({
      url: "http://127.0.0.1:8888/my/label/mylabel/?token=" + token,
      method: "GET",
      success: function (res) {
        that.setData({ myLabel: res['data']['data']['myLabel'] })
        // console.log('===', that.data.myLabel)
        var op = [];
        op.push({ 'text': '还原类型', 'value': -1 })
        for (var i in that.data.myLabel) {
          var tmp = {};
          tmp['text'] = that.data.myLabel[i].work_name
          tmp['value'] = that.data.myLabel[i].workid
          op.push(tmp)
        }
        that.setData({ option1: op })
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