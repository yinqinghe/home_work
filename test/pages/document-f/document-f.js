// pages/document-f/document-f.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 4,
    showbtn: false,
    showcontent: true,
    show_all: true,
    show_diary: false,
    list_items: [],
    list_diary: [],
    list_reading: [],
    list_drawing: [],
    list_creation: [],
    list_record: [],
    list_cate: [],
    items: [
      {
        "id": 1,
        "image": "http://127.0.0.1:8888/images/day-diary.jpg",
        "title": "清明上河图",
        "createDate": "2023-04-03 11:36:58",
        "type": "文本",
        "category": "天天日记",
      },

    ],
    richText: '<div><p>这是一段富文本内容</p><p>这是另一段富文本内容</p></div>',
  },

  addWork() {
    wx.reLaunch({
      url: '/pages/textEdit/textEdit',
    })
  },
  done() {
    var list_items = this.data.list_items
    var list_diary = []
    var list_reading = []
    var list_drawing = []
    var list_creation = []
    var list_record = []
    for (var i in list_items) {
      console.log('Name:', list_items[i]);
      for (var ii in list_items[i]) {
        var work_name = list_items[i][ii].workcategory[0].work_name
        if (work_name == "天天日记") {
          console.log('===', list_items[i][ii])
          list_diary.push(list_items[i][ii])
        } else if (work_name == "文字读后感") {
          list_reading.push(list_items[i][ii])
        } else if (work_name == "画画") {
          list_drawing.push(list_items[i][ii])
        } else if (work_name == "课外创作") {
          list_creation.push(list_items[i][ii])
        } else if (work_name == "每日一记") {
          list_record.push(list_items[i][ii])
        }
        list_items[i][ii].image = 'http://127.0.0.1:8888/medias/day-diary.jpg'
      }
    }
    this.setData({ list_diary: list_diary })
    this.setData({ list_reading: list_reading })
    this.setData({ list_drawing: list_drawing })
    this.setData({ list_creation: list_creation })
    this.setData({ list_record: list_record })
    console.log('===list_diary', this.data.list_diary)
  },
  choose_a(event) {
    if (this.data.show_all == true) {
      this.setData({ show_all: !this.data.show_all })
      this.setData({ show_diary: !this.data.show_diary })
    }
    var id = event.currentTarget.dataset.id;
    if (id === '1') {
      this.setData({ list_cate: this.data.list_diary })
      console.log('===diary',)
    } else if (id === '2') {
      console.log('===reading',)
      this.setData({ list_cate: this.data.list_reading })
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
    this.select_date()

  },
  select_date() {                            //时间排序
    var list_items = this.data.list_items
    var images = this.data.list_items.image
    console.log('===images', images)
    images.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
    console.log('===images', images)
    list_items.image = images
    this.setData({ list_items: list_items })
  },
  onItemClick(event) {
    var id = event.currentTarget.dataset.id;
    console.log('===setItems', 'item' + id)
    id = '#item' + id
    // const myElement = this.selectComponent('#work');
    // console.log('===', myElement)
    // myElement.setStyle({
    //   color: 'red',
    //   backgroundColor: 'yellow'
    // });
    this.setData({ showbtn: !this.data.showbtn })
    this.setData({ showcontent: !this.data.showcontent })

  },
  onViewClick(event) {
    const id = event.currentTarget.dataset.id;
    var item = this.data.list_items['image']
    const tom = item.find(student => student.id === 1);
    console.log('===item_tom', tom)
    wx.navigateTo({
      url: '/pages/item-detail/item-detail?id=' + id + '&item=' + tom,
    });
  },
  onEditClick(event) {
    const id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/textEdit/textEdit?id=' + id + '&list_items=' + this.data.list_items,
    });
  },
  setItems() {
    console.log('===setItems', this.data.list_items)
    var list_items = this.data.list_items
    for (var i in list_items) {
      console.log('Name:', list_items[i]);
      for (var ii in list_items[i]) {
        if (list_items[i][ii].image_url != null) {
          list_items[i][ii].image_url = 'http://127.0.0.1:8888/' + list_items[i][ii].image_url
          list_items[i][ii].type = '图片'
          // console.log('Name:', list_items[i][ii]);
        } else if (list_items[i][ii].image_url == null) {
          list_items[i][ii].type = '文本'
        } else {
          list_items[i][ii].video_url = 'http://127.0.0.1:8888/' + list_items[i][ii].video_url
          list_items[i][ii].type = '视频'
          // console.log('Name:', list_items[i][ii].video_url);
        }
        list_items[i][ii].image = 'http://127.0.0.1:8888/medias/day-diary.jpg'
        // var w_id = list_items[i][ii].work_categoryid
        // if (w_id === '1') {
        //   list_items[i][ii].work_categoryid = '天天日记'
        // } else if (w_id === '2') {
        //   list_items[i][ii].work_categoryid = '文字读后感'
        // } else if (w_id === '3') {
        //   list_items[i][ii].work_categoryid = '画画'
        // } else if (w_id === '4') {
        //   list_items[i][ii].work_categoryid = '课外创作'
        // }
        // console.log('Name:', list_items[i][ii].work_categoryid);

      }
    }
    this.setData({ list_items: list_items });
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
        // console.log('===用户信息', res['data']['data'])
        that.setData({ list_items: res['data']['data'] })
        console.log('===', that.data.list_items)
        that.setItems();
        that.done();
        const app = getApp()
        app.globalData.userInfo = res['data'][0]
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