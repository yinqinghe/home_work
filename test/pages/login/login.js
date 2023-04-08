// pages/login.js
import Notify from '@vant/weapp/notify/notify';
Page({

    /**
     * 页面的初始数据
     */


    data: {
        is_disabled: false,
        username: "",
        password: "",
        showPwd: false,
        agree: false
    },
    onChange() {
        var agrees = !this.data.agree;
        this.setData({
            agree: agrees
        })
    },
    //显示隐藏 密码
    show_no_pwd: function () {
        var ishow = !this.data.showPwd;
        this.setData({
            showPwd: ishow
        })
    },



    //隐私声明
    cnn_if_cnn: function () {
        // console.log("====生命周期函数====")
        wx.navigateTo({
            url: '/pakageloginandregist/pages/login/privacy/privacypg'
        })
    },
    // 注册
    signup: function () {
        wx.navigateTo({
            url: '/pages/register/register'
        })
    },
    // 登录
    login: function () {
        var username = this.data.username
        var password = this.data.password
        console.log('===', username)
        console.log('===', password)
        var that = this
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (that.data.username == '') {
            wx.showModal({
                title: '提示！',
                showCancel: false,
                content: '请输入账号！',
                success: function (res) { }
            })
            return 0
            // } else if (username.length != 11) {//that.data.phone.length !=11
            //     wx.showModal({
            //         title: '提示！',
            //         showCancel: false,
            //         content: '手机号长度有误，请重新输入！',
            //         success: function (res) { }
            //     })
            //     return 0
            // } else if (!myreg.test(username)) {//!myreg.test(that.data.phone)
            //     wx.showModal({
            //         title: '提示！',
            //         showCancel: false,
            //         content: '请输入合法正确的账号！',
            //         success: function (res) { }
            //     })
            //     return 0
            // } else if (that.data.password == '') {
            //     wx.showModal({
            //         title: '提示！',
            //         showCancel: false,
            //         content: '请输入密码！',
            //         success: function (res) { }
            //     })
            //     return 0
        } else {
            // var agrees = this.data.agree;
            // if (!agrees) {
            //     wx.showModal({
            //         title: '提示！',
            //         showCancel: false,
            //         content: '同意法律声明及隐私政策！',
            //     })
            //     return 0;
            // }
            //登录
            console.log('===我要登录了',)
            wx.request({
                url: "http://127.0.0.1:8888/clogin",
                data: { username: this.data.username, password: this.data.password },
                method: "POST", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }, // 设置请求的 header
                success: function (res) {
                    console.log("===res", res);
                    var statusCode = res['data']['code'];
                    if (statusCode == '200') {
                        var cookie = res.header["Set-Cookie"];
                        if (cookie != null) {
                            wx.setStorageSync("cookie", res.header["Set-Cookie"]);
                        }
                        console.log('===login  cookie', wx.getStorageSync('cookie'));
                        const app = getApp()
                        app.globalData.userInfo = res['data']['data']['userinfo'][0]
                        console.log('===', app.globalData.userInfo)
                        Notify({
                            message: "账户登录成功",
                            type: 'primary'
                        });
                        // wx.navigateTo({
                        //     url: '/pages/person/person'
                        // })
                    } else if (statusCode == '4000') {
                        console.log("===res", res['data']['message']);

                        Notify({
                            message: "密码错误",
                            color: "#fff",
                            background: "#07c160",
                        });
                    }

                },
                fail: function () {
                    // fail
                },
                complete: function () {
                    // complete
                },
            });
        }
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