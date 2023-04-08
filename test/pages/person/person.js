// pages/person/person.js
import Notify from "@vant/weapp/notify/notify";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    value: "",
    username: "",
    password: "",
    captcha: "",
    picture: "",
    pname: '',
    age: '',
    school: '',
    islogin: '',
    captchaImg: "http://127.0.0.1:8080/captcha",
  },
  personMessage() {
    console.log('===personMessage',)
    wx.navigateTo({
      url: '/pages/personMessage/personMessage'
    })
  },
  myWork() {
    wx.navigateTo({
      url: '/pages/myWork/myWork'
    })
  },
  myfriend() {
    wx.navigateTo({
      url: '/pages/myFriend/myfriend'
    })
  },
  mycollection() {
    wx.navigateTo({
      url: '/pages/myLike/mylike'
    })
  },
  lookcookie: function () {
    console.log('===login  cookie', wx.getStorageSync('cookie'));

  },
  recaptcha() {
    console.log("===请求验证码图片");
    this.setData({
      captchaImg: this.data.captchaImg + "?" + Math.random(),
    });
  },
  cancel() {
    //微信小程序没有cookie 可以使用getStorageSync,setStorageSync 存取数据
    console.log("===getStorageSync", wx.getStorageSync("sessionid"));
  },
  submit() {
    console.log("===表单提交");
    Notify({
      message: "账户登录成功",
      color: "#fff",
      background: "#07c160",
    });
    wx.request({
      url: "http://127.0.0.1:8080/form",
      data: { username: this.data.username, password: this.data.password },
      method: "POST", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      }, // 设置请求的 header
      success: function (res) {
        console.log("===res", res);
        var cookie = res.header["Set-Cookie"];
        console.log("===cookie", cookie);
        if (cookie != null) {
          wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
        }
        Notify({
          message: "账户登录成功",
          color: "#fff",
          background: "#07c160",
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      },
    });
  },
  change_nav() {
    //   console.log('===', this.data.active)
    const child = this.selectComponent(".navigation"); //获取子组件对象
    console.log("===onLoad_log", child);
    child.setData({
      active: "user",
    });
    child.show_active();
  },
  upload(event) {
    var that = this;
    console.log("===", event);
    const { file } = event.detail;
    wx.uploadFile({
      url: "http://127.0.0.1:8080/upload",
      filePath: file.url,
      name: "photo",
      header: {
        "Content-Type": "multipart/form-data",
      }, // 设置请求的 header
      // formData: {}, // HTTP 请求中其他额外的 form data
      success: function (res) {
        // success
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: res.data });
        that.setData({ fileList });
        console.log("===", that.fileList);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
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
      active: "user",
    });
    child.show_active();
    var that = this;
    // 检测本地存储中是否有 Cookie
    var cookie = wx.getStorageSync('cookie');
    if (cookie) {
      console.log('本地存储中的 Cookie 值为：' + cookie);
      var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]

      wx.request({
        url: "http://127.0.0.1:8888/cuser/info?token=" + token,
        method: "GET",
        success: function (res) {
          console.log('===用户信息', res)
          var userInfo = res['data'][0]
          console.log('===', userInfo)
          that.setData({ pname: userInfo['name'] })
          that.setData({ age: userInfo['age'] })
          that.setData({ picture: "http://127.0.0.1:8888/" + userInfo['picture'] })
          that.setData({ school: userInfo['school'] })
          that.setData({ islogin: true })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        },
      });
    } else {
      console.log('本地存储中无 Cookie');
      that.setData({ islogin: false })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() { },


  // 退出登录
  logout() {
    console.log('===login  cookie', wx.getStorageSync('cookie'));
    var cookie = wx.getStorageSync('cookie')
    if (cookie) {
      wx.showModal({
        content: '确定退出登录吗？',
        cancelColor: '#666666',//666666
        confirmColor: '#666666',
        success(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/login/login'
            })
            wx.setStorageSync("cookie", '');
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
      })
    }
  },
  login() {
    wx.reLaunch({
      url: '/pages/login/login'
    })
  },
  register() {
    wx.reLaunch({
      url: '/pages/register/register'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.hideHomeButton();
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() { },
});
