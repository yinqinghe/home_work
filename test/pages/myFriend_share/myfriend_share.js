// pages/myFriend/myfriend.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list_items: [],
        selected: -1,
        share_id: '',
        rate: '',
    },
    onViewClick(event) {
        const id = event.currentTarget.dataset.id;
        var item = this.data.list_items
        console.log('===', id)
        const tom = item.find(student => student.id === id);
        console.log('===item_tom', tom)
        wx.navigateTo({
            url: '/pages/item-detail/item-detail?id=' + id + '&item=' + tom + '&share=true',
        });
    },
    onChange(event) {
        const id = event.currentTarget.dataset.id;
        console.log('===', id)
        console.log('===', event.detail)
        this.setData({ rate: event.detail });
        this.setData({ share_id: id });
        this.judge()

    },
    judge() {
        console.log('===judge',)
        var that = this
        wx.request({
            url: "http://127.0.0.1:8888/my/friend/judge?rate=" + that.data.rate + "&share_id=" + that.data.share_id,
            method: "GET",
            success: function (res) {
                console.log('===', res['data']['data'])
            },
        });
    },
    onItemClick(event) {
        var index = event.currentTarget.dataset.index;
        console.log('===', index)
        this.setData({ selected: index });
    },
    show_btn(event) {
        var index = event.currentTarget.dataset.index;
        if (this.data.selected == -1) {
            this.setData({ selected: index });
        }
    },
    done() {
        var list_items = this.data.list_items
        for (var i in list_items) {
            console.log('Name:', list_items[i]);
            if (list_items[i].image_url != null) {
                list_items[i].image_url = 'http://127.0.0.1:8888/' + list_items[i][ii].image_url
                list_items[i].type = '图片'
            } else if (list_items[i].image_url == null) {
                list_items[i].type = '文本'
            } else {
                list_items[i].video_url = 'http://127.0.0.1:8888/' + list_items[i][ii].video_url
                list_items[i].type = '视频'
            }

            list_items[i].image = 'http://127.0.0.1:8888/medias/day-diary.jpg'
        }
        this.setData({ list_items: list_items });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
        var that = this;
        wx.request({
            url: "http://127.0.0.1:8888/my/friend/share?token=" + token,
            success: function (res) {
                console.log('===', res['data']['data']['data'])
                that.setData({ list_items: res['data']['data']['data'] })
                that.done()
                console.log('===', that.data.list_items)
                const app = getApp()
                app.globalData.share_items = res['data']['data']['data']
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