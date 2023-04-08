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
        array: ['读后感', '画画', '天天日记', '跳舞'],
        index: 1, // 默认选中的下标
        images: [], // 存储上传的图片
        video: false,
        title: '',
        content: '',
        work_categoryid: 2,
        placeholder: '请输入内容',
        editorContent: '<p>Hello world!</p>'
    },
    bindPickerChange(e) {
        console.log('picker发送选择改变,携带值为', e.detail.value)
        this.setData({ index: e.detail.value })
        this.setData({ work_categoryid: Number(e.detail.value) + 1 })
        console.log('===', this.data.work_categoryid)
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
                that.setData({
                    video: tempFilePath
                });
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
                    images: tempFilePaths
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
                that.setData({ content: res.html })
                console.log('===data.content', res.html)
            }
        })
    },
    formSubmit() {
        // const content = editor.getContents();
        console.log('===', this.data.images)
        this.onInput()
        console.log('===content html', this.data.content)
        var that = this;
        var token = wx.getStorageSync('cookie').split('token=')[1].split(';')[0];
        if (this.data.images.length == 0) {
            console.log('===该作业是纯文本',)
            wx.request({
                url: 'http://127.0.0.1:8888/upload/text',
                method: 'POST',
                header: { "Content-Type": "application/x-www-form-urlencoded", },
                data: { token: token, content: that.data.content, title: this.data.title, work_categoryid: this.data.work_categoryid },
                success: (res) => {
                    console.log('===文本作品上传成功',)
                },
            });

        } else {
            wx.uploadFile({
                url: 'http://127.0.0.1:8888/upload/image',
                method: 'POST',
                header: { "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundaryABC123", },
                formData: { token: token, content: that.data.content, title: this.data.title, work_categoryid: this.data.work_categoryid },
                filePath: that.data.images[0], // 将图片文件路径作为表单数据提交
                name: 'photo',
                success: (res) => {
                    console.log('===作品上传成功',)
                },
                fail: (res) => {
                    console.log('===images', that.data.images[0])
                    // 处理提交失败后的逻辑
                }
            });

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
        console.log('===parameter1', typeof this.data.parameter1)
        const tom = list_items['image'].find(student => student.id === Number(this.data.parameter1));
        var that = this
        console.log("setitems", tom);
        this.setData({ title: tom.title, editorContent: tom.content })
        console.log('===editorCtx', that.editorCtx)
        wx.createSelectorQuery().select('#editor').context(function (res) {
            res.context.setContents({
                // html: '<p>Hello, world!</p>'
                html: tom.content
            })
        }).exec()
    },

    onLoad(options) {
        this.setData({
            parameter1: options.id,
            parameter2: options.parameter2
        })
        console.log('===', options)
        const app = getApp()
        var list_items = app.globalData.list_items
        this.setItems(list_items)

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