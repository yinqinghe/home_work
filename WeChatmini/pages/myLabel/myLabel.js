// pages/myLabel/myLabel.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        work_name: '',
        myLabel: [],
    },
    addLabel() {
        this.setData({ show: true });
    },
    save() {
        console.log('===save',)
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
        wx.request({
            url: "http://127.0.0.1:8888/my/label/add",
            data: { token: token, work_name: this.data.work_name },
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
                        url: '/pages/myLabel/myLabel'
                    })
                }
            },
        });
    },
    onLongPress(event) {
        const id = event.currentTarget.dataset.id;
        console.log('长按事件被触发了！', id);
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
        wx.showModal({
            content: '确定删除该标签分类吗？',
            cancelColor: '#666666',//666666
            confirmColor: '#666666',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.request({
                        url: "http://127.0.0.1:8888/my/label/del/?token=" + token + "&workid=" + id,
                        method: "GET",
                        success: function (res) {
                            wx.reLaunch({
                                url: '/pages/myLabel/myLabel'
                            })
                        },
                    });
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
        var that = this;
        wx.request({
            url: "http://127.0.0.1:8888/my/label/mylabel/?token=" + token,
            method: "GET",
            success: function (res) {
                that.setData({ myLabel: res['data']['data']['myLabel'] })
                // console.log('===', res)
                console.log('===', that.data.myLabel)
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