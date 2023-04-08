// pages/register/register.js
import Notify from '@vant/weapp/notify/notify';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: '',
        confirmPassword: ''
    },
    onCancel() {
        wx.navigateTo({
            url: '/pages/login/login'
        })
    },
    onSubmit() {
        // TODO: 注册逻辑
        var username = this.data.username;
        var password = this.data.password;
        var confirmPassword = this.data.confirmPassword
        //检查输入手机号是否合法
        var phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        var res = phonereg.test(username)
        // 检查密码是否包含数字和字母
        var hasNumber = /\d/.test(password);
        var hasLetter = /[a-zA-Z]/.test(password);

        var password_valid = hasNumber && hasLetter ? true : false
        var confirm = password == confirmPassword ? true : false
        if (!res) {
            wx.showModal({
                title: '提示！',
                showCancel: false,
                content: '你输入的手机号不合法',
                success: function (res) { }
            })
            return 0
        } else if (password == '') {
            wx.showModal({
                title: '提示！',
                showCancel: false,
                content: '你输入的密码为空',
                success: function (res) { }
            })
            return 0
        } else if (!password_valid) {
            wx.showModal({
                title: '提示！',
                showCancel: false,
                content: '你输入的密码不合法，需要包含数字字母，且密码需要长度大于6位',
                success: function (res) { }
            })
            return 0
        } else if (!confirm) {
            wx.showModal({
                title: '提示！',
                showCancel: false,
                content: '输入的密码和确认密码不相同',
                success: function (res) { }
            })
            return 0
        }
        if (res && password_valid && password.length > 6 && confirm) {
            console.log('===输入的手机号和密码都合法  密码和确认密码相同', res)
            wx.request({
                url: "http://127.0.0.1:8888/register",
                data: { username: this.data.username, password: this.data.password },
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
                        wx.navigateTo({
                            url: '/pages/login/login'
                        })
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

        console.log('username:', this.data.username)
        console.log('password:', password, "   ", password.length)
        console.log('confirmPassword:', this.data.confirmPassword)
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