// pages/item-detail/item-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: '',
        id: '',
        parameter2: '',
        richText: '<p>反感沙发<img style="height: 200%;width: 100%;"  src="http://tmp/ITxXqItlINsA0ba02698e9ddcaeb367c5b5ea9cc63ce.jpg"></p><p>定风波⑴</p><p>三月七日，沙湖道中遇雨⑵。雨具先去，同行皆狼狈⑶，余独不觉。已而遂晴⑷，故作此词。</p><p>莫听穿林打叶声⑸，何妨吟啸且徐行⑹。竹杖芒鞋轻胜马⑺，谁怕？一蓑烟雨任平生⑻。</p><p>料峭春风吹酒醒⑼，微冷，山头斜照却相迎⑽。回首向来萧瑟处⑾，归去，也无风雨也无晴⑿。 [1] </p><p><br></p>',
        title: '黑暗',
        content: '天不生仲尼，万古如长夜',
        video: false,
        image: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    setItems(list_items) {
        console.log("===list_items['image']", this.data.id)
        const tom = list_items['image'].find(student => student.id === Number(this.data.id));

        console.log("setitems", tom);
        this.setData({ title: tom.title, content: tom.content, richText: tom.content })
    },
    setShare(share_items) {
        console.log('===', share_items)
        const tom = share_items.find(student => student.id === Number(this.data.id));
        console.log("setitems", tom);
        this.setData({ title: tom.title, content: tom.content, richText: tom.content })
    },
    onLoad(options) {
        console.log('===options', options)
        this.setData({
            item: options.item,
            id: options.id
        })
        const app = getApp()
        if (options.manner == "list") {
            var list_items = app.globalData.list_items
            var item = list_items
            console.log('===list',)
            const tom = item.find(student => (student.id == Number(options.id) && student.type == options.type));
            console.log('===tom list', tom)
            if (options.type == "视频") {
                this.setData({ title: tom.title, content: tom.content, richText: tom.content })
            } else {
                this.setData({ title: tom.title, content: tom.content, richText: tom.content })
            }

            if (tom.video_url) {
                console.log('===tom  video_url', tom.video_url)

                this.setData({ video: tom.video_url })
            }
            if (tom.image_url) {
                this.setData({ image: tom.image_url })
            }
        } else if (options.f_share == 'true') {
            console.log('===朋友分享到作品',)
            var list_items = app.globalData.friend_share_items
            var item = list_items
            console.log('===', options.manner)

            const tom = item.find(student => (student.id == Number(options.id) && student.type == options.type));
            console.log('===tom', tom)
            if (options.type == "视频") {
                this.setData({ title: tom.videoid_d[0].title, content: tom.videoid_d[0].content, richText: tom.videoid_d[0].content })
            } else {
                this.setData({ title: tom.workid_d[0].title, content: tom.workid_d[0].content, richText: tom.workid_d[0].content })
            }

            if (tom.videoid_d[0].video_url) {
                console.log('===tom  video_url', tom.videoid_d.video_url)

                this.setData({ video: tom.videoid_d[0].video_url })
            }
            if (tom.workid_d[0].image_url) {
                this.setData({ image: tom.workid_d[0].image_url })
            }
        } else {
            console.log('===自己分享的作品',)
            var list_items = app.globalData.share_items
            var item = list_items
            console.log('===', options.manner)

            const tom = item.find(student => (student.id = d = Number(options.id) && student.type == options.type));
            console.log('===tom', tom)
            if (options.type == "视频") {
                this.setData({ title: tom.videoid_d[0].title, content: tom.videoid_d[0].content, richText: tom.videoid_d[0].content })
            } else {
                this.setData({ title: tom.workid_d[0].title, content: tom.workid_d[0].content, richText: tom.workid_d[0].content })
            }

            if (tom.videoid_d[0].video_url) {
                console.log('===tom  video_url', tom.videoid_d[0].video_url)

                this.setData({ video: tom.videoid_d[0].video_url })
            }
            if (tom.image_url) {
                this.setData({ image: tom.workid_d[0].image_url })
            }
        }

        console.log('===item', item)


        console.log('===', this.data.image)

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