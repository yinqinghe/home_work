// pages/textEdit/textEdit.js
var work_category = [
    { id: 1, name: '小说' },
    { id: 2, name: '诗歌' },
    { id: 3, name: '散文' },
    { id: 4, name: '戏剧' }
];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [],
        // index: 1, // 默认选中的下标
        images: [], // 存储上传的图片
        eimages: [],
        video: false,
        evideo: false,
        title: '',
        work_categoryid: 2,
        placeholder: '请输入内容',
        editorContent: '<p>Hello world!</p>',
        update: false,
        tom: '',
        myLabel: '',
        isPic: false,
        tom: '',
    },
    bindPickerChange(e) {
        // console.log('picker发送选择改变,携带值为', e.detail.value)
        this.setData({ index: e.detail.value })
        console.log('===', this.data.array[e.detail.value])
        for (var i in this.data.myLabel) {
            if (this.data.array[e.detail.value] === this.data.myLabel[i].work_name) {
                this.setData({ work_categoryid: this.data.myLabel[i].workid })
            }
        }
        console.log('===picker发送选择改变,携带值为', this.data.work_categoryid)
    },
    onEditorReady() {
        const that = this
        wx.createSelectorQuery().select('#editor').context(function (res) {
            that.editorCtx = res.context
        }).exec()
    },
    format(e) {
        let {
            name,
            value
        } = e.target.dataset
        if (!name) return
        this.editorCtx.format(name, value)
    },
    onStatusChange(e) {
        const formats = e.detail
        this.setData({
            formats
        })
    },
    undo() {
        this.editorCtx.undo()
    },
    redo() {
        this.editorCtx.redo()
    },
    insertVedio: function () {
        const that = this
        wx.chooseVideo({
            sourceType: ['album', 'camera'], // album 从相册选视频，camera 使用相机拍摄
            // maxDuration: 60, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
            camera: ['front', 'back'],
            success: function (res) {
                console.log('===', res)
                const tempFilePath = res.tempFilePath;
                console.log('===', tempFilePath)
                that.setData({
                    video: tempFilePath
                });
                console.log('===', that.data.video)
            },
        })
    },
    insertImage: function () {
        const that = this;
        wx.chooseImage({
            count: 1,
            success: function (res) {
                const tempFilePaths = res.tempFilePaths;
                that.setData({
                    eimages: tempFilePaths
                });
                that.editorCtx.insertImage({
                    src: tempFilePaths[0],
                    success: function () {
                        console.log('Image inserted successfully');
                    },
                });
            }
        });
    },
    onInput() {
        this.editorCtx.getContents({
            success: (res) => {
                var that = this
                that.setData({ editorContent: res.html })
                console.log('===data.content', res.html)
            }
        })
    },
    updateVideo() {
        console.log('===这是视频修改',)
        var that = this;
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0];
        console.log('===视频修改调用',)
        wx.uploadFile({
            url: 'http://127.0.0.1:8888/update/video',
            method: 'POST',
            header: { "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundaryABC123", },
            formData: { id: that.data.tom.id, content: that.data.editorContent, title: this.data.title, work_categoryid: this.data.work_categoryid },
            filePath: that.data.evideo, // 将图片文件路径作为表单数据提交
            name: 'video',
            success: (res) => {
                console.log('===作品上传成功',)
                wx.redirectTo({
                    url: '/pages/document-f/document-f',
                })
            },
        });
    },
    formSubmit() {
        // const content = editor.getContents();
        console.log('===tom', this.data.tom)
        this.onInput()
        console.log('===video', this.data.video)
        var that = this;
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0];
        var isPic = this.data.isPic
        console.log('===', !this.data.eimages[0], this.data.update, this.data.isPic)
        if (this.data.update) {
            console.log('===这是修改操作',)
            if (!this.data.evideo && !this.data.eimages[0]) {
                if (this.data.tom.type !== '视频') {
                    console.log('===该作业是纯文本',)
                    wx.request({
                        url: 'http://127.0.0.1:8888/update/text',
                        method: 'POST',
                        header: { "Content-Type": "application/x-www-form-urlencoded", },
                        data: { id: that.data.tom.id, content: that.data.editorContent, title: that.data.title, work_categoryid: that.data.work_categoryid, rate: that.data.tom.rate },
                        success: (res) => {
                            console.log('===文本作品上传成功',)
                            wx.redirectTo({
                                url: '/pages/document-f/document-f',
                            })
                        },
                    });
                } else {
                    wx.request({
                        url: 'http://127.0.0.1:8888/update/Vtext',
                        method: 'POST',
                        header: { "Content-Type": "application/x-www-form-urlencoded", },
                        data: { id: that.data.tom.id, content: that.data.editorContent, title: that.data.title, work_categoryid: that.data.work_categoryid, rate: that.data.tom.rate },
                        success: (res) => {
                            console.log('===视频文本修改作品上传成功',)
                            wx.redirectTo({
                                url: '/pages/document-f/document-f',
                            })
                        },
                    });
                }
            } else if (!this.data.evideo) {
                console.log('===图片作业修改', this.data.eimages[0])
                wx.uploadFile({
                    url: 'http://127.0.0.1:8888/update/image',
                    method: 'POST',
                    header: { "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundaryABC123", },
                    formData: { id: that.data.tom.id, content: that.data.editorContent, title: this.data.title, work_categoryid: this.data.work_categoryid, rate: that.data.tom.rate },
                    filePath: that.data.eimages[0], // 将图片文件路径作为表单数据提交
                    name: 'photo',
                    success: (res) => {
                        console.log('===作品上传成功',)
                        wx.redirectTo({
                            url: '/pages/document-f/document-f',
                        })
                    },
                    fail: (res) => {
                        console.log('===images', that.data.eimages)
                    }
                });
            } else {
                this.updateVideo()
            }
        }
        if (!this.data.update) {
            if (!this.data.video && !this.data.eimages[0]) {
                console.log('===该作业是纯文本',)
                wx.request({
                    url: 'http://127.0.0.1:8888/upload/text',
                    method: 'POST',
                    header: { "Content-Type": "application/x-www-form-urlencoded", },
                    data: { token: token, content: that.data.editorContent, title: this.data.title, work_categoryid: this.data.work_categoryid },
                    success: (res) => {
                        console.log('===文本作品上传成功',)
                        wx.redirectTo({
                            url: '/pages/document-f/document-f',
                        })
                    },
                });
            } else if (!this.data.video) {
                console.log('===这是图片上传',)
                wx.uploadFile({
                    url: 'http://127.0.0.1:8888/upload/image',
                    method: 'POST',
                    header: { "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundaryABC123", },
                    formData: { token: token, content: that.data.editorContent, title: this.data.title, work_categoryid: this.data.work_categoryid },
                    filePath: that.data.eimages[0], // 将图片文件路径作为表单数据提交
                    name: 'photo',
                    success: (res) => {
                        console.log('===作品上传成功',)
                        wx.redirectTo({
                            url: '/pages/document-f/document-f',
                        })
                    },
                    fail: (res) => {
                        console.log('===images', that.data.images[0])
                    }
                });
            } else {
                console.log('===这是视频上传', that.data.video)
                wx.uploadFile({
                    url: 'http://127.0.0.1:8888/upload/video',
                    method: 'POST',
                    header: { "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundaryABC123", },
                    formData: { token: token, content: that.data.editorContent, title: this.data.title, work_categoryid: this.data.work_categoryid },
                    filePath: that.data.video, // 将图片文件路径作为表单数据提交
                    name: 'video',
                    success: (res) => {
                        console.log('===作品上传成功',)
                        wx.redirectTo({
                            url: '/pages/document-f/document-f',
                        })
                    },
                });
            }
        }
    },
    clear() {
        this.editorCtx.clear({
            success: function (res) {
                console.log("clear success")
            }
        })
    },
    setItems(list_items) {
        var that = this
        const tom = list_items.find(student => student.id === Number(this.data.parameter1));
        console.log('===parameter1', tom, this.data.array)
        // console.log('===', tom.workcategory[0], tom.workcategory.length == 0)
        for (var i in this.data.array) {
            if (tom.workcategory != 0) {
                if (tom.workcategory[0].work_name === this.data.array[i]) {
                    console.log('===i', this.data.array[i], i)
                    this.setData({ index: Number(i) })
                    console.log('===index', this.data.index)
                }
            }
        }
        if ('image_url' in tom && tom.image_url != null) {
            this.setData({ images: tom.image_url });
            console.log("setitems image", tom.image_url);
        }
        if ('video_url' in tom) {
            this.setData({ video: tom.video_url })
            console.log("setitems video", tom.video_url);
        }

        this.setData({ tom: tom, title: tom.title, editorContent: tom.content })
        console.log('===editorCtx', that.editorCtx)
        wx.createSelectorQuery().select('#editor').context(function (res) {
            res.context.setContents({
                html: tom.content
            })
        }).exec()
    },

    onLoad(options) {
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0]
        var that = this;
        wx.request({
            url: "http://127.0.0.1:8888/my/label/mylabel/?token=" + token,
            method: "GET",
            success: function (res) {
                that.setData({ myLabel: res['data']['data']['myLabel'] })
                var op = [];
                for (var i in that.data.myLabel) {
                    op.push(that.data.myLabel[i].work_name)
                }
                that.setData({ array: op })
                console.log('=== array', that.data.array)
                console.log('===options update', options.update)
                if (options.update) {
                    console.log('===options', options)
                    that.setData({
                        parameter1: options.id,
                        parameter2: options.parameter2,
                        update: options.update,
                        isPic: options.isPic
                    })
                    const app = getApp()
                    var list_items = app.globalData.list_items
                    console.log('===', list_items)
                    that.setItems(list_items)
                }
            },
        });



    },

    /**
      * 生命周期函数--监听页面加载
      */

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